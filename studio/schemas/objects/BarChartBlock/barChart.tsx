/* eslint-disable consistent-return */
import { Box, Card, Stack, Text, Inline, TextInput, Radio, Switch, Select } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { set } from 'sanity'
import Papa from 'papaparse'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useState } from 'react'

const themes = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#c2daeb', '#234057', '#49709c', '#a8c3db'],
  red: ['#ff1243'],
}

function SimpleBarChart({
  data = [],
  yUnitLabel,
  xAxisDataKey,
  theme = 'blue',
  showLegend = false,
  yUnitLabelPlacement,
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
}) {
  console.log('SimpleBarChart data', data)
  console.log('SimpleBarChart xAxisDataKey', xAxisDataKey)

  const dataKeys = Object.keys(data[0].data).filter((key: any) => key !== xAxisDataKey)
  const chartData = data?.map((dataItem: any) => dataItem.data)
  console.log('chartData', chartData)
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
    <BarChart
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </label>
  )
}

export const BarChartInputComponent = (props: any) => {
  const { value, onChange, schemaType } = props
  const themeOptions = schemaType.fields.find((field: any) => field.name === 'theme').type.options.list
  const yUnitLabelPlacementOptions = schemaType.fields.find((field: any) => field.name === 'yUnitLabelPlacement').type
    .options.list
  /*   const xAxisTypeOptions = schemaType.fields.find((field: any) => field.name === 'xAxisType').type.options.list */
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
  } = value || {}
  console.log('theme value', theme)

  const [headerNames, setHeadersNames] = useState<any[]>(
    Object.keys(data?.[0].data ?? []).map((item: any) => {
      return {
        title: String(item).replaceAll('_', ' '),
        value: item,
      }
    }),
  )
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
          const headerss = Object.keys(results.data[0]).map((item) => {
            return {
              title: item,
              value: String(item).replaceAll(' ', '_'),
            }
          })
          setHeadersNames(headerss)
          const formattedData = Object.values(results.data).map((row: any) => {
            console.log('row', row)
            const chartData = Object.fromEntries(
              Object.entries(row).map(([k, v]) => {
                const key = String(k).replaceAll(' ', '_')
                return [key, v]
              }),
            )
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
  }

  return (
    <div>
      {!data && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack padding={4} space={4}>
            <Text size={2}> Import a spreadsheet</Text>
            <Text size={1}>
              First row should contain headers, where first column is for x axis and the following values along y{' '}
            </Text>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </Stack>
        </Card>
      )}
      {data && (
        <Stack padding={3} space={[3]}>
          <LabelWrapper>
            Chart title
            <TextInput onChange={(e) => handleChange('chartTitle', e)} value={chartTitle} />
          </LabelWrapper>
          <LabelWrapper>
            Chart source
            <TextInput onChange={(e) => handleChange('chartSource', e)} value={chartSource} />
          </LabelWrapper>
          <LabelWrapper>
            Y unit label. Used for y axis label and tooltip unit for values
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
              {headerNames.map((headerName) => {
                return (
                  <option key={headerName.value} value={headerName.value}>
                    {headerName.title}
                  </option>
                )
              })}
            </Select>
          </LabelWrapper>
          {/*<LabelWrapper>
            X axis type
            <Inline space={3}>
              {xAxisTypeOptions.map((t: { title: string; value: string }) => {
                return (
                  <div key={`container_${t.value}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio
                      checked={theme === t.value}
                      name={t.value}
                      onChange={(e) => handleChange('xAxisType', e)}
                      value={t.value}
                      id={`id_${t.value}`}
                    />
                    <label htmlFor={`id_${t.value}`}> {t.title}</label>
                  </div>
                )
              })}
            </Inline>
          </LabelWrapper>*/}
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
            <Text>Bar chart preview</Text>
            <SimpleBarChart {...chartProps} />
          </Card>
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
      name: 'xAxisDataKey',
      type: 'string',
      title: 'Name of key for x axis',
    },
    {
      name: 'yUnitLabel',
      type: 'string',
      title: 'Y axis unit label',
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
    /*     {
      name: 'xAxisType',
      title: 'The type of x axis.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Number', value: 'number' },
          { title: 'Category', value: 'category' },
        ],
      },
    }, */
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
    input: BarChartInputComponent,
    preview: BarChartPreview,
  },
  preview: {
    select: {},
  },
}
