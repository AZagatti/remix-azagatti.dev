import { Box, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { formatDate } from '~/utils/formatDate'
import { Link } from './link'

interface Frontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  keywords: string[]
}

interface ArticlesListProps {
  articles: {
    slug: string
    frontmatter: Frontmatter
    image: string
    readingTime: string
  }[]
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  return (
    <Grid
      rowGap="16"
      columnGap="4"
      minH="100vh"
      m="4"
      w="6xl"
      gridTemplateColumns="repeat(3, 1fr)"
    >
      {articles.map((article) => (
        <GridItem key={article.frontmatter.title} mt="auto" h="100%">
          <Link
            to={`/blog/${article.slug}`}
            style={{
              textDecoration: 'none',
            }}
            _hover={{
              opacity: 0.8,
            }}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            h="100%"
          >
            <Box>
              <Heading as="h3" size="lg" textAlign="start" mb="2">
                {article.frontmatter.title}
              </Heading>
            </Box>
            <Box>
              <Text color="GrayText" mb="4">
                {formatDate(new Date(article.frontmatter.date), 'pt')} —
                {article.readingTime}
              </Text>
              <Image
                src={article.image}
                w="100%"
                h="200px"
                objectFit="cover"
                borderRadius="4"
                transition="box-shadow 0.1s"
              />
            </Box>
          </Link>
        </GridItem>
      ))}
    </Grid>
  )
}
