<template>
  <Line
    ref="refChart"
    :data="data"
    :options="options"
  />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  type LegendElement,
  type ChartEvent,
  type LegendItem,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import { yScaleText } from '@comp/assets/styles/chartjs-extension/plugins';
import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import { computed, ref } from 'vue';
import {
  buildDataset,
  defaultLineChartOptions,
  generateRangeChartLabels,
} from '@comp/components/charts/line-range/utils';
import { mergeDeep } from '@comp/utils/object';
import { getScales } from '@comp/components/charts/utils';
import {
  type AppLineRangeChartBaseProps,
  AppLineRangeChartDatasetType,
} from '@comp/components/charts/line-range/models';

Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, yScaleText);

const props = defineProps<AppLineRangeChartBaseProps>();

const data = computed<ChartData<'line'>>(() => ({
  datasets: props.chartData?.datasets.map(buildDataset) ?? [],
}));

const options = computed<ChartOptions<'line'>>(() => {
  const optionsWithTitles = mergeDeep<ChartOptions<'line'>>(structuredClone(defaultLineChartOptions), {
    scales: getScales(props.chartData?.axis),
    plugins: {
      legend: {
        onClick: function (this: LegendElement<'line'>, e: ChartEvent, legendItem: LegendItem): void {
          const chart: Chart<'line'> = this.chart;
          if (legendItem.text === 'Порог') {
            chart.data.datasets.forEach((dataset) => {
              if (
                dataset.label === AppLineRangeChartDatasetType.ThresholdMin ||
                dataset.label === AppLineRangeChartDatasetType.ThresholdMax
              ) {
                dataset.hidden = !dataset.hidden;
              }
            });
          } else {
            chart.data.datasets.forEach((dataset) => {
              if (dataset.label === legendItem.text) {
                dataset.hidden = !dataset.hidden;
              }
            });
          }

          chart.update();

          chart.data.datasets.forEach((dataset, index) => {
            if (chart.legend?.legendItems) {
              const legendItemIndex = chart.legend.legendItems.findIndex((item) => item.datasetIndex === index);
              if (legendItemIndex > -1) {
                chart.legend.legendItems[legendItemIndex].hidden = dataset.hidden;
              }
            }
          });

          chart.draw();
        },
        position: 'top',
        align: 'end',
        labels: {
          boxHeight: 4,
          padding: 20,
          color: '#8c979e', // colors.grey2,
          font: {
            size: 13,
          },
          generateLabels: (chart: Chart): LegendItem[] => generateRangeChartLabels(chart),
        },
      },
      yScaleText,
    },
  });

  return props.options ? mergeDeep(optionsWithTitles, props.options) : optionsWithTitles;
});

const refChart = ref();

defineExpose({
  getChart: () => refChart.value?.chart as Chart,
});
</script>
