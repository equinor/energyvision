'use client'
import { twMerge } from 'tailwind-merge'
import { PortableTextBlock } from 'next-sanity'
import Blocks from '@/portableText/Blocks'
import { LineChart, LineChartProps } from '@/core/LineChart/LineChart'

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
        `px-layout-sm ${useLayoutMd && !useTextWidth ? 'lg:px-layout-md' : 'lg:px-layout-lg'} ${useTextWidth ? 'max-w-text' : ''} pb-page-content`,
        className,
      )}
      id={anchor}
    >
      {title && <Blocks variant="h2" value={title} className={`${hideTitle ? 'sr-only' : ''}`} />}
      <div className="flex">
        {charts && charts?.length > 0 && charts?.map((chart: LineChartProps) => <LineChart key={chart.id} {...chart} />)}
      </div>
    </section>
  )
}

export default LineChartBlock
