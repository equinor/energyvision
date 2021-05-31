import { CSSProperties } from 'react'
import { Heading, Eyebrow } from '@components'
import { IngressBlockRenderer, BlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { TextBlockData } from '../../types/types'
import styled from 'styled-components'
import type { StyleVariants } from './helpers/backgroundColours'
import { getStyleVariant } from './helpers/backgroundColours'

type StyledTextBlockProps = {
  styleVariant?: StyleVariants
  isInverted: boolean
}

const StyledTextBlock = styled.section`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  /* Where exactly should we put these styles */
  & h2 {
    padding: var(--spacing-small) 0;
  }
  & h2:first-child {
    padding-top: 0;
  }

  & p:last-child {
    margin-bottom: 0;
  }
`
const ColourContainer = styled.div.attrs<StyledTextBlockProps>(
  ({ isInverted }) =>
    isInverted && {
      className: 'inverted-background',
    },
)<StyledTextBlockProps>`
  background-color: var(--background-color);
`

type TextBlockProps = {
  data: TextBlockData
}

const TextBlock = ({ data }: TextBlockProps) => {
  const { overline, title, ingress, text, designOptions } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text) return null

  const { background } = designOptions

  // @TODO: Find a better way with task #334
  const styleVariant = getStyleVariant(background)
  const isInverted = styleVariant === 'five'

  // @TODO: Can we map colours in a better way? Duplicate code atm
  const backgrounds: { [name: string]: string } = {
    none: 'var(--ui-background-default)',
    one: 'var(--moss-green-80)',
    two: 'var(--lichen-green-100)',
    three: 'var(--spruce-wood-90)',
    four: 'var(--mist-blue-100)',
    five: 'var(--slate-blue-100)',
  }
  return (
    <ColourContainer
      style={{ '--background-color': backgrounds[styleVariant] } as CSSProperties}
      isInverted={isInverted}
    >
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
            }}
          />
        )}
      </StyledTextBlock>
    </ColourContainer>
  )
}

export default TextBlock
