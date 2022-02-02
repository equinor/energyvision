import { BackgroundContainer } from '@components'
import { BlockRenderer, TitleBlockRenderer } from '../../../common/serializers'
import SimpleBlockContent from '../../../common/SimpleBlockContent'
import type { AccordionData } from '../../../types/types'
import styled from 'styled-components'
import Accordion from './Accordion'

export const StyledTextBlockWrapper = styled(BackgroundContainer)<{ id: string | undefined }>`
  ${({ id }) =>
    id && {
      scrollMarginTop: 'var(--topbar-height)',
    }}
`

const StyledTextBlock = styled.section`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(TitleBlockRenderer)`
  padding: 0 0 var(--space-large) 0;
`

type AccordionBlockProps = {
  data: AccordionData
}

const AccordionBlock = ({ data }: AccordionBlockProps) => {
  const { title, ingress, designOptions, accordion, id, anchor } = data

  const { background } = designOptions
  return (
    <StyledTextBlockWrapper background={background} id={anchor}>
      <StyledTextBlock>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        {ingress && (
          <SimpleBlockContent
            blocks={ingress}
            serializers={{
              types: {
                block: BlockRenderer,
              },
            }}
          />
        )}
        {accordion && accordion.length > 0 && (
          <Accordion data={accordion} id={id} hasTitle={!!title} queryParamName={id} />
        )}
      </StyledTextBlock>
    </StyledTextBlockWrapper>
  )
}

export default AccordionBlock
