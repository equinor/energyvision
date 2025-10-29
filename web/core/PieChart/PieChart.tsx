import { forwardRef } from 'react'
import { Cell, Legend, Pie, PieChart as _PieChart, PieProps, PieLabelRenderProps, Tooltip } from 'recharts'

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, fill, payload }: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * (Number(midAngle) ?? 1))
  const cos = Math.cos(-RADIAN * (Number(midAngle) ?? 1))
  const sx = (Number(cx) ?? 0) + ((Number(outerRadius) ?? 0) + 10) * cos
  const sy = (Number(cy) ?? 0) + ((Number(outerRadius) ?? 0) + 10) * sin
  const mx = (Number(cx) ?? 0) + ((Number(outerRadius) ?? 0) + 30) * cos
  const my = (Number(cy) ?? 0) + ((Number(outerRadius) ?? 0) + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} className="fill-slate-80 text-slate-80">
        {/* @ts-ignore: todo merge custom with payload defautl */}
        {`${payload?.labelPrefix ? payload?.labelPrefix : ''}${value}${payload?.labelPostfix ? payload?.labelPostfix : ''}`}
      </text>
    </g>
  )
}

/* export type PieDataItem = {
  name: string
  value: string
} */
export type PieChartProps = PieProps

export const PieChart = forwardRef<SVGSVGElement, PieChartProps>(function PieChart(
  { data = [], isAnimationActive = true },
  ref,
) {
  const COLORS = ['#007079', '#FBDD79', '#86A7AC', '#DF6D62', '#49709C', '#7D0023', '#243746']

  return (
    <_PieChart
      ref={ref}
      responsive
      className="*:focus-visible:envis-outline aspect-square max-h-[50vh] w-full max-w-[500px] *:focus:outline-none"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        fill="#8884d8"
        label={(props) => renderCustomizedLabel(props)}
        legendType="circle"
        isAnimationActive={isAnimationActive}
      >
        {data?.map((entry: any, index: number) => (
          <Cell key={`cell-${entry._key}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </_PieChart>
  )
})
