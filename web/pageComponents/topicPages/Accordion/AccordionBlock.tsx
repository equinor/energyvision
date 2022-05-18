import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import TitleText from '../../shared/portableText/TitleText'
import IngressText from '../../shared/portableText/IngressText'
import Accordion from './Accordion'

import type { AccordionData } from '../../../types/types'

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

const StyledHeading = styled(TitleText)`
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
        {title && <StyledHeading value={title} />}
        {ingress && <IngressText value={ingress} />}
        {accordion && accordion.length > 0 && (
          <Accordion data={accordion} id={id} hasTitle={!!title} queryParamName={id} />
        )}
      </StyledTextBlock>
    </StyledTextBlockWrapper>
  )
}

export default AccordionBlock
