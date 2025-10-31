/* eslint-disable consistent-return */
import { Box, Card, Stack, Text, Inline, TextInput, Radio, Switch, Select } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { set } from 'sanity'
import Papa from 'papaparse'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, TooltipContentProps, XAxis, YAxis } from 'recharts'

const themes = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#c2daeb', '#234057', '#49709c', '#a8c3db'],
  red: ['#ff1243'],
}

type CustomTooltipProps = {
  headerNames?: any
} & TooltipContentProps<string | number, string>
const CustomTooltip = ({ active, payload, label, headerNames }: CustomTooltipProps) => {
  const isVisible = active && payload && payload.length
  console.log('CustomTooltip headernames', headerNames)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: 8,
        gap: 4,
        border: '1px solid #ebebeb',
        backgroundColor: '#fff',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {isVisible && (
        <>
          <span>{label}:</span>
          {payload?.map((set: any) => {
            const headerName = headerNames?.find((item: any) => item.value === set.name).title
            return (
              <span
                key={set.dataKey}
                style={{
                  display: 'flex',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: set.color,
                    aspectRatio: 1,
                    width: 4,
                    height: 4,
                    borderRadius: 'calc(infinity * 1px) !important',
                  }}
                />
                <span style={{ color: '#3d3d3d' }}>{`${headerName}: ${set.value}`}</span>
              </span>
            )
          })}
        </>
      )}
    </div>
  )
}

function SimpleLineChart({
  data = [],
  yUnitLabel,
  xAxisDataKey,
  theme = 'blue',
  showLegend = false,
  yUnitLabelPlacement,
  headerNames,
  unitLabel,
}: {
  data?: any
  yUnitLabel?: string
  chartTitle?: string
  chartSource?: string
  showLegend?: boolean
  xAxisDataKey?: string
  yUnitLabelPlacement?: string
  stackId?: string
  xAxisType?: 'number' | 'category'
  theme?: 'green' | 'blue' | 'red'
  headerNames?: any
  unitLabel?: string
}) {
  const dataKeys = Object.keys(data[0].data).filter((key: any) => key !== xAxisDataKey)
  let hasNegatives = false
  const chartData = data?.map((dataItem: any) => {
    if (Object.values(dataItem.data).some((value) => Math.sign(Number(value)) <= -1)) {
      hasNegatives = true
    }
    return dataItem.data
  })

  console.log('chartData', chartData)
  const COLORS = themes[theme]

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry
    const headerName = headerNames?.find((item: any) => item.value === value).title
    return <span style={{ color: '#3d3d3d' }}>{headerName}</span>
  }
  const renderTooltip = (value: any, name: any, props: any) => {
    const headerName = headerNames?.find((item: any) => item.value === name).title
    return [`${value}${unitLabel ? unitLabel : ''}`, headerName]
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
    <LineChart
      responsive
      style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      data={chartData}
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
      <Tooltip content={<CustomTooltip headerNames={headerNames} />} />
      {showLegend && <Legend formatter={renderLegendText} />}
      {dataKeys.map((lineKey: any, index: number) => (
        <Line key={lineKey} dataKey={lineKey} stroke={COLORS[index % COLORS.length]} />
      ))}
    </LineChart>
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </label>
  )
}

