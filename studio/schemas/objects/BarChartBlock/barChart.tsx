/* eslint-disable consistent-return */
import { Box, Card, Stack, Text, Inline, TextInput } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { set } from 'sanity'
import Papa from 'papaparse'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function SimpleBarChart({
  data = [],
  yUnitLabel,
  isAnimationActive = true,
}: {
  data?: any
  yUnitLabel?: string
  isAnimationActive?: boolean
}) {
  console.log('SimpleBarChart data', data)

  const dataKeys = Object.keys(data[0])?.filter((key: any) => String(key).toLowerCase() !== 'name')
  console.log('dataKeys', dataKeys)
  const COLORS = ['#007079', '#FBDD79', '#86A7AC', '#DF6D62', '#49709C', '#7D0023', '#243746']

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      {dataKeys.map((key: any, index: number) => (
        <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} />
      ))}
      {/*       <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
  )
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

export const BarChartInputComponent = (props: any) => {
  const { value, onChange } = props
  const { data, yUnitLabel } = value || {}

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
        transform: function (value: any, headerName: any) {
          console.log('transform value', value)
          console.log('transform headerName', headerName)
          return value
        },
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
  const handleYUnitLabel = (event: any) => {
    const unitLabel = event.currentTarget.value
    const newValue = {
      yUnitLabel: unitLabel,
    }
    updateValue({ ...value, ...newValue })
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
          <LabelWrapper>
            Y axis unit label
            <TextInput onChange={handleYUnitLabel} value={yUnitLabel} />
          </LabelWrapper>
          <Text>Bar chart preview</Text>
          <SimpleBarChart data={data ?? []} yUnitLabel={yUnitLabel} />
        </Stack>
      )}
    </div>
  )
}

const BarChartPreview = (props?: any) => {
  const { schemaType } = props

  return (
    <>
      <Box padding={3}>
        <Inline space={3}>
          <Card>
            <Text>{schemaType?.title ?? 'Bar chart component'}</Text>
          </Card>
        </Inline>
      </Box>
    </>
  )
}

export default {
  title: 'Bar chart',
  name: 'barChart',
  type: 'object',
  fields: [
    {
      name: 'yUnitLabel',
      type: 'string',
      title: 'Y axis unit label',
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
    input: BarChartInputComponent,
    preview: BarChartPreview,
  },
  preview: {
    select: {},
  },
}
