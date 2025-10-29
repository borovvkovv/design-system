import type { ChartOptions } from 'chart.js';
import type { ChartWithTooltipProp, IChart, ILoading } from '@comp/components/charts/utils/models';

export interface AppBarChartBaseProps extends IChart {
  options?: ChartOptions<'bar'>;
}

export interface AppBarChartProps extends AppBarChartBaseProps, ILoading {}

export interface BarChartWithTooltipProps extends ChartWithTooltipProp, AppBarChartProps {}

export enum BarChartDatasetType {
  Fact = 'Факт',
  Plan = 'План',
}
