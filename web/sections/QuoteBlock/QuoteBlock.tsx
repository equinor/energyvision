import { twMerge } from 'tailwind-merge'
import { BackgroundContainer } from '@/core/Backgrounds'
import Quote from '@/core/Quote/Quote'
import type { QuoteData } from '../../types/index'

const QuoteBlock = ({
  data,
  anchor,
  className,
}: {
  data: QuoteData
  anchor?: string
  className?: string
}) => {
  const { designOptions } = data
  const { background } = designOptions
  return (
    <BackgroundContainer
      className={twMerge(`pr-layout-lg pl-layout-md`, className)}
      background={background}
      id={anchor}
    >
      <Quote data={data} />
    </BackgroundContainer>
  )
}

export default QuoteBlock
