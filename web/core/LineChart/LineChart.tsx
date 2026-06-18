import { forwardRef } from 'react'
import {
  Legend,
  LineChart as _LineChart,
  Tooltip,
  LineProps,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  TooltipContentProps,
} from 'recharts'
import { Typography } from '../Typography'

type themeVariant = 'green' | 'blue' | 'red'



const themes: Record<themeVariant, string[]> = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#234057', '#49709c', '#a8c3db', '#c2daeb'],
  red: ['#ff1243'],
}

type CustomTooltipProps = {
  headerNames?: any
} & TooltipContentProps<string | number, string>

const CustomTooltip = ({ active, payload, label, headerNames }:CustomTooltipProps) => {
  const isVisible = active && payload && payload.length
  return (
    <div
      className={`flex flex-col items-start gap-1 border border-grey-20 bg-white-100 p-2 ${isVisible ? 'visible' : 'hidden'}`}
    >
      {isVisible && (
        <>
          <span>{label}:</span>
          {payload?.map((set: any) => {
            const headerName = headerNames?.find((item: any) => item.value === set.name).title
            return (
              <span key={set.dataKey} className="flex gap-2">
                <span className="aspect-square size-1 rounded-full" style={{ color: set.color }} />
                <span className="text-slate-80">{`${headerName}: ${set.value}`}</span>
              </span>
            )
          })}
        </>
      )}
    </div>
  )
}

export type LineChartProps = {
  data: any
  yUnitLabel?: string
  yUnitLabelPlacement?: string
  chartTitle?: string
  chartSource?: string
  showLegend?: boolean
  xAxisDataKey?: string
  theme?: themeVariant
  headerNames?: any
  unitLabel?: string
} & LineProps

export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  { chartTitle, chartSource, data = [], yUnitLabel, xAxisDataKey, yUnitLabelPlacement, showLegend, headerNames, theme = 'blue' },
  ref,
) {
 
  const dataKeys = Object.keys(data[0].data).filter((key: any) => key !== xAxisDataKey)
  let hasNegatives = false
  const chartData = data?.map((dataItem: any) => {
    if (Object.values(dataItem.data).some((value) => Math.sign(Number(value)) <= -1)) {
      hasNegatives = true
    }
    return dataItem.data
  })
  const COLORS = themes[theme]

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry
    const headerName = headerNames?.find((item: any) => item.value === value).title
    return <span className="text-slate-80">{headerName}</span>
  }

  let yAxisPadding = {
    top: 20,
  }
  if (hasNegatives) {
    yAxisPadding = Object.assign(yAxisPadding, {
      ...yAxisPadding,
      bottom: 20,
    })
  }

  return (
    <div ref={ref} className="relative h-full w-full">
      <Typography variant="div" group="plain" className="mb-2 text-base">
        {chartTitle}
      </Typography>
      <Typography variant="div" group="plain" className="mb-4 text-sm">
        {chartSource}
      </Typography>
      <_LineChart
        responsive
        data={chartData}
        className="w-full max-w-[700px] max-h-[70vh] aspect-[1.618] m-5"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis
          width="auto"
          padding={yAxisPadding}
          {...(yUnitLabelPlacement !== 'false' && {
            label: {
              value: yUnitLabel,
              angle: -90,
              position: yUnitLabelPlacement,
            },
          })}
        />
        {/**@ts-ignore:todo types */}
        <Tooltip content={<CustomTooltip headerNames={headerNames} />}/>
        {showLegend && <Legend formatter={renderLegendText} />}
        {dataKeys.map((key: any, index: number) => (
          <Line key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
        ))}
      </_LineChart>
    </div>
  )
})
