'use client'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/core/Typography'
import { PieChart, PieChartProps } from '@/core/PieChart/PieChart'

export type PieChartBlockProps = {
  type: string
  id: string
  anchor?: string
  className?: string
  title?: string
  labelPrefix?: string
  labelPostfix?: string
} & PieChartProps

const PieChartBlock = ({ anchor, className, data, title, labelPostfix, labelPrefix }: PieChartBlockProps) => {
  const formattedData = data?.map((dataItem) => {
    return {
      ...dataItem,
      value: Number(dataItem.value),
      labelPostfix,
      labelPrefix,
    }
  })
  return (
    <section className={twMerge(`px-layout-lg pb-page-content`, className)} id={anchor}>
      {title && <Typography variant="h2">{title}</Typography>}
      {formattedData && formattedData?.length > 0 && <PieChart data={formattedData} />}
    </section>
  )
}

export default PieChartBlock
