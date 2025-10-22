/* eslint-disable consistent-return */
import { Box, Card, Stack, Flex, Text, Inline, Button, Label, TextInput } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { CSSProperties, type FormEvent, useState } from 'react'
import { type ObjectInputProps, set, unset } from 'sanity'
import Papa from 'papaparse'
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Sector,
  SectorProps,
  Tooltip,
} from 'recharts'
import { TooltipIndex } from 'recharts/types/state/tooltipSlice'

type Coordinate = {
  x: number
  y: number
}

type PieSectorData = {
  percent?: number
  name?: string | number
  midAngle?: number
  middleRadius?: number
  tooltipPosition?: Coordinate
  value?: number
  paddingAngle?: number
  dataKey?: string
  payload?: any
  labelPrefix?: string
  labelPostfix?: string
}

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
  labelPrefix = '',
  labelPostfix = '',
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * (midAngle ?? 1))
  const cos = Math.cos(-RADIAN * (midAngle ?? 1))
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${labelPrefix} ${value}${labelPostfix}`}</text>
      {/*       <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  )
}

function CustomActiveShapePieChart({
  isAnimationActive = true,
  defaultIndex = undefined,
  data = [],
  labelPrefix = '',
  labelPostfix = '',
}: {
  data?: any
  isAnimationActive?: boolean
  defaultIndex?: TooltipIndex
  labelPrefix?: string
  labelPostfix?: string
}) {
  console.log('CustomActiveShapePieChart data', data)
  const formattedData = data?.map((dataItem: any) => {
    return {
      name: dataItem.name,
      value: Number(dataItem.value),
    }
  })
  console.log('CustomActiveShapePieChart formattedData', formattedData)
  return (
    <PieChart
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
      margin={{
        top: 50,
        right: 120,
        bottom: 0,
        left: 120,
      }}
    >
      <Pie
        // @ts-expect-error the parameter type doesn't match
        activeShape={renderActiveShape}
        data={formattedData}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
      />
      <Tooltip content={() => null} defaultIndex={defaultIndex} />
    </PieChart>
  )
}

const renderCustomizedLabel = ({
  cx,
  cy,
  x,
  y,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value,
  labelPrefix = '',
  labelPostfix = '',
  startAngle,
  endAngle,
  fill,
  payload,
}: PieLabelRenderProps & { labelPrefix?: string; labelPostfix?: string }) => {
  console.log('custom name', name)
  console.log('custom value', value)
  console.log('custom labelPrefix', labelPrefix)
  console.log('custom labelPostfix', labelPostfix)

  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * (midAngle ?? 1))
  const cos = Math.cos(-RADIAN * (midAngle ?? 1))
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${labelPrefix} ${value}${labelPostfix}`}</text>
    </g>

    /*     <text x={x} y={y}>{`${labelPrefix} ${value}${labelPostfix}`}</text> */
  )
}

