import { Heading } from '@components'
import { IngressBlockRenderer, BlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TextBlockData } from '../../types/types'
import styled from 'styled-components'

const StyledTextBlock = styled.section`
  padding: var(--space-xLarge) 0;
`

type TextBlockProps = {
  data: TextBlockData
}
// @TODO: Should the Eyebrow component from the Teaser be global exported?

const TextBlock = ({ data }: TextBlockProps) => {
  const { overline, title, ingress, text } = data
  return (
    <StyledTextBlock>
      {overline && <div>{overline}</div>}
      <Heading size="xl" level="h2">
        {title}
      </Heading>
      {ingress && (
        <SimpleBlockContent
          blocks={ingress}
          serializers={{
            types: {
              block: IngressBlockRenderer,
            },
          }}
        />
      )}
      {text && (
        <SimpleBlockContent
          blocks={ingress}
          serializers={{
            types: {
              block: BlockRenderer,
            },
          }}
        />
      )}
    </StyledTextBlock>
  )
}

export default TextBlock
