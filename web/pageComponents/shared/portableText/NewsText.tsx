/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextProps } from '@portabletext/react'
import { Text, List } from '@components'
import styled from 'styled-components'

import { Sub, Sup, ExternalLink, InternalLink, FigureWithLayout, Quote, Fact, h2Heading, h3Heading } from './components'
import isEmpty from './helpers/isEmpty'
import type { PortableTextBlock } from '@portabletext/types'

const { Item } = List

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`
const ContainerWithBottomSpace = styled(Container)`
  margin-bottom: var(--space-medium);
`

const defaultSerializers = {
  block: {
    h2: (props: PortableTextBlock) => <Container>{h2Heading(props)}</Container>,
    h3: (props: PortableTextBlock) => <Container>{h3Heading(props)}</Container>,
    normal: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <Container>
          <Text>
            <>{children}</>
          </Text>
        </Container>
      )
    },
    smallText: ({ children }: PortableTextBlock) => {
      if (isEmpty(children)) return null
      return (
        <Container>
          <Text size="small">
            <>{children}</>
          </Text>
        </Container>
      )
    },
  },

  marks: { sub: Sub, sup: Sup, link: ExternalLink, internalLink: InternalLink },
  types: {
    positionedInlineImage: FigureWithLayout,
    factbox: Fact,
    pullQuote: Quote,
  },
  list: {
    bullet: ({ children }: PortableTextBlock) => (
      <ContainerWithBottomSpace>
        <List>
          <>{children}</>
        </List>
      </ContainerWithBottomSpace>
    ),
    number: ({ children }: PortableTextBlock) => (
      <ContainerWithBottomSpace>
        <List variant="numbered">
          <>{children}</>
        </List>
      </ContainerWithBottomSpace>
    ),
  },
  listItem: ({ children }: PortableTextBlock) => (
    <Item>
      <>{children}</>
    </Item>
  ),
}

const NewsText = ({ value, components = {}, ...props }: PortableTextProps) => (
  <PortableText
    value={value}
    // eslint-disable-next-line
    // @ts-ignore: Look into the correct way of doing this
    components={{ ...defaultSerializers, ...components }}
    {...props}
  />
)

export default NewsText
