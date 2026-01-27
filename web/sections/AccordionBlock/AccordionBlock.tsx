import { toPlainText } from '@portabletext/react'
import { FAQJsonLd } from 'next-seo'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { Typography } from '../../core/Typography'
import type { AccordionData, AccordionListData } from '../../types/index'
import Accordion from './Accordion'

type AccordionBlockProps = {
  data: AccordionData
  anchor?: string
  className?: string
}

const buildJsonLdElements = (data: AccordionListData[]) => {
  return data.map(item => {
    return {
      question: item.title,
      answer: toPlainText(item.content),
    }
  })
}

const AccordionBlock = ({ data, anchor, className }: AccordionBlockProps) => {
  const {
    title,
    ingress,
    designOptions,
    accordion,
    id,
    image,
    enableStructuredMarkup,
  } = data
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  // check if section classname needs: [&_svg]:inline [&_svg]:align-baseline
  return (
    <>
      <section
        id={anchor}
        className={twMerge(
          `${bg} ${dark ? 'dark' : ''} px-layout-lg pb-page-content`,
          className,
        )}
      >
        {image?.asset && (
          <div className='w-1/4'>
            <Image
              image={image}
              grid='xs'
              aspectRatio={'1:1'}
              className='mb-4'
              imageClassName='aspect-square rounded-full'
            />
          </div>
        )}
        {title &&
          (Array.isArray(title) ? (
            <Blocks value={title} variant='h2' />
          ) : (
            <Typography variant='h2'>{title}</Typography>
          ))}
        <div className='flex flex-col'>
          {ingress && <Blocks variant='ingress' value={ingress} />}
          {accordion && accordion.length > 0 && (
            <Accordion
              data={accordion}
              id={id}
              hasSectionTitle={!!title}
              queryParamName={id}
            />
          )}
        </div>
      </section>
      {enableStructuredMarkup && accordion && (
        <FAQJsonLd questions={buildJsonLdElements(accordion)} />
      )}
    </>
  )
}

export default AccordionBlock
