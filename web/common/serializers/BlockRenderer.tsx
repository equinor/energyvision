import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import { Text, Heading } from '@components'
import { PortableTextBlock } from '../../types/types'

const StyledHeading = styled(Heading)`
  font-weight: var(--fontWeight-bolder);
  line-height: var(--lineHeight-3);
  margin-bottom: 0.5em;

  &:not(:first-child) {
    margin-top: 1.5em;
  }
`

export const BlockRenderer = (props: { children: string[]; node: PortableTextBlock }) => {
  const { children, node } = props
  const { style = 'normal' } = node

  if (style === 'h2') {
    return (
      <Heading level="h2" size="lg">
        {children}
      </Heading>
    )
  }
  if (style === 'h3') {
    return (
      <StyledHeading level="h3" size="sm">
        {children}
      </StyledHeading>
    )
  }
  if (style === 'smallText') {
    return <Text size="small">{children}</Text>
  }

  if (style === 'normal') {
    return <Text> {children}</Text>
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
