import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import getBgClassName from '../../common/helpers/getBackgroundColor'

const PageQuote = ({ data, anchor, className }: { data: QuoteData; anchor?: string; className?: string }) => {
  const { designOptions } = data
  const { background } = designOptions
  return (
    <div
      className={twMerge(
        `pr-layout-lg pl-layout-md mx-auto max-w-viewport ${getBgClassName(background.backgroundUtility)}`,
        className,
      )}
      id={anchor}
    >
      <Quote data={data} />
    </div>
  )
}

export default PageQuote
