import fs from 'fs/promises'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import { remarkMdxImages } from 'remark-mdx-images'
import calcReadingTime from 'reading-time'

interface Post {
  post: Awaited<ReturnType<typeof bundleMDX>>
  image: string
  readingTime: string
}

const postsDir = path.resolve(__dirname, '..', 'content', 'posts')
const slugList: string[] = []
const postsLists: Post[] = []

const calculateReadingTime = async (slug: string) => {
  const text = await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
    encoding: 'utf-8',
  })
  return Math.round(calcReadingTime(text).minutes)
}

export const getSlugList = async () => {
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
  const list = await getSlugList()
  if (postsLists.length) {
    return postsLists
  } else {
    const generatedMdx = (
      await Promise.all(
        list.map(async (slug) => ({
          post: await bundleMDX({
            source: await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
              encoding: 'utf-8',
            }),
            cwd: path.join(postsDir, slug),
            mdxOptions: (options) => {
              options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkMdxImages,
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
