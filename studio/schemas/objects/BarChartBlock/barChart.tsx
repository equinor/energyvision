/* eslint-disable consistent-return */
import {
  Box,
  Card,
  Inline,
  Radio,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import Papa from 'papaparse';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import { set } from 'sanity';

const themes = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#c2daeb', '#234057', '#49709c', '#a8c3db'],
  red: ['#ff1243'],
};

const formatValue = (
  value: unknown,
  formatValuesAsMillions = false,
  includeMillionSuffix = true,
) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return String(value);

  if (!formatValuesAsMillions) {
    return new Intl.NumberFormat('en').format(numberValue);
  }

  const millions = numberValue / 1_000_000;
  const formattedMillions = Number.isInteger(millions)
    ? String(millions)
    : millions.toFixed(1);
  return includeMillionSuffix ? `${formattedMillions}M` : formattedMillions;
};

const getTooltipUnitLabel = (
  unitLabel: string | undefined,
  formatValuesAsMillions: boolean | undefined,
) => {
  if (
    formatValuesAsMillions &&
    /^(m|million|millions)$/i.test(unitLabel?.trim() ?? '')
  ) {
    return '';
  }

  return unitLabel ? ` ${unitLabel}` : '';
};

type CustomTooltipProps = {
  headerNames?: any;
  formatValuesAsMillions?: boolean;
  unitLabel?: string;
} & Partial<TooltipContentProps<string | number, string>>;
const CustomTooltip = ({
  active,
  payload,
  label,
  headerNames,
  formatValuesAsMillions,
  unitLabel,
}: CustomTooltipProps) => {
  const isVisible = active && payload?.length;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: 8,
        border: '1px solid #ebebeb',
        backgroundColor: '#fff',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {isVisible && (
        <>
          <span>{label}:</span>
          {payload?.map((set: any) => {
            const headerName = headerNames?.find(
              (item: any) => item.value === set.name,
            ).title;
            return (
              <span key={set.dataKey} className="flex items-center gap-2">
                <span
                  className="aspect-square size-2"
                  style={{ backgroundColor: set.color }}
                />
                <span className="text-slate-80">{`${headerName}: ${formatValue(set.value, formatValuesAsMillions)}${getTooltipUnitLabel(unitLabel, formatValuesAsMillions)}`}</span>
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};

function SimpleBarChart({
  data = [],
  yUnitLabel,
  xAxisDataKey,
  xAxisLabelsVertical = false,
  showAllXAxisLabels = false,
  formatValuesAsMillions = false,
  theme = 'blue',
  showLegend = false,
  yUnitLabelPlacement,
  headerNames,
  unitLabel,
}: {
  data?: any;
  yUnitLabel?: string;
  chartTitle?: string;
  chartSource?: string;
  showLegend?: boolean;
  xAxisDataKey?: string;
  xAxisLabelsVertical?: boolean;
  showAllXAxisLabels?: boolean;
  formatValuesAsMillions?: boolean;
  yUnitLabelPlacement?: string;
  stackId?: string;
  xAxisType?: 'number' | 'category';
  theme?: 'green' | 'blue' | 'red';
  headerNames?: any;
  unitLabel?: string;
}) {
  console.log('data[0]?.data', data[0]?.data);
  const dataKeys = Object.keys(data[0]?.data ?? {}).filter(
    (key: any) =>
      key !== xAxisDataKey &&
      data.some((dataItem: any) => {
        const value = dataItem.data?.[key];
        return value !== null && value !== undefined && value !== '';
      }),
  );
  const chartData = data?.map((dataItem: any) => dataItem.data);

  const COLORS = themes[theme];

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry;
    const headerName = headerNames?.find(
      (item: any) => item.value === value,
    ).title;
    return <span style={{ color: '#3d3d3d' }}>{headerName}</span>;
  };
  const renderTooltip = (value: any, name: any, props: any) => {
    const headerName = headerNames?.find(
      (item: any) => item.value === name,
    ).title;
    return [`${value}${unitLabel ? unitLabel : ''}`, headerName];
  };

  const yAxisPadding = {
    top: 20,
  };

  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
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
      <XAxis
        dataKey={xAxisDataKey}
        interval={showAllXAxisLabels ? 0 : undefined}
        padding={{ left: 20, right: 20 }}
        {...(xAxisLabelsVertical && {
          angle: -90,
          textAnchor: 'end',
          height: 100,
        })}
      />
      <YAxis
        width="auto"
        padding={yAxisPadding}
        tickFormatter={(value) =>
          formatValue(value, formatValuesAsMillions, false)
        }
        {...(yUnitLabelPlacement !== 'false' && {
          label: {
            value: yUnitLabel,
            angle: -90,
            position: yUnitLabelPlacement,
          },
        })}
      />
      <Tooltip
        content={
          <CustomTooltip
            headerNames={headerNames}
            formatValuesAsMillions={formatValuesAsMillions}
            unitLabel={unitLabel}
          />
        }
      />
      {showLegend && <Legend formatter={renderLegendText} />}
      {dataKeys.map((key: any, index: number) => (
        <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
      ))}
    </BarChart>
  );
}

const LabelWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
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
    </div>
  );
};

export const BarChartInputComponent = (props: any) => {
  const { value, onChange, schemaType } = props;
  const themeOptions = schemaType.fields.find(
    (field: any) => field.name === 'theme',
  ).type.options.list;
  const yUnitLabelPlacementOptions = schemaType.fields.find(
    (field: any) => field.name === 'yUnitLabelPlacement',
  ).type.options.list;
  /*   const xAxisTypeOptions = schemaType.fields.find((field: any) => field.name === 'xAxisType').type.options.list */
  console.log('value', value);
  const {
    data,
    yUnitLabel,
    yUnitLabelPlacement,
    chartTitle,
    chartSource,
    showLegend = false,
    xAxisDataKey,
    xAxisLabelsVertical = false,
    showAllXAxisLabels = false,
    formatValuesAsMillions = false,
    theme,
    headerNames,
    unitLabel,
  } = value || {};

  const replaceSpecialChars = (s: string) => {
    const replacedString = s.replace(/[^a-zA-Z0-9_-]/g, '_');
    return replacedString;
  };

  const parseCellValue = (value: unknown) => {
    if (typeof value !== 'string') return value;

    const normalizedValue = value.replace(/,/g, '').trim();
    return /^-?\d+(\.\d+)?$/.test(normalizedValue)
      ? Number(normalizedValue)
      : value;
  };

  const updateValue = (v?: any) => {
    return onChange(set(v));
  };

  const handleFileUpload = (e: any) => {
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: function (results: any) {
          const nonEmptyColumns = Object.keys(results.data[0] ?? {}).filter(
            (columnName) =>
              results.data.some((row: Record<string, unknown>) => {
                const value = row[columnName];
                return value !== null && value !== undefined && value !== '';
              }),
          );
          const headerNames = nonEmptyColumns.map((item) => {
            return {
              title: item,
              value: replaceSpecialChars(item),
            };
          });

          const formattedData = Object.values(results.data).map((row: any) => {
            const chartData = Object.fromEntries(
              nonEmptyColumns.map((columnName) => {
                const value = row[columnName];
                const k = columnName;
                const key = replaceSpecialChars(k);
                return [key, parseCellValue(value)];
              }),
            );
            return {
              _type: 'dataItem',
              _key: uuid(),
              data: chartData,
            };
          });
          const newValue = {
            data: [...formattedData],
            headerNames,
          };
          updateValue({ ...value, ...newValue });
        },
      });
    }
  };
  const handleChange = (key: string, event: any) => {
    let keyValue = event.currentTarget.value;
    if (
      [
        'showLegend',
        'xAxisType',
        'xAxisLabelsVertical',
        'showAllXAxisLabels',
        'formatValuesAsMillions',
      ].includes(key)
    ) {
      keyValue = event.currentTarget.checked;
    }
    const newValue = {
      [key]: keyValue,
    };
    updateValue({ ...value, ...newValue });
  };
  const handleAxisDataKey = (axis: string, event: any) => {
    const axisDataKey = event.currentTarget.value;
    if (event.currentTarget.value !== '---') {
      const newValue =
        axis === 'x'
          ? {
              xAxisDataKey: axisDataKey,
            }
          : { yAxisDataKey: axisDataKey };
      updateValue({ ...value, ...newValue });
    }
  };

  const chartProps = {
    yUnitLabel,
    chartSource,
    chartTitle,
    xAxisDataKey,
    xAxisLabelsVertical,
    showAllXAxisLabels,
    formatValuesAsMillions,
    theme,
    showLegend,
    yUnitLabelPlacement,
    data: data ?? [],
    headerNames,
    unitLabel,
  };

  return (
    <div>
      {!data && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack padding={4} gap={4}>
            <Text size={2}> Import a spreadsheet</Text>
            <Text size={1}>First row should contain headers</Text>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
            />
          </Stack>
        </Card>
      )}
      {data && (
        <Stack padding={3} gap={3}>
          <LabelWrapper>
            Chart title
            <TextInput
              onChange={(e) => handleChange('chartTitle', e)}
              value={chartTitle}
            />
          </LabelWrapper>
          <LabelWrapper>
            Chart source
            <TextInput
              onChange={(e) => handleChange('chartSource', e)}
              value={chartSource}
            />
          </LabelWrapper>
          <LabelWrapper>
            Y axis label
            <TextInput
              onChange={(e) => handleChange('yUnitLabel', e)}
              value={yUnitLabel}
            />
          </LabelWrapper>
          <LabelWrapper>
            Y axis label placement
            <Select
              value={yUnitLabelPlacement}
              onChange={(e) => handleChange('yUnitLabelPlacement', e)}
            >
              <option value={'false'}>Dont show</option>
              {yUnitLabelPlacementOptions.map((position: any) => {
                return (
                  <option key={position.value} value={position.value}>
                    {position.title}
                  </option>
                );
              })}
            </Select>
          </LabelWrapper>
          <LabelWrapper>
            X axis data key
            <Select
              value={xAxisDataKey}
              onChange={(e) => handleAxisDataKey('x', e)}
            >
              <option value="---">Select an option </option>
              {headerNames?.map(
                (headerName: { title: string; value: string }) => {
                  return (
                    <option key={headerName.value} value={headerName.value}>
                      {headerName.title}
                    </option>
                  );
                },
              )}
            </Select>
          </LabelWrapper>
          <LabelWrapper>
            Show X axis labels vertically
            <Switch
              onChange={(e) => handleChange('xAxisLabelsVertical', e)}
              checked={xAxisLabelsVertical}
            />
          </LabelWrapper>
          <LabelWrapper>
            Show all X axis labels
            <Switch
              onChange={(e) => handleChange('showAllXAxisLabels', e)}
              checked={showAllXAxisLabels}
            />
          </LabelWrapper>
          <LabelWrapper>
            Unit label used in tooltip for values unit
            <TextInput
              onChange={(e) => handleChange('unitLabel', e)}
              value={unitLabel}
            />
          </LabelWrapper>
          <LabelWrapper>
            Format values as millions
            <Switch
              onChange={(e) => handleChange('formatValuesAsMillions', e)}
              checked={formatValuesAsMillions}
            />
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
            <Switch
              onChange={(e) => handleChange('showLegend', e)}
              checked={showLegend}
            />
          </LabelWrapper>
          <LabelWrapper>
            Chart theme
            <Inline gap={3}>
              {themeOptions.map((t: { title: string; value: string }) => {
                return (
                  <div
                    key={`container_${t.value}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Radio
                      checked={theme === t.value}
                      name={t.value}
                      onChange={(e) => handleChange('theme', e)}
                      value={t.value}
                      id={`id_${t.value}`}
                    />
                    <label htmlFor={`id_${t.value}`}> {t.title}</label>
                  </div>
                );
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
  );
};

const BarChartPreview = (props?: any) => {
  const { schemaType, chartTitle } = props;
  console.log('BarChartPreview props', props);

  return (
    <Box padding={3}>
      <Stack gap={2}>
        <Text size={1} weight="medium">
          {chartTitle ?? schemaType?.title ?? 'Untitled'}
        </Text>
        <Text size={1} muted>
          {'Bar chart component'}
        </Text>
      </Stack>
    </Box>
  );
};

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
      name: 'xAxisLabelsVertical',
      type: 'boolean',
      title: 'Show X axis labels vertically',
      initialValue: false,
    },
    {
      name: 'showAllXAxisLabels',
      type: 'boolean',
      title: 'Show all X axis labels',
      initialValue: false,
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
      name: 'formatValuesAsMillions',
      type: 'boolean',
      title: 'Format values as millions',
      initialValue: false,
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
    select: {
      chartTitle: 'chartTitle',
    },
  },
};
