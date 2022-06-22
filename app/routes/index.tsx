import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { Link as RemixLink } from '@remix-run/react'

const articles = [
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
  {
    img: 'https://i.picsum.photos/id/395/1080/720.jpg?hmac=byCZIXjUUy7OKldSyOzNE-17JWgRkTK3a4SIq4c3VeA',
    title: 'Javascript Async',
  },
]

export default function Index() {
  return (
    <Flex w="100%" align="center" justify="center">
      <Grid
        rowGap="8"
        columnGap="4"
        minH="100vh"
        m="4"
        maxW="5xl"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        {articles.map((article) => (
          <GridItem key={article.title}>
            <Link
              to="#"
              as={RemixLink}
              maxW="40%"
              style={{
                textDecoration: 'none',
              }}
              _hover={{
                opacity: 0.8,
              }}
            >
              <Heading as="h2" size="lg" textAlign="start" mb="4">
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
    </Flex>
  )
}
