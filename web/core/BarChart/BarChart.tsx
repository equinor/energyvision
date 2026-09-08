import { forwardRef } from 'react';
import {
  BarChart as _BarChart,
  Bar,
  type BarProps,
  CartesianGrid,
  Legend,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
  type YAxisProps,
} from 'recharts';
import { Typography } from '../Typography';

type themeVariant = 'green' | 'blue' | 'red';
type YAxisLabelPosition = Extract<
  NonNullable<YAxisProps['label']>,
  { position?: unknown }
>['position'];
export type BarChartProps = {
  data: any;
  yUnitLabel?: string;
  yUnitLabelPlacement?: YAxisLabelPosition | 'false';
  chartTitle?: string;
  chartSource?: string;
  showLegend?: boolean;
  xAxisDataKey?: string;
  xAxisLabelsVertical?: boolean;
  showAllXAxisLabels?: boolean;
  formatValuesAsMillions?: boolean;
  unitLabel?: string;
  useLayoutMd?: boolean;
  theme?: themeVariant;
} & BarProps;

const themes: Record<themeVariant, string[]> = {
  green: ['#0e7c78', '#63a893', '#aad5bb', '#d6f0de'],
  blue: ['#234057', '#49709c', '#a8c3db', '#c2daeb'],
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

const CustomTooltip = ({
  active,
  payload,
  label,
  formatValuesAsMillions,
  unitLabel,
}: Partial<TooltipContentProps> & {
  formatValuesAsMillions?: boolean;
  unitLabel?: string;
}) => {
  const isVisible = active && payload?.length;
  return (
    <div
      className={`flex flex-col items-start gap-1 border border-grey-20 bg-white-100 p-2 ${isVisible ? 'visible' : 'hidden'}`}
    >
      {isVisible && (
        <>
          <span>{label}:</span>
          {payload?.map((set: any) => {
            return (
              <span key={set.dataKey} className="flex items-center gap-2">
                <span
                  className="aspect-square size-2"
                  style={{ backgroundColor: set.color }}
                />
                <span className="text-slate-80">{`${String(set.name).replaceAll('_', ' ')}: ${formatValue(set.value, formatValuesAsMillions)}${getTooltipUnitLabel(unitLabel, formatValuesAsMillions)}`}</span>
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart(
    {
      chartTitle,
      chartSource,
      data = [],
      yUnitLabel,
      xAxisDataKey,
      xAxisLabelsVertical = false,
      showAllXAxisLabels = false,
      formatValuesAsMillions = false,
      unitLabel,
      useLayoutMd = false,
      yUnitLabelPlacement = 'insideLeft',
      showLegend,
      theme = 'blue',
    },
    ref,
  ) {
    const dataKeys = Object.keys(data[0].data).filter(
      (key: any) => key !== xAxisDataKey,
    );
    const chartData = data?.map((dataItem: any) => dataItem.data);
    const COLORS = themes[theme];

    const renderLegendText = (value: string, entry: any) => {
      return (
        <span className="text-slate-80">
          {String(value).replaceAll('_', ' ')}
        </span>
      );
    };
    /*   const renderTooltip = (value: any, name: any, props: any) => {
    return [`${value}${yUnitLabel}`, String(name).replaceAll('_', ' ')]
  } */

    return (
      <div ref={ref} className="relative h-full w-full">
        <Typography variant="div" group="plain" className="mb-2 text-base">
          {chartTitle}
        </Typography>
        <Typography variant="div" group="plain" className="mb-4 text-sm">
          {chartSource}
        </Typography>
        <_BarChart
          style={{
            width: '100%',
            ...(useLayoutMd ? {} : { maxWidth: '700px' }),
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
            allowDecimals={true}
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
            padding={{ top: 20 }}
            tickFormatter={(value) =>
              formatValue(value, formatValuesAsMillions, false)
            }
            {...(yUnitLabel &&
              yUnitLabelPlacement !== 'false' && {
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
                formatValuesAsMillions={formatValuesAsMillions}
                unitLabel={unitLabel}
              />
            }
          />
          {showLegend && <Legend formatter={renderLegendText} />}
          {dataKeys.map((key: any, index: number) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </_BarChart>
      </div>
    );
  },
);
