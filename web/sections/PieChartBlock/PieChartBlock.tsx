'use client'
import { twMerge } from 'tailwind-merge'
import { PieChart, PieChartProps } from '@/core/PieChart/PieChart'
import { PortableTextBlock } from 'next-sanity'
import Blocks from '@/portableText/Blocks'

export type PieChartBlockProps = {
  type: string
  id: string
  anchor?: string
  className?: string
  title?: PortableTextBlock[]
  hideTitle?: boolean
  chartData?: {
    labelPrefix?: string
    labelPostfix?: string
  } & PieChartProps
}

const PieChartBlock = ({ anchor, className, chartData, title, hideTitle }: PieChartBlockProps) => {
  const { data, labelPostfix, labelPrefix } = chartData || {}

  const formattedData = data?.map((dataItem) => {
    return {
      ...dataItem,
      value: Number(dataItem.value),
      labelPostfix,
      labelPrefix,
    }
  })
  console.log('formattedData', formattedData)

  return (
    <section className={twMerge(`px-layout-lg pb-page-content`, className)} id={anchor}>
      {title && <Blocks variant="h2" value={title} className={`${hideTitle ? 'sr-only' : ''}`} />}
      {formattedData && formattedData?.length > 0 && <PieChart data={formattedData} />}
    </section>
  )
}

export default PieChartBlock
