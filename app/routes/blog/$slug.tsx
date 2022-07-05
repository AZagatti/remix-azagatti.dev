import { Box, Heading } from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { getArticle } from '~/services/articles.server'
import { formatDate } from '~/utils/formatDate'

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params
  if (slug) {
    const mdx = await getArticle(slug)
    return json({
      frontmatter: mdx.post.frontmatter,
      readingTime: mdx.readingTime,
      code: mdx.post.code,
    })
  }
  return redirect('/blog')
}

const ArticlePage = () => {
  const { code, readingTime, frontmatter } = useLoaderData()

  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Box as="main" maxW="4xl" px="8" className="mdx-prose">
      <Box maxW="100%">
        <Heading as="h2">{frontmatter.title}</Heading>
        <Heading
          as="h4"
          fontSize="lg"
          fontWeight="normal"
          pb="8"
          pt="2"
        >{`${formatDate(
          new Date(frontmatter.date),
          'pt'
        )} — ${readingTime}`}</Heading>
        <Component />
      </Box>
    </Box>
  )
}

export default ArticlePage
