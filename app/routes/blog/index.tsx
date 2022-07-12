import { useLoaderData } from '@remix-run/react'
import { ArticlesList } from '~/components/articles-list'
import { getArticlesList } from '~/services/articles'

export const loader = async () => {
  const mdx = await getArticlesList()
  return {
    articles: mdx.map((art) => ({
      slug: art.slug,
      frontmatter: art.post.frontmatter,
      image: art.image,
      readingTime: art.readingTime,
    })),
  }
}

const BlogIndex = () => {
  const { articles } = useLoaderData()

  return <ArticlesList articles={articles} />
}

export default BlogIndex
