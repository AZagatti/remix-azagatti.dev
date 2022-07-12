import { bundleMDX } from 'mdx-bundler'
import fs from 'fs/promises'
import path from 'path'
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import calcReadingTime from 'reading-time'
import { remarkMdxImages } from 'remark-mdx-images'

const postsDir =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '..', '..', 'content', 'posts')
    : path.resolve(__dirname, '..', 'content', 'posts')

const calculateReadingTime = async (slug: string) => {
  const text = await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
    encoding: 'utf-8',
  })
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

const getSlugList = async () => {
  const files = (await fs.readdir(postsDir)).filter((file) => !/^\./.test(file))
  return files
}

export const generateMdxList = async () => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const slugList = await getSlugList()
  const generatedMdx = (
    await Promise.all(
      slugList.map(async (slug) => ({
        slug,
        post: await bundleMDX({
          source: await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
            encoding: 'utf-8',
          }),
          cwd: path.join(postsDir, slug),
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
        readingTime: ` ${await calculateReadingTime(slug)} min de leitura`,
      }))
    )
  ).sort((a, z) => {
    const aTime = new Date(a.post.frontmatter.date ?? '').getTime()
    const zTime = new Date(z.post.frontmatter.date ?? '').getTime()
    return aTime > zTime ? -1 : aTime === zTime ? 0 : 1
  })

  return { slugList, generatedMdx }
}

export const generateMdxFromSlug = async (slug: string) => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const generatedMdx = {
    slug,
    post: await bundleMDX({
      source: await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
        encoding: 'utf-8',
      }),
      cwd: path.join(postsDir, slug),
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
    readingTime: ` ${await calculateReadingTime(slug)} min de leitura`,
  }

  return { generatedMdx }
}
