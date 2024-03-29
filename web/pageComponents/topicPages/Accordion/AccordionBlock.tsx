import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import Image, { Ratios } from '../../shared/SanityImage'
import IngressText from '../../shared/portableText/IngressText'
import Accordion from './Accordion'
import { FAQPageJsonLd } from 'next-seo'

import type { AccordionData, AccordionListData } from '../../../types/types'
import { toPlainText } from '@portabletext/react'
import { Heading } from '../../../core/Typography'

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

const Img = styled(Image)`
  border-radius: 50%;
`

type AccordionBlockProps = {
  data: AccordionData
  anchor?: string
}

const buildJsonLdElements = (data: AccordionListData[]) => {
  return data.map((item) => {
    return {
      questionName: item.title,
      acceptedAnswerText: toPlainText(item.content),
    }
  })
}

const AccordionBlock = ({ data, anchor }: AccordionBlockProps) => {
  const { title, ingress, designOptions, accordion, id, image, enableStructuredMarkup } = data
  const { background, dark } = designOptions
  return (
    <>
      <StyledTextBlockWrapper background={background} id={anchor || data.anchor}>
        <StyledTextBlock className={`${dark ? 'dark' : ''} flex flex-col gap-6`}>
          {image?.asset && (
            <div className="w-[200px]">
              <Img image={image} maxWidth={200} aspectRatio={Ratios.ONE_TO_ONE} />
            </div>
          )}
          {title && <Heading value={title} as="h2" variant="xl" className="mb-2" />}
          {ingress && <IngressText value={ingress} />}
          {accordion && accordion.length > 0 && (
            <Accordion data={accordion} id={id} hasTitle={!!title} queryParamName={id} />
          )}
        </StyledTextBlock>
      </StyledTextBlockWrapper>
      {enableStructuredMarkup && accordion && <FAQPageJsonLd mainEntity={buildJsonLdElements(accordion)} />}
    </>
  )
}

export default AccordionBlock