export const LineChartInputComponent = (props: any) => {
  const { value, onChange, schemaType } = props
  const themeOptions = schemaType.fields.find((field: any) => field.name === 'theme').type.options.list
  const yUnitLabelPlacementOptions = schemaType.fields.find((field: any) => field.name === 'yUnitLabelPlacement').type
    .options.list
  console.log('value', value)
  const {
    data,
    yUnitLabel,
    yUnitLabelPlacement,
    chartTitle,
    chartSource,
    showLegend = false,
    xAxisDataKey,
    theme,
    headerNames,
    unitLabel,
  } = value || {}

  const replaceSpecialChars = (s: string) => {
    const replacedString = s.replace(/[^a-zA-Z0-9_-]/g, '_')
    return replacedString
  }

  const updateValue = (v?: any) => {
    return onChange(set(v))
  }

  const handleFileUpload = (e: any) => {
    const files = e.target.files
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results: any) {
          console.log('Finished, set spreadsheet data', results.data)
          const headerNames = Object.keys(results.data[0]).map((item) => {
            return {
              title: item,
              value: replaceSpecialChars(item),
            }
          })
          const formattedData = Object.values(results.data).map((row: any) => {
            const chartData = Object.fromEntries(
              Object.entries(row).map(([k, v]) => {
                const key = replaceSpecialChars(k)
                return [key, v]
              }),
            )
            return {
              _type: 'dataItem',
              _key: uuid(),
              data: chartData,
            }
          })
          const newValue = {
            data: [...formattedData],
            headerNames,
          }
          updateValue({ ...value, ...newValue })
        },
      })
    }
  }

  const handleChange = (key: string, event: any) => {
    let keyValue = event.currentTarget.value
    if (['showLegend', 'xAxisType'].includes(key)) {
      keyValue = event.currentTarget.checked
    }
    const newValue = {
      [key]: keyValue,
    }
    updateValue({ ...value, ...newValue })
  }
  const handleAxisDataKey = (axis: string, event: any) => {
    const axisDataKey = event.currentTarget.value
    if (event.currentTarget.value !== '---') {
      const newValue =
        axis === 'x'
          ? {
              xAxisDataKey: axisDataKey,
            }
          : { yAxisDataKey: axisDataKey }
      updateValue({ ...value, ...newValue })
    }
  }

  const chartProps = {
    yUnitLabel,
    chartSource,
    chartTitle,
    xAxisDataKey,
    theme,
    showLegend,
    yUnitLabelPlacement,
    data: data ?? [],
    headerNames,
    unitLabel,
  }

  return (
    <div>
      {!data && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack padding={4} space={4}>
            <Text size={2}> Import a spreadsheet</Text>
            <Text size={1}>First row should contain headers</Text>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </Stack>
        </Card>
      )}
      {data && (
        <Stack padding={3} space={3}>
          <LabelWrapper>
            Chart title
            <TextInput onChange={(e) => handleChange('chartTitle', e)} value={chartTitle} />
          </LabelWrapper>
          <LabelWrapper>
            Chart source
            <TextInput onChange={(e) => handleChange('chartSource', e)} value={chartSource} />
          </LabelWrapper>
          <LabelWrapper>
            Y axis label
            <TextInput onChange={(e) => handleChange('yUnitLabel', e)} value={yUnitLabel} />
          </LabelWrapper>
          <LabelWrapper>
            Y axis label placement
            <Select value={yUnitLabelPlacement} onChange={(e) => handleChange('yUnitLabelPlacement', e)}>
              <option value={'false'}>Dont show</option>
              {yUnitLabelPlacementOptions.map((position: any) => {
                return (
                  <option key={position.value} value={position.value}>
                    {position.title}
                  </option>
                )
              })}
            </Select>
          </LabelWrapper>
          <LabelWrapper>
            X axis data key
            <Select value={xAxisDataKey} onChange={(e) => handleAxisDataKey('x', e)}>
              <option value="---">Select an option </option>
              {headerNames.map((headerName: { title: string; value: string }) => {
                return (
                  <option key={headerName.value} value={headerName.value}>
                    {headerName.title}
                  </option>
                )
              })}
            </Select>
          </LabelWrapper>
          <LabelWrapper>
            Unit label used in tooltip for values unit
            <TextInput onChange={(e) => handleChange('unitLabel', e)} value={unitLabel} />
          </LabelWrapper>
          <LabelWrapper>
            Show legend
            <Switch onChange={(e) => handleChange('showLegend', e)} checked={showLegend} />
          </LabelWrapper>
          <LabelWrapper>
            Chart theme
            <Inline space={3}>
              {themeOptions.map((t: { title: string; value: string }) => {
                return (
                  <div key={`container_${t.value}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Radio
                      checked={theme === t.value}
                      name={t.value}
                      onChange={(e) => handleChange('theme', e)}
                      value={t.value}
                      id={`id_${t.value}`}
                    />
                    <label htmlFor={`id_${t.value}`}> {t.title}</label>
                  </div>
                )
              })}
            </Inline>
          </LabelWrapper>
          <Card padding={3} radius={2} shadow={1}>
            <Text>Line chart preview</Text>
            <SimpleLineChart {...chartProps} />
          </Card>
        </Stack>
      )}
    </div>
  )
}

const LineChartPreview = (props?: any) => {
  const { schemaType, chartTitle } = props

  return (
    <Box padding={3}>
      <Stack space={2}>
        <Text size={1} weight="medium">
          {chartTitle ?? schemaType?.title ?? 'Untitled'}
        </Text>
        <Text size={1} muted>
          {'Line chart component'}
        </Text>
      </Stack>
    </Box>
  )
}

export default {
  title: 'Line chart',
  name: 'lineChart',
  type: 'object',
  fields: [
    {
      name: 'xAxisDataKey',
      type: 'string',
      title: 'Name of key for x axis',
    },
    {
      name: 'yUnitLabel',
      type: 'string',
      title: 'Y axis label',
    },
    {
      name: 'unitLabel',
      type: 'string',
      title: 'Unit label',
    },
    {
      name: 'yUnitLabelPlacement',
      title: 'Placement of the y axis label',
      type: 'string',
      options: {
        list: [
          { title: 'InsideTopLeft', value: 'insideTopLeft' },
          { title: 'InsideBottomLeft', value: 'insideBottomLeft' },
          { title: 'left', value: 'left' },
          { title: 'InsideLeft', value: 'insideLeft' },
          { title: 'Dont show', value: 'false' },
        ],
      },
      initialValue: 'insideLeft',
    },
    {
      name: 'chartTitle',
      type: 'string',
      title: 'Chart title',
    },
    {
      name: 'chartSource',
      type: 'string',
      title: 'Chart source',
    },
    {
      name: 'showLegend',
      type: 'boolean',
      title: 'Show legend',
    },
    {
      title: 'Header names',
      name: 'headerNames',
      type: 'array',
      of: [
        {
          name: 'headerName',
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title',
            },
            {
              type: 'string',
              name: 'value',
              title: 'Json Value',
            },
          ],
        },
      ],
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Red and white', value: 'red' },
        ],
      },
      initialValue: 'blue',
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
    input: LineChartInputComponent,
    preview: LineChartPreview,
  },
  preview: {
    select: {
      chartTitle: 'chartTitle',
    },
  },
}
