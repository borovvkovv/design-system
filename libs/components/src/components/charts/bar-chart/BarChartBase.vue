<template>
  <Bar
    v-if="data.datasets.length > 0"
    ref="refChart"
    :data="data"
    :options="optionsLocal"
  />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import type { ChartData, ChartDataset } from 'chart.js';
import { yScaleText } from '@comp/assets/styles/chartjs-extension/plugins';
import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import { computed, ref } from 'vue';
import { mergeDeep } from '@comp/utils/object';
import { barChartBaseOptions } from '@comp/components/charts/bar-chart/utils';
import { getScales } from '@comp/components/charts/utils';
import type { AppBarChartBaseProps } from '@comp/components/charts/bar-chart/models';

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, Filler, yScaleText);
type ChartType = 'bar';
const props = defineProps<AppBarChartBaseProps>();

const data = computed<ChartData<ChartType>>(() => ({
  datasets:
    props.chartData?.datasets?.map(({ label, data, color }) => {
      const result: ChartDataset<ChartType> = {
        label,
        data,
      };
      result.borderColor = color ?? result.borderColor;
      result.backgroundColor = color ?? result.borderColor;

      return result;
    }) ?? [],
}));

const optionsLocal = computed<ChartOptions<ChartType>>(() => {
  const options = props.options
    ? mergeDeep(structuredClone(barChartBaseOptions), props.options)
    : structuredClone(barChartBaseOptions);

  const scales = getScales(props.chartData?.axis, options.indexAxis);

  const optionsWithTitles = mergeDeep<ChartOptions<ChartType>>(structuredClone(barChartBaseOptions), {
    scales,
  });

  return props.options ? mergeDeep(optionsWithTitles, props.options) : optionsWithTitles;
});

const refChart = ref();

defineExpose({
  getChart: () => refChart.value?.chart as Chart,
});
</script>
