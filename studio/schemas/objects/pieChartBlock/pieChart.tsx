/* eslint-disable consistent-return */
import { Box, Card, Stack, Text, Inline, TextInput } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { set } from 'sanity'
import Papa from 'papaparse'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, Tooltip } from 'recharts'

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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {/* @ts-ignore: todo merge custom with payload defautl */}
        {`${payload?.labelPrefix ? payload?.labelPrefix : ''}${value}${payload?.labelPostfix ? payload?.labelPostfix : ''}`}
      </text>
    </g>
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
      ...dataItem,
      value: Number(dataItem.value),
      labelPostfix,
      labelPrefix,
    }
  })
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
        label={(props) => renderCustomizedLabel(props)}
        legendType="circle"
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${entry._key}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export const PieChartInputComponent = (props: any) => {
  const { value, onChange } = props
  const { data, labelPrefix = '', labelPostfix = '' } = value || {}

  const updateValue = (v?: any) => {
    return onChange(set(v))
  }

  const handlePrefix = (event: any) => {
    const prefix = event.currentTarget.value
    const newValue = {
      labelPrefix: prefix,
    }
    updateValue({ ...value, ...newValue })
  }
  const handlePostfix = (event: any) => {
    const postfix = event.currentTarget.value
    const newValue = {
      labelPostfix: postfix,
    }
    updateValue({ ...value, ...newValue })
  }

  const handleFileUpload = (e: any) => {
    const files = e.target.files
    console.log('files', files)
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
          const newValue = {
            data: [...formattedData],
          }
          updateValue({ ...value, ...newValue })
        },
      })
    }
  }

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
      {!data && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack padding={4} space={4}>
            <Text size={2}> Import a spreadsheet</Text>
            <Text size={1}>Column A (1) should hold the names and Column B (2) should be the values to the names</Text>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </Stack>
        </Card>
      )}

      <Stack padding={3} space={[3, 3, 4, 5]}>
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
