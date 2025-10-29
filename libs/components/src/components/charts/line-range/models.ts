import type { ChartOptions } from 'chart.js';
import type { ChartWithTooltipProp, IChart, ILoading } from '@comp/components/charts/utils/models';

export interface AppLineRangeChartBaseProps extends IChart {
  options?: ChartOptions<'line'>;
}

export interface AppChartLineRangeProps extends AppLineRangeChartBaseProps, ILoading {}

export interface LineRangeChartWithTooltipProps extends ChartWithTooltipProp, AppChartLineRangeProps {}

export enum AppLineRangeChartDatasetType {
  Fact = 'Факт',
  Plan = 'План',
  ThresholdMin = 'Порог минимальный',
  ThresholdMax = 'Порог максимальный',
}
