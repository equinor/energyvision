import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/index'
import { BackgroundContainer } from '@core/Backgrounds'
import { twMerge } from 'tailwind-merge'

const PageQuote = ({ data, anchor, className }: { data: QuoteData; anchor?: string; className?: string }) => {
  const { designOptions } = data
  const { background } = designOptions
  return (
    <BackgroundContainer
      className={twMerge(`pr-layout-lg pl-layout-md `, className)}
      background={background}
      id={anchor}
    >
      <Quote data={data} />
    </BackgroundContainer>
  )
}

export default PageQuote
