import { forwardRef } from 'react'
import { Legend, BarChart as _BarChart, Tooltip, BarProps, Bar, YAxis, XAxis, CartesianGrid } from 'recharts'

export type BarChartProps = {
  data: any
  yUnitLabel?: string
} & BarProps

export const BarChart = forwardRef<SVGSVGElement, BarChartProps>(function BarChart({ data = [], yUnitLabel }, ref) {
  console.log('Core PieChart data', data)
  const COLORS = ['#007079', '#FBDD79', '#86A7AC', '#DF6D62', '#49709C', '#7D0023', '#243746']

  const dataKeys = Object.keys(data[0].data)?.filter((key: any) => String(key).toLowerCase() !== 'name')
  const chartData = data?.map((dataItem: any) => dataItem.data)

  return (
    <_BarChart
      ref={ref}
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
      className="mt-5 mb-2"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" label={{ value: yUnitLabel, angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      {dataKeys.map((key: any, index: number) => (
        <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
      ))}
    </_BarChart>
  )
})
