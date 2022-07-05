import { Box } from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { getArticle } from '~/services/articles.server'

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params
  if (slug) {
    const mdx = await getArticle(slug)
    return json({
      code: mdx.post.code,
    })
  }
  return redirect('/blog')
}

const ArticlePage = () => {
  const { code } = useLoaderData()

  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Box as="main" maxW="6xl" className="mdx-prose">
      <Component />
    </Box>
  )
}

export default ArticlePage
