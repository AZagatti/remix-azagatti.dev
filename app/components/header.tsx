import { Flex, Link, Heading, Button, useColorMode } from '@chakra-ui/react'
import { Link as RemixLink } from '@remix-run/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex align="center" justify="center" w="100%" mb="16" paddingY="4">
      <Flex as="nav" w="6xl" justify="space-between" align="center">
        <Heading as="h2" size="lg">
          <Link
            to="/"
            as={RemixLink}
            style={{
              textDecoration: 'none',
            }}
            _hover={{
              opacity: 0.7,
            }}
          >
            André Zagatti
          </Link>
        </Heading>
        <Button bg="transparent" onClick={toggleColorMode}>
          {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>
    </Flex>
  )
}
