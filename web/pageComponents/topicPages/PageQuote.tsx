import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/index'
import { BackgroundContainer } from '@components'
import { twMerge } from 'tailwind-merge'

const PageQuote = ({ data, anchor, className }: { data: QuoteData; anchor?: string; className?: string }) => {
  const { designOptions } = data
  const { background } = designOptions
  return (
    <BackgroundContainer background={background} id={anchor}>
      <div className={twMerge(`pr-layout-lg pl-layout-md pb-page-content max-w-viewport mx-auto`, className)}>
        <Quote data={data} />
      </div>
    </BackgroundContainer>
  )
}

export default PageQuote
