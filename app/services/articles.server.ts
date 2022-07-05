import fs from 'fs/promises'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import calcReadingTime from 'reading-time'
import { remarkMdxImages } from 'remark-mdx-images'

interface Post {
  post: Awaited<ReturnType<typeof bundleMDX>>
  image?: string
  readingTime: string
  slug: string
}

const postsDir = path.resolve(__dirname, '..', 'content', 'posts')
const slugList: string[] = []
const postsLists: Post[] = []
const articlesCache = new Map()

const remarkPlugins: any = [
  remarkCodeBlocksShiki,
  [
    remarkEmbedder,
    {
      transformers: [oembedTransformer],
    },
  ],
]

const calculateReadingTime = async (slug: string) => {
  const text = await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
    encoding: 'utf-8',
  })
  return Math.round(calcReadingTime(text).minutes)
}

const getSlugList = async () => {
  if (slugList.length) {
    return slugList
  } else {
    const files = (await fs.readdir(postsDir)).filter(
      (file) => !/^\./.test(file)
    )
    slugList.push(...files)
    return files
  }
}

export const getArticlesList = async () => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const list = await getSlugList()
  if (postsLists.length) {
    return postsLists
  } else {
    const generatedMdx = (
      await Promise.all(
        list.map(async (slug) => ({
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

    postsLists.push(...generatedMdx)
    return generatedMdx
  }
}

export const getArticle = async (slug: string): Promise<Post> => {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  )
  const { default: remarkSlug } = await import('remark-slug')
  const { default: gfm } = await import('remark-gfm')

  const cachedArticle = articlesCache.get(articlesCache)
  if (cachedArticle) {
    return cachedArticle
  } else {
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
    articlesCache.set(slug, generatedMdx)
    return generatedMdx
  }
}
