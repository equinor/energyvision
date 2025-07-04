import QuoteComponent from '../../../Quote'
import type { PortableTextBlock } from '@portabletext/types'
import type { QuoteData } from '../../../../../types/index'
import { twMerge } from 'tailwind-merge'

type QuoteRenderer = {
  _key: string
  _type: string
} & QuoteData

type BlockProps = {
  isInline: boolean
  value: QuoteRenderer
  className?: string
} & PortableTextBlock

export const Quote = (quote: BlockProps) => {
  const { value, className } = quote
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }

  return (
    <div className={twMerge(`px-layout-md my-16 mx-auto clear-both`, className)}>
      <QuoteComponent data={data} />
    </div>
  )
}
