import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Flex w="100%" align="center" justify="center" mt="16">
      <Box w="5xl">
        <Flex gap="8">
          <Box>
            <Heading as="h4" size="md" mb="8">
              André Zagatti
            </Heading>
            <Text fontSize="lg">Software Engineering @ Zé Delivery</Text>
          </Box>
          <Box>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/azagatti"
              ml="8"
              fontSize="24"
              style={{ textDecoration: 'none' }}
            >
              🐙
            </Link>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/andre-zagatti/"
              ml="8"
              fontSize="24"
              style={{ textDecoration: 'none' }}
            >
              💻
            </Link>
          </Box>
        </Flex>
        <Text fontSize="md" mt="24" mb="8">
          © {new Date().getFullYear()}, André Zagatti
        </Text>
      </Box>
    </Flex>
  )
}
