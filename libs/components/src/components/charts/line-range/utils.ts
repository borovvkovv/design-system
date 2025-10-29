import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import colors from '@comp/assets/styles/colors.module.scss';
import { Chart, type ChartDataset, type LegendItem } from 'chart.js';
import { type IDataset } from '@comp/components/charts/utils/models';
import { AppLineRangeChartDatasetType } from '@comp/components/charts/line-range/models';

export const buildDataset = (dataset: IDataset) => {
  const { label, data, color } = dataset;
  const result: ChartDataset<'line'> = {
    type: 'line',
    label,
    data,
    cubicInterpolationMode: 'monotone',
    borderWidth: 1,
    borderColor: color,
    backgroundColor: color,
    pointRadius: 4,
    pointBorderColor: colors.white,
    pointHoverRadius: 5,
    fill: false,
  } as ChartDataset<'line'>;

  switch (label) {
    case AppLineRangeChartDatasetType.ThresholdMin:
      return {
        ...result,
        pointRadius: 0,
        borderColor: 'transparent',
        backgroundColor: `${color}0D`,
        fill: '+1',
      } as ChartDataset<'line'>;
    case AppLineRangeChartDatasetType.ThresholdMax:
      return {
        ...result,
        pointRadius: 0,
        borderColor: 'transparent',
        backgroundColor: `${color}0D`,
        fill: '-1',
      } as ChartDataset<'line'>;
    default: {
      return result;
    }
  }
};

export const defaultLineChartOptions: ChartOptions<'line'> = {
  events: ['mousemove', 'click'],
  animation: {
    duration: 300,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      border: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
        padding: 8,
        color: colors.grey2,
        font: {
          size: 13,
        },
      },
      title: {
        display: true,
        color: colors.grey2,
        font: {
          size: 13,
        },
      },
      grid: {
        display: false,
        tickLength: 0,
      },
      min: 0,
    },
    x: {
      border: {
        display: false,
      },
      ticks: {
        color: colors.grey2,
        font: {
          size: 13,
        },
      },
      title: {
        display: true,
        padding: {
          top: 20,
        },
        color: colors.grey2,
        font: {
          size: 13,
        },
      },
      grid: {
        display: true,
      },
    },
  },
};

export function generateRangeChartLabels(chart: Chart) {
  let isThresholdMin = false;
  let isThresholdMax = false;
  const labels: LegendItem[] = [];
  chart.data.datasets.forEach((value, index) => {
    if (value.label === AppLineRangeChartDatasetType.ThresholdMin) {
      isThresholdMin = true;
    }
    if (value.label === AppLineRangeChartDatasetType.ThresholdMax) {
      isThresholdMax = true;
    }
    if (isThresholdMin && isThresholdMax) {
      labels.push({
        text: 'Порог',
        fillStyle: 'transparent',
        lineWidth: 6,
        fontColor: colors.grey2.toString(),
        strokeStyle: `${value.backgroundColor?.toString().slice(0, 7)}1A`,
        datasetIndex: index,
      });
      isThresholdMin = false;
      isThresholdMax = false;

      return;
    }
    if (
      value.label !== AppLineRangeChartDatasetType.ThresholdMin &&
      value.label !== AppLineRangeChartDatasetType.ThresholdMax
    ) {
      labels.push({
        text: value.label ?? '',
        fillStyle: value.backgroundColor?.toString(),
        fontColor: colors.grey2.toString(),
        lineWidth: 0,
        datasetIndex: index,
      });
    }
  });

  return labels;
}
