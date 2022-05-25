/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import styled from 'styled-components'
import { h3Heading, h2Heading, Sub, Sup, ExternalLink, InternalLink } from './components'
import isEmpty from './helpers/isEmpty'
import type { PortableTextBlock } from '@portabletext/types'

import { Text, List } from '@components'

const { Item } = List

const StyledList = styled(List)`
  font-size: var(--typeScale-2);
`

const defaultComponents = (centered: boolean) => {
  return {
    block: {
      h2: h2Heading,
      h3: h3Heading,
      normal: ({ children }: PortableTextBlock) => {
        if (isEmpty(children)) return null
        return (
          <Text size="md" centered={centered}>
            <>{children}</>
          </Text>
        )
      },
      smallText: ({ children }: PortableTextBlock) => (
        <Text size="small" centered={centered}>
          <>{children}</>
        </Text>
      ),
    },
    marks: { sub: Sub, sup: Sup, link: ExternalLink, internalLink: InternalLink },
    list: {
      bullet: ({ children }: PortableTextBlock) => (
        <StyledList centered={centered}>
          <>{children}</>
        </StyledList>
      ),
      number: ({ children }: PortableTextBlock) => (
        <StyledList variant="numbered" centered={centered}>
          <>{children}</>
        </StyledList>
      ),
    },
    listItem: ({ children }: PortableTextBlock) => (
      <Item>
        <>{children}</>
      </Item>
    ),
  }
}

type IngressTextProps = {
  centered?: boolean
} & PortableTextProps

const IngressText = ({ value, centered = false, components = {}, ...props }: IngressTextProps) => (
  <PortableText
    value={value}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={{ ...defaultComponents(centered), ...components }}
    {...props}
  />
)

export default IngressText
