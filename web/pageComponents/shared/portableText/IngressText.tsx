import { PortableText, PortableTextProps, PortableTextReactComponents } from '@portabletext/react'
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

const IngressText = ({ value, centered = false, components = {}, ...props }: IngressTextProps) => {
  return (
    <PortableText
      value={value}
      components={{ ...defaultComponents(centered), ...components } as PortableTextReactComponents}
      {...props}
    />
  )
}

export default IngressText
