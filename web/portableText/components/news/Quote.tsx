import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import QuoteBlock from '@/sections/QuoteBlock/QuoteBlock'
import type { QuoteData } from '../../../types/index'

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
    <div
      className={twMerge(`clear-both mx-auto my-16 px-layout-md`, className)}
    >
      <QuoteBlock data={data} />
    </div>
  )
}
