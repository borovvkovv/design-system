import type { Color } from 'chart.js';
import type { TTabBase } from '@comp/components/tab-data/utils/models';

export interface IDataset {
  label: string;
  data: number[];
  color?: Color;
}

export type AppChartAxis = {
  x: {
    title: string;
    labels: string[];
  };
  y: {
    title: string;
  };
};

export interface AppChartProps {
  axis: AppChartAxis;
  datasets: IDataset[];
}

export interface ILoading {
  isLoading: boolean;
  textWhenEmptyList?: string[];
}

export interface IChart {
  chartData: AppChartProps | null;
}

export type TTabChart = TTabBase<AppChartProps | null>;

export interface ChartWithTooltipProp {
  tooltipTitle: string;
  tooltipXLabelFormat?: (xAxisPointLabel: string, xAxisNextPointLabel: string) => string;
  tooltipYLabelFormat?: (yAxisPointLabel: string) => string;
}
