'use client'
import { twMerge } from 'tailwind-merge'
import { PortableTextBlock } from 'next-sanity'
import Blocks from '@/portableText/Blocks'
import { BarChart, BarChartProps } from '@/core/BarChart/BarChart'

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
  console.log('BarChartBlock charts', charts)
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
        {charts && charts?.length > 0 && charts?.map((chart: BarChartProps) => <BarChart key={chart.id} {...chart} />)}
      </div>
    </section>
  )
}

export default BarChartBlock