function SimplePieChart({
  data = [],
  labelPrefix = '',
  labelPostfix = '',
  isAnimationActive = true,
}: {
  data?: any
  labelPrefix?: string
  labelPostfix?: string
  isAnimationActive?: boolean
}) {
  console.log('SimplePieChart data', data)
  const formattedData = data?.map((dataItem: any) => {
    return {
      name: dataItem.name,
      value: Number(dataItem.value),
    }
  })
  console.log('SimplePieChart formattedData', formattedData)
  const COLORS = ['#007079', '#FBDD79', '#86A7AC', '#DF6D62', '#49709C', '#7D0023', '#243746']

  return (
    <PieChart
      responsive
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
      <Pie
        data={formattedData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        fill="#8884d8"
        label={(props: any) => {
          console.log('props', props)
          return renderCustomizedLabel({ ...props, labelPrefix, labelPostfix })
        }}
        legendType="circle"
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry: any, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export const PieChartInputComponent = (props: any) => {
  const { value, onChange } = props
  const { title, data, labelPrefix = '', labelPostfix = '' } = value

  console.log('value', value)
  console.log('props', props)
  const updateValue = (v?: any) => {
    return onChange(set(v))
  }
  const resetValue = () => {
    return onChange(unset())
  }

  const handlePrefix = (event: any) => {
    const prefix = event.currentTarget.value
    console.log('pre event.currentTarget.value', event.currentTarget.value)
    const newValue = {
      labelPrefix: prefix,
    }
    updateValue({ ...value, ...newValue })
  }
  const handlePostfix = (event: any) => {
    const postfix = event.currentTarget.value
    console.log('post event.currentTarget.value', event.currentTarget.value)
    const newValue = {
      labelPostfix: postfix,
    }
    updateValue({ ...value, ...newValue })
  }

  const handleTitle = (event: any) => {
    const title = event.currentTarget.value
    console.log('post event.currentTarget.value', event.currentTarget.value)
    const newValue = {
      title: title,
    }
    updateValue({ ...value, ...newValue })
  }

  const handleFileUpload = (e: any) => {
    const files = e.target.files
    if (files) {
      Papa.parse(files[0], {
        header: false,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log('Finished, set spreadsheet data', results.data)
          const formattedData = results.data.map((row: any) => {
            return {
              _type: 'dataItem',
              _key: uuid(),
              name: row[0],
              value: row[1],
            }
          })
          console.log('formattedData', formattedData)

          const newValue = {
            data: [...formattedData],
          }
          updateValue({ ...value, ...newValue })
        },
      })
    }
  }

  /*   type Props = { children: ReactNode } */
  const LabelWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <label
        style={{
          position: 'relative',
          fontWeight: '500',
          padding: '1px 0px',
          fontSize: '0.8125rem',
          lineHeight: 'calc(1.46154)',
          color: 'var(--card-fg-color)',
        }}
      >
        {children}
      </label>
    )
  }

  return (
    <div>
      {/*           {data && <Button text="Reset all" mode="ghost" onClick={() => resetValue()} />} */}
      {!data && (
        <Card padding={[3, 3, 4, 5]} radius={2} shadow={1}>
          <Stack padding={3} space={[3, 3, 4, 5]}>
            <Text size={3}> Import a spreadsheet</Text>
            <Text size={2}>Column A (1) should hold the names and Column B (2) should be the values to the names</Text>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </Stack>
        </Card>
      )}

      <Stack padding={3} space={[3, 3, 4, 5]}>
        <LabelWrapper>
          Title
          <TextInput onChange={handleTitle} value={title} />
        </LabelWrapper>
        <LabelWrapper>
          Label prefix
          <TextInput onChange={handlePrefix} value={labelPrefix} />
        </LabelWrapper>
        <LabelWrapper>
          Label postfix
          <TextInput onChange={handlePostfix} value={labelPostfix} />
        </LabelWrapper>
      </Stack>
      <Stack padding={3} space={[3, 3, 4, 5]}>
        <Text>Pie chart preview</Text>
        <SimplePieChart data={data ?? []} labelPrefix={labelPrefix} labelPostfix={labelPostfix} />
      </Stack>
    </div>
  )
}

const PieChartPreview = (props?: any) => {
  const { schemaType } = props

  return (
    <>
      <Box padding={3}>
        <Inline space={3}>
          <Card>
            <Text>{schemaType?.title ?? 'Pie chart component'}</Text>
          </Card>
        </Inline>
      </Box>
    </>
  )
}

export default {
  title: 'Pie chart',
  name: 'pieChart',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'labelPrefix',
      type: 'string',
      title: 'Label prefix',
    },
    {
      name: 'labelPostfix',
      type: 'string',
      title: 'Label postfix',
    },
    {
      name: 'data',
      type: 'array',
      of: [
        {
          title: 'Data item',
          name: 'dataItem',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'value',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  components: {
    input: PieChartInputComponent,
    preview: PieChartPreview,
  },
  preview: {
    select: {},
  },
}
