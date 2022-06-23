import { Flex, Link, Heading, Button, Text } from '@chakra-ui/react'
import { Link as RemixLink } from '@remix-run/react'

export const Header = () => {
  return (
    <Flex align="center" justify="center" w="100%" mb="16" paddingY="4">
      <Flex as="nav" w="5xl" justify="space-between" align="center">
        <Heading as="h2" size="lg">
          <Link
            to="/"
            as={RemixLink}
            style={{
              textDecoration: 'none',
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            André Zagatti
          </Link>
        </Heading>
        <Button bg="transparent">
          <Text>☀️</Text>
        </Button>
      </Flex>
    </Flex>
  )
}
