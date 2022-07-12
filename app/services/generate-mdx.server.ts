import { bundleMDX } from 'mdx-bundler'
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import calcReadingTime from 'reading-time'
import { remarkMdxImages } from 'remark-mdx-images'

const calculateReadingTime = async (text: string) => {
  return Math.round(calcReadingTime(text).minutes)
}

const remarkPlugins: any = [
  remarkCodeBlocksShiki,
  [
    remarkEmbedder,
    {
      transformers: [oembedTransformer],
    },
  ],
]

interface GenerateMdxListParams {
  slugList: string[]
  sourceList: { slug: string; source: string }[]
  textList: { slug: string; text: string }[]
  cwdList: { slug: string; cwd: string }[]
}

export const generateMdxList = async ({
  slugList,
  sourceList,
  textList,
  cwdList,
}: GenerateMdxListParams) => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const generatedMdx = (
    await Promise.all(
      slugList.map(async (slug) => ({
        slug,
        post: await bundleMDX({
          source: sourceList.find((obj) => obj.slug === slug)?.source ?? '',
          cwd: cwdList.find(obj => obj.slug === slug)?.cwd ?? '',
          mdxOptions: (options) => {
            options.remarkPlugins = [
              ...(options.remarkPlugins ?? []),
              remarkSlug,
              [remarkAutolinkHeadings, { behavior: 'wrap' }],
              remarkMdxImages,
              gfm,
              ...remarkPlugins,
            ]
            return options
          },
          esbuildOptions: (options) => {
            options.loader = {
              ...options.loader,
              '.png': 'dataurl',
            }
            return options
          },
        }),
        image: `images/${slug}/banner.png`,
        readingTime: ` ${await calculateReadingTime(
          textList.find((obj) => obj.slug === slug)?.text ?? ''
        )} min de leitura`,
      }))
    )
  ).sort((a, z) => {
    const aTime = new Date(a.post.frontmatter.date ?? '').getTime()
    const zTime = new Date(z.post.frontmatter.date ?? '').getTime()
    return aTime > zTime ? -1 : aTime === zTime ? 0 : 1
  })

  return { slugList, generatedMdx }
}

interface GenerateMdxFromSlugParams {
  slug: string
  source: string
  text: string
  cwd: string
}

export const generateMdxFromSlug = async ({
  slug,
  source,
  text,
  cwd,
}: GenerateMdxFromSlugParams) => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const generatedMdx = {
    slug,
    post: await bundleMDX({
      source,
      cwd,
      mdxOptions: (options) => {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkSlug,
          [remarkAutolinkHeadings, { behavior: 'wrap' }],
          remarkMdxImages,
          gfm,
          ...remarkPlugins,
        ]
        return options
      },
      esbuildOptions: (options) => {
        options.loader = {
          ...options.loader,
          '.png': 'dataurl',
        }
        return options
      },
    }),
    readingTime: ` ${await calculateReadingTime(text)} min de leitura`,
  }

  return { generatedMdx }
}
