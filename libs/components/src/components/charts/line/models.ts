import type { ChartWithTooltipProp, IChart, ILoading } from '@comp/components/charts/utils/models';
import type { ChartOptions } from 'chart.js';

export interface AppLineChartColor {
  color?: 'blue' | 'green';
}

export interface AppLineChartBaseProps extends IChart, AppLineChartColor {
  options?: ChartOptions<'line'>;
}

export interface AppLineChartProps extends AppLineChartBaseProps, ILoading {}

export interface LineChartWithTooltipProps extends ChartWithTooltipProp, AppLineChartProps {}
