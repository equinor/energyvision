'use client'
import type { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import { LineChart, type LineChartProps } from '@/core/LineChart/LineChart'
import Blocks from '@/portableText/Blocks'

export type LineChartBlockProps = {
  type: string
  id: string
  anchor?: string
  className?: string
  title?: PortableTextBlock[]
  hideTitle?: boolean
  useLayoutMd?: boolean
  useTextWidth?: boolean
  charts: LineChartProps[]
}

const LineChartBlock = ({
  anchor,
  className,
  charts,
  title,
  hideTitle,
  useLayoutMd,
  useTextWidth,
}: LineChartBlockProps) => {
  return (
    <section
      className={twMerge(
        `${useTextWidth ? 'max-w-text' : 'max-w-content'} mx-auto pb-page-content`,
        className,
      )}
      id={anchor}
    >
      <div className='px-layout-sm lg:px-layout-lg'>
        {title && (
          <Blocks
            variant='h2'
            value={title}
            className={`${hideTitle ? 'sr-only' : ''}`}
          />
        )}
      </div>
      <div
        className={`flex px-layout-sm ${useLayoutMd && !useTextWidth ? 'lg:px-layout-md' : 'lg:px-layout-lg'}`}
      >
        {charts &&
          charts?.length > 0 &&
          charts?.map((chart: LineChartProps) => (
            <LineChart key={chart.id} {...chart} />
          ))}
      </div>
    </section>
  )
}

export default LineChartBlock
