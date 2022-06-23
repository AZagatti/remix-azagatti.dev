import type { LinkProps } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'
import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'

export const Link = ({ children, ...props }: LinkProps & RemixLinkProps) => {
  return (
    <ChakraLink as={RemixLink} {...props}>
      {children}
    </ChakraLink>
  )
}
