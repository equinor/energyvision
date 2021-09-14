import { Heading, Eyebrow, BackgroundContainer } from '@components'
import { IngressBlockRenderer, BlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TextBlockData } from '../../types/types'
import styled from 'styled-components'
import CallToActions from './CallToActions'

export const StyledTextBlockWrapper = styled(BackgroundContainer)``

const StyledTextBlock = styled.section`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  /* Where exactly should we put these styles */
  /* If the title has an eyebrow we need some tweaks */
  & h2 {
    padding: var(--space-large) 0;
  }
  & h2:first-child {
    padding-top: 0;
  }

  & p:last-child {
    margin-bottom: 0;
  }
`

const TextContainer = styled.div`
  margin-bottom: var(--space-medium);
`

type TextBlockProps = {
  data: TextBlockData
}

const TextBlock = ({ data }: TextBlockProps) => {
  const { overline, title, ingress, text, designOptions, callToActions } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text) return null
  const { background } = designOptions

  return (
    <StyledTextBlockWrapper background={background}>
      <StyledTextBlock>
        {overline && <Eyebrow>{overline}</Eyebrow>}
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
              container: TextContainer,
            }}
          />
        )}
        {callToActions && <CallToActions callToActions={callToActions} />}
      </StyledTextBlock>
    </StyledTextBlockWrapper>
  )
}

export default TextBlock
