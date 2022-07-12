import type { bundleMDX } from 'mdx-bundler'
import fs from 'fs/promises'
import path from 'path'
import { generateMdxFromSlug, generateMdxList } from './generate-mdx.server'

interface Post {
  post: Awaited<ReturnType<typeof bundleMDX>>
  image?: string
  readingTime: string
  slug: string
}

const slugListCache: string[] = []
const postsLists: Post[] = []
const articlesCache = new Map()

const postsDir =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, '..', '..', 'content', 'posts')
    : path.resolve(__dirname, '..', 'content', 'posts')

const getSlugList = async () => {
  const files = (await fs.readdir(postsDir)).filter((file) => !/^\./.test(file))
  return files
}

const getTextList = async (slugList: string[]) => {
  const textList = await Promise.all(
    slugList.map(async (slug) => {
      const text = await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
        encoding: 'utf-8',
      })
      return { slug, text }
    })
  )
  return textList
}

const getSourceList = async (slugList: string[]) => {
  const sourceList = await Promise.all(
    slugList.map(async (slug) => {
      const source = await fs.readFile(path.join(postsDir, slug, 'index.mdx'), {
        encoding: 'utf-8',
      })
      return { slug, source }
    })
  )
  return sourceList
}

const getCwdList = (slugList: string[]) => {
  const cwdList = slugList.map((slug) => {
    return { slug, cwd: path.join(postsDir, slug) }
  })
  return cwdList
}

export const getArticlesList = async () => {
  if (postsLists.length) {
    return postsLists
  } else {
    const slugList = slugListCache.length ? slugListCache : await getSlugList()
    const { generatedMdx } = await generateMdxList({
      slugList,
      sourceList: await getSourceList(slugList),
      textList: await getTextList(slugList),
      cwdList: getCwdList(slugList),
    })
    postsLists.push(...generatedMdx)
    generatedMdx.forEach((post) => {
      articlesCache.set(post.slug, post)
    })
    return generatedMdx
  }
}

export const getArticle = async (slug: string): Promise<Post> => {
  const cachedArticle = articlesCache.get(articlesCache)
  if (cachedArticle) {
    return cachedArticle
  } else {
    const slugList = slugListCache.length ? slugListCache : await getSlugList()
    const { generatedMdx } = await generateMdxFromSlug({
      slug,
      source:
        (await getSourceList(slugList)).find((obj) => obj.slug === slug)
          ?.source ?? '',
      text:
        (await getTextList(slugList)).find((obj) => obj.slug === slug)?.text ??
        '',
      cwd: getCwdList(slugList).find((obj) => obj.slug === slug)?.cwd ?? '',
    })
    articlesCache.set(slug, generatedMdx)
    return generatedMdx
  }
}
