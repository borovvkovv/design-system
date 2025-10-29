import { type AppChartProps, type AppChartAxis } from '@comp/components/charts/utils/models';
import { format } from '@comp/utils/date';

export function isNoDataForGraph(chartData: AppChartProps | null) {
  return chartData?.datasets?.every((dataset) => dataset.data.length === 0) ?? true;
}

export const addMeasurementUnitToValue = (value: string, measurementUnit: string) => `${value} ${measurementUnit}`;

export const putMonthAndYearToDay = (day: string, dateWithMonthAndYear: Date) =>
  `${day}.${format(dateWithMonthAndYear, 'MM.yyyy')}`;

export const getTimeRangesFromValues = (timeStart: string, timeEnd: string) =>
  `${timeStart}${timeEnd ? `-${timeEnd}` : ''}`;

const getXAxisModel = (axis: AppChartAxis | undefined) => ({
  type: 'category' as const,
  title: {
    text: axis?.x.title,
  },
  labels: axis?.x.labels,
});

const getYAxisModel = (axis: AppChartAxis | undefined) => ({
  title: {
    text: axis?.y.title,
  },
});

export const getScales = (axis: AppChartAxis | undefined, indexAxis: 'x' | 'y' = 'x') =>
  indexAxis === 'x'
    ? {
        x: getXAxisModel(axis),
        y: getYAxisModel(axis),
      }
    : {
        x: getYAxisModel(axis),
        y: getXAxisModel(axis),
      };
