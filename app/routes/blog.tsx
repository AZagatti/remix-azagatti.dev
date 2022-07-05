import { Flex } from '@chakra-ui/react'
import type { ErrorBoundaryComponent } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <p>{JSON.stringify(error.name)}</p>
        <p>{JSON.stringify(error.message)}</p>
        <Scripts />
      </body>
    </html>
  )
}
