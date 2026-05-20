import { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import { BarChart, BarChartProps } from '@/core/BarChart/BarChart'
import Blocks from '@/portableText/Blocks'

export type BarChartBlockProps = {
  type: string
  id: string
  anchor?: string
  className?: string
  title?: PortableTextBlock[]
  hideTitle?: boolean
  useLayoutMd?: boolean
  useTextWidth?: boolean
  charts: BarChartProps[]
}

const BarChartBlock = ({
  anchor,
  className,
  charts,
  title,
  hideTitle,
  useLayoutMd,
  useTextWidth,
}: BarChartBlockProps) => {
  return (
    <section
      className={twMerge(
        `px-layout-sm ${useLayoutMd && !useTextWidth ? 'lg:px-layout-md' : 'lg:px-layout-lg'} ${useTextWidth ? 'max-w-text' : ''} pb-page-content`,
        className,
      )}
      id={anchor}
    >
      {title && (
        <Blocks
          variant='h2'
          value={title}
          className={`${hideTitle ? 'sr-only' : ''}`}
        />
      )}
      <div className='flex'>
        {charts &&
          charts?.length > 0 &&
          charts?.map((chart: BarChartProps) => (
            <BarChart key={chart.id} {...chart} />
          ))}
      </div>
    </section>
  )
}

export default BarChartBlock
