import { Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from './link'

interface ArticlesListProps {
  articles: {
    title: string
    img: string
  }[]
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  return (
    <Grid
      rowGap="8"
      columnGap="4"
      minH="100vh"
      m="4"
      w="5xl"
      gridTemplateColumns="repeat(3, 1fr)"
    >
      {articles.map((article) => (
        <GridItem key={article.title}>
          <Link
            to="#"
            maxW="40%"
            style={{
              textDecoration: 'none',
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            <Heading as="h3" size="lg" textAlign="start" mb="4">
              {article.title}
            </Heading>
            <Text color="gray.200" mb="4">
              23 de Junho, 2022 - 5 min de leitura
            </Text>
            <Image
              src={article.img}
              w="100%"
              h="200px"
              objectFit="cover"
              borderRadius="4"
              transition="box-shadow 0.1s"
            />
          </Link>
        </GridItem>
      ))}
    </Grid>
  )
}
