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
      className={twMerge(``, className)}
      background={background}
      id={anchor}
    >
      <div className='mx-auto max-w-content px-layout-sm lg:pr-layout-lg lg:pl-layout-md'>
        <Quote data={data} />
      </div>
    </BackgroundContainer>
  )
}

export default QuoteBlock
