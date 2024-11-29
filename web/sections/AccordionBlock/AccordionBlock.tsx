import { BackgroundContainer } from '@components'
import Accordion from './Accordion'
import { FAQPageJsonLd } from 'next-seo'

import type { AccordionData, AccordionListData } from '../../types/index'
import { toPlainText } from '@portabletext/react'
import { Heading, Typography } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'

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
      <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
        <div
          className={twMerge(
            `flex flex-col gap-6 max-w-viewport mx-auto pb-page-content px-layout-lg [&_svg]:inline [&_svg]:align-baseline`,
            className,
          )}
        >
          {image?.asset && (
            <div className="w-[200px]">
              <Image image={image} maxWidth={200} aspectRatio={Ratios.ONE_TO_ONE} className="rounded-full" />
            </div>
          )}
          {title &&
            (Array.isArray(title) ? (
              <Heading value={title} as="h2" variant="xl" className="mb-2" />
            ) : (
              <Typography as="h2" variant="xl" className="mb-2">
                {title}
              </Typography>
            ))}
          {ingress && <IngressText value={ingress} />}
          {accordion && accordion.length > 0 && (
            <Accordion data={accordion} id={id} hasTitle={!!title} queryParamName={id} />
          )}
        </div>
      </BackgroundContainer>
      {enableStructuredMarkup && accordion && <FAQPageJsonLd mainEntity={buildJsonLdElements(accordion)} />}
    </>
  )
}

export default AccordionBlock
