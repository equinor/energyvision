import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import Image, { Ratios } from '../../shared/SanityImage'
import IngressText from '../../shared/portableText/IngressText'
import Accordion from './Accordion'
import { FAQPageJsonLd } from 'next-seo'

import type { AccordionData, AccordionListData } from '../../../types/index'
import { toPlainText } from '@portabletext/react'
import { Heading, Typography } from '../../../core/Typography'
import { twMerge } from 'tailwind-merge'

export const StyledTextBlockWrapper = styled(BackgroundContainer)<{ id: string | undefined }>`
  ${({ id }) =>
    id && {
      scrollMarginTop: 'var(--topbar-height)',
    }}
`

const Img = styled(Image)`
  border-radius: 50%;
`

type AccordionBlockProps = {
  data: AccordionData
  anchor?: string
  className?: string
}

const buildJsonLdElements = (data: AccordionListData[]) => {
  return data.map((item) => {
    return {
      questionName: item.title,
      acceptedAnswerText: toPlainText(item.content),
    }
  })
}

const AccordionBlock = ({ data, anchor, className }: AccordionBlockProps) => {
  const { title, ingress, designOptions, accordion, id, image, enableStructuredMarkup } = data

  return (
    <>
      <StyledTextBlockWrapper {...designOptions} id={anchor || data.anchor} renderFragmentWhenPossible>
        <div
          className={twMerge(
            `flex flex-col gap-6 max-w-viewport mx-auto pb-page-content px-layout-lg [&_svg]:inline [&_svg]:align-baseline`,
            className,
          )}
        >
          {image?.asset && (
            <div className="w-[200px]">
              <Img image={image} maxWidth={200} aspectRatio={Ratios.ONE_TO_ONE} />
            </div>
          )}
          {Array.isArray(title) ? (
            <Heading value={title} as="h2" variant="xl" className="mb-2" />
          ) : (
            <Typography as="h2" variant="xl" className="mb-2">
              {title}
            </Typography>
          )}
          {ingress && <IngressText value={ingress} />}
          {accordion && accordion.length > 0 && (
            <Accordion data={accordion} id={id} hasTitle={!!title} queryParamName={id} />
          )}
        </div>
      </StyledTextBlockWrapper>
      {enableStructuredMarkup && accordion && <FAQPageJsonLd mainEntity={buildJsonLdElements(accordion)} />}
    </>
  )
}

export default AccordionBlock
