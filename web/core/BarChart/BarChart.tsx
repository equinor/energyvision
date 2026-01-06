import { forwardRef } from 'react'
import {
  Legend,
  BarChart as _BarChart,
  Tooltip,
  BarProps,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  TooltipContentProps,
} from 'recharts'
import { Typography } from '../Typography'

type themeVariant = 'green' | 'blue' | 'red'
export type BarChartProps = {
  data: any
  yUnitLabel?: string
  yUnitLabelPlacement?: string
  chartTitle?: string
  chartSource?: string
  showLegend?: boolean
  xAxisDataKey?: string
  theme?: themeVariant
} & BarProps

const themes: Record<themeVariant, string[]> = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#234057', '#49709c', '#a8c3db', '#c2daeb'],
  red: ['#ff1243'],
}

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length
  return (
    <div
      className={`flex flex-col items-start gap-1 border border-grey-20 bg-white-100 p-2 ${isVisible ? 'visible' : 'hidden'}`}
    >
      {isVisible && (
        <>
          <span>{label}:</span>
          {payload?.map((set: any) => {
            return (
              <span key={set.dataKey} className="flex gap-2">
                <span className="aspect-square size-1 rounded-full" style={{ color: set.color }} />
                <span className="text-slate-80">{`${String(set.name).replaceAll('_', ' ')}: ${set.value}`}</span>
              </span>
            )
          })}
        </>
      )}
    </div>
  )
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { chartTitle, chartSource, data = [], yUnitLabel, xAxisDataKey, yUnitLabelPlacement, showLegend, theme = 'blue' },
  ref,
) {
  
  const dataKeys = Object.keys(data[0].data).filter((key: any) => key !== xAxisDataKey)
  const chartData = data?.map((dataItem: any) => dataItem.data)
  const COLORS = themes[theme]

  const renderLegendText = (value: string, entry: any) => {
    return <span className="text-slate-80">{String(value).replaceAll('_', ' ')}</span>
  }
  /*   const renderTooltip = (value: any, name: any, props: any) => {
    return [`${value}${yUnitLabel}`, String(name).replaceAll('_', ' ')]
  } */

  return (
    <div ref={ref} className="relative h-full w-full">
      <Typography variant="div" group="plain" className="mb-2 text-base">
        {chartTitle}
      </Typography>
      <Typography variant="div" group="plain" className="mb-4 text-sm">
        {chartSource}
      </Typography>
      <_BarChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis allowDecimals={true} dataKey={xAxisDataKey} />
        <YAxis
          width="auto"
          {...(yUnitLabelPlacement !== 'false' && {
            label: {
              value: yUnitLabel,
              angle: -90,
              position: yUnitLabelPlacement,
            },
          })}
        />
        <Tooltip content={CustomTooltip} />
        {showLegend && <Legend formatter={renderLegendText} />}
        {dataKeys.map((key: any, index: number) => (
          <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
        ))}
      </_BarChart>
    </div>
  )
})
