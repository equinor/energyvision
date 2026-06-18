'use client'
import type { PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import { PieChart, type PieChartProps } from '@/core/PieChart/PieChart'
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

const PieChartBlock = ({
  anchor,
  className,
  chartData,
  title,
  hideTitle,
}: PieChartBlockProps) => {
  const { data, labelPostfix, labelPrefix } = chartData || {}

  const formattedData = data?.map(dataItem => {
    return {
      ...dataItem,
      value: Number(dataItem.value),
      labelPostfix,
      labelPrefix,
    }
  })

  return (
    <section
      className={twMerge(
        `mx-auto max-w-content px-layout-sm pb-page-content lg:px-layout-lg`,
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
      {formattedData && formattedData?.length > 0 && (
        <PieChart data={formattedData} />
      )}
    </section>
  )
}

export default PieChartBlock
