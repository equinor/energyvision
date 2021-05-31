import { Heading } from '@components'
import { IngressBlockRenderer, BlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TextBlockData } from '../../types/types'
import styled from 'styled-components'

const StyledTextBlock = styled.section`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type TextBlockProps = {
  data: TextBlockData
}

const TextBlock = ({ data }: TextBlockProps) => {
  const { overline, title, ingress, text } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text) return null

  return (
    <StyledTextBlock>
      {overline && <div>{overline}</div>}
      {title && (
        <Heading size="xl" level="h2">
          {title}
        </Heading>
      )}
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
          blocks={text}
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
