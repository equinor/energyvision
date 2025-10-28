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
  chartData: BarChartProps
}

const BarChartBlock = ({ anchor, className, chartData, title, hideTitle }: BarChartBlockProps) => {
  const { data, yUnitLabel } = chartData || {}

  console.log('data', data)

  return (
    <section className={twMerge(`px-layout-lg pb-page-content`, className)} id={anchor}>
      {title && <Blocks variant="h2" value={title} className={`${hideTitle ? 'sr-only' : ''}`} />}
      {data && data?.length > 0 && <BarChart data={data} yUnitLabel={yUnitLabel} />}
    </section>
  )
}

export default BarChartBlock
