import { Flex } from '@chakra-ui/react'
import { Outlet } from '@remix-run/react'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'

export default function Index() {
  return (
    <Flex w="100%" align="center" justify="center" direction="column">
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  )
}
