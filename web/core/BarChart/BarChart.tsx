import { forwardRef } from 'react'
import { Legend, BarChart as _BarChart, Tooltip, BarProps, Bar, YAxis, XAxis, CartesianGrid } from 'recharts'
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

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { chartTitle, chartSource, data = [], yUnitLabel, xAxisDataKey, yUnitLabelPlacement, showLegend, theme = 'blue' },
  ref,
) {
  console.log('Core BarChart data', data)
  const dataKeys = Object.keys(data[0].data).filter((key: any) => key !== xAxisDataKey)
  const chartData = data?.map((dataItem: any) => dataItem.data)
  console.log('Core BarChart chartData', chartData)
  const COLORS = themes[theme]

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry
    return <span style={{ color }}>{String(value).replaceAll('_', ' ')}</span>
  }
  const renderTooltip = (value: any, name: any, props: any) => {
    console.log('renderTooltip value', value)
    console.log('renderTooltip name', name)
    console.log('renderTooltip props', props)
    return [`${value}${yUnitLabel}`, String(name).replaceAll('_', ' ')]
  }

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
        <Tooltip formatter={renderTooltip} />
        {showLegend && <Legend formatter={renderLegendText} />}
        {dataKeys.map((key: any, index: number) => (
          <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
        ))}
      </_BarChart>
    </div>
  )
})
