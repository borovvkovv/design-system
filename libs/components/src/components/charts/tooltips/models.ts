import type { IBaseModalSliderProps } from '@comp/components/modals/utils/models';

export interface IChartTooltipBase {
  xAxisLabel: string;
  values: Array<Point>;
}

export interface IChartTooltipProps extends IChartTooltipBase {
  container?: HTMLElement;
}

export interface IChartTooltipModalBodyProps extends IChartTooltipBase {
  tooltipTitle: string;
}

export interface IChartTooltipModalProps extends IBaseModalSliderProps, IChartTooltipModalBodyProps {}

export type Point = {
  color: string;
  text: string;
};
