import BlockContent from '@sanity/block-content-to-react'
import { Text, Heading } from '@components'
import styled from 'styled-components'
import { PortableTextBlock } from '../../../types/types'

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

export const PaddedBlockRenderer = (props: { children: string[]; node: PortableTextBlock }) => {
  const { children, node } = props
  const { style = 'normal' } = node

  if (style === 'h2') {
    return (
      <Container>
        <Heading level="h2" size="lg">
          {children}
        </Heading>
      </Container>
    )
  }
  if (style === 'h3') {
    return (
      <Container>
        <Heading level="h3" size="md">
          {children}
        </Heading>
      </Container>
    )
  }

  if (style === 'normal') {
    return (
      <Container>
        <Text> {children}</Text>
      </Container>
    )
  }

  if (style === 'smallText') {
    return (
      <Container>
        <Text size="small"> {children}</Text>
      </Container>
    )
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
