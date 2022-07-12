import type { bundleMDX } from 'mdx-bundler'
import { generateMdxFromSlug, generateMdxList } from './generate-mdx.server'

interface Post {
  post: Awaited<ReturnType<typeof bundleMDX>>
  image?: string
  readingTime: string
  slug: string
}

const postsLists: Post[] = []
const articlesCache = new Map()

export const getArticlesList = async () => {
  if (postsLists.length) {
    return postsLists
  } else {
    const { generatedMdx } = await generateMdxList()
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
    const { generatedMdx } = await generateMdxFromSlug(slug)
    articlesCache.set(slug, generatedMdx)
    return generatedMdx
  }
}
