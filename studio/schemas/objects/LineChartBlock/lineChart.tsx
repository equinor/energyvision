/* eslint-disable consistent-return */
import { Box, Card, Stack, Text, Inline, TextInput } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { set } from 'sanity'
import Papa from 'papaparse'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

function SimpleLineChart({
  data = [],
  isAnimationActive = true,
}: {
  data?: any
  labelPrefix?: string
  labelPostfix?: string
  isAnimationActive?: boolean
}) {
  console.log('SimplePieChart data', data)

  const lineKeys = Object.keys(data[0])?.filter((key: any) => String(key).toLowerCase() !== 'name')
  console.log('lineKeys', lineKeys)
  const COLORS = ['#007079', '#FBDD79', '#86A7AC', '#DF6D62', '#49709C', '#7D0023', '#243746']

  return (
    <LineChart
      responsive
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      {lineKeys.map((lineKey: any, index: number) => (
        <Line key={lineKey} type="monotone" dataKey={lineKey} stroke={COLORS[index % COLORS.length]} />
      ))}
    </LineChart>
  )
}

export const LineChartInputComponent = (props: any) => {
  const { value, onChange } = props
  const { data } = value || {}

  const updateValue = (v?: any) => {
    return onChange(set(v))
  }

  const handleFileUpload = (e: any) => {
    const files = e.target.files
    console.log('files', files)
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log('Finished, set spreadsheet data', results.data)
          const formattedData = Object.values(results.data).map((row: any) => {
            console.log('row', row)
            const chartData = Object.fromEntries(
              Object.entries(row).map(([k, v]) => {
                console.log('v', v)
                console.log()
                return [k, Number.isInteger(v) ? Number(v) : v]
              }),
            )
            console.log('chartData', chartData)
            return {
              _type: 'dataItem',
              _key: uuid(),
              data: chartData,
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
      {data && (
        <Stack padding={3} space={[3, 3, 4, 5]}>
          <Text>Pie chart preview</Text>
          <SimpleLineChart data={data ?? []} />
        </Stack>
      )}
    </div>
  )
}

const LineChartPreview = (props?: any) => {
  const { schemaType } = props

  return (
    <>
      <Box padding={3}>
        <Inline space={3}>
          <Card>
            <Text>{schemaType?.title ?? 'Line chart component'}</Text>
          </Card>
        </Inline>
      </Box>
    </>
  )
}

export default {
  title: 'Line chart',
  name: 'lineChart',
  type: 'object',
  fields: [
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
    input: LineChartInputComponent,
    preview: LineChartPreview,
  },
  preview: {
    select: {},
  },
}
