import type {
  ChartType,
  ChartTypeRegistry,
  CoreChartOptions,
  DatasetChartOptions,
  DecimationOptions,
  ElementChartOptions,
  FillerOptions,
  LegendOptions,
  ScaleChartOptions,
  TitleOptions,
  TooltipOptions,
} from 'chart.js';

type _DeepPartialArray<T> = Array<DeepPartial<T>>;
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? _DeepPartialArray<U>
    : T extends object
      ? _DeepPartialObject<T>
      : T | undefined;

export interface ColorsPluginOptions {
  enabled?: boolean;
  forceOverride?: boolean;
}

export interface PluginOptionsByType<TType extends ChartType> {
  colors: ColorsPluginOptions;
  decimation: DecimationOptions;
  filler: FillerOptions;
  legend: LegendOptions<TType>;
  subtitle: TitleOptions;
  title: TitleOptions;
  tooltip: TooltipOptions<TType>;
  yScaleText: {};
}

export interface PluginChartOptions<TType extends ChartType> {
  plugins: PluginOptionsByType<TType>;
}

export type ChartOptions<TType extends ChartType = ChartType> = DeepPartial<
  CoreChartOptions<TType> &
    ElementChartOptions<TType> &
    PluginChartOptions<TType> &
    DatasetChartOptions<TType> &
    ScaleChartOptions<TType> &
    ChartTypeRegistry[TType]['chartOptions']
>;
