/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import styled from 'styled-components'
import { h3Heading, h2Heading, Sub, Sup, ExternalLink, InternalLink } from './components'
import type { PortableTextBlock } from '@portabletext/types'

import { Text, List } from '@components'

const { Item } = List

const StyledList = styled(List)`
  font-size: var(--typeScale-2);
`

// @TODO Not able to figure out exactly the types
function isEmpty(children: any[]): boolean {
  return children.every((child) => child.length === 0)
}

const defaultComponents = {
  block: {
    h2: h2Heading,
    h3: h3Heading,
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return <Text size="md">{children}</Text>
    },
    smallText: ({ children }: PortableTextBlock) => <Text size="small">{children}</Text>,
  },
  marks: { sub: Sub, sup: Sup, link: ExternalLink, internalLink: InternalLink },
  list: {
    bullet: ({ children }: PortableTextBlock) => <StyledList>{children}</StyledList>,
    number: ({ children }: PortableTextBlock) => <StyledList variant="numbered">{children}</StyledList>,
  },
  listItem: ({ children }: PortableTextBlock) => <Item>{children}</Item>,
}
const centeredComponents = {
  block: {
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <Text size="md" centered>
          {children}
        </Text>
      )
    },
    smallText: ({ children }: PortableTextBlock) => (
      <Text size="small" centered={true}>
        {children}
      </Text>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextBlock) => <StyledList centered>{children}</StyledList>,
    number: ({ children }: PortableTextBlock) => (
      <StyledList centered variant="numbered">
        {children}
      </StyledList>
    ),
  },
}

type IngressTextProps = {
  centered?: boolean
} & PortableTextProps

const IngressText = ({ value, centered = false, components = {}, ...props }: IngressTextProps) => (
  <PortableText
    value={value}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={
      centered
        ? { ...defaultComponents, ...centeredComponents, ...components }
        : { ...defaultComponents, ...components }
    }
    {...props}
  />
)

export default IngressText
