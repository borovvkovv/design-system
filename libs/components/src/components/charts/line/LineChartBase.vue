<template>
  <Line
    v-if="data.datasets.length > 0"
    ref="refChart"
    :data="data"
    :options="optionsLocal"
  />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import type { ChartData } from 'chart.js';
import { yScaleText } from '@comp/assets/styles/chartjs-extension/plugins';
import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import { computed, ref } from 'vue';
import { mergeDeep } from '@comp/utils/object';
import { lineChartBaseOptions } from '@comp/components/charts/line/utils';
import type { AppLineChartBaseProps } from '@comp/components/charts/line/models';

Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, yScaleText);
type ChartType = 'line';
const props = withDefaults(defineProps<AppLineChartBaseProps>(), {
  color: 'blue',
});

const graphColors = computed(() => {
  if (props.color === 'green') {
    return {
      line: '#00bf2a',
      gradientTop: '#59FC861A',
      gradientBottom: '#16B8434D',
    };
  }

  return {
    line: '#0079C2',
    gradientTop: '#B4E1FF1A',
    gradientBottom: '#33A5F04D',
  };
});

const data = computed<ChartData<ChartType>>(() => ({
  datasets:
    props.chartData?.datasets?.map(({ label, data }) => ({
      borderColor: graphColors.value.line,
      pointBackgroundColor: graphColors.value.line,
      hoverBackgroundColor: graphColors.value.line,
      backgroundColor: (ctx: { chart: Chart }) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, ctx.chart.height);
        gradient.addColorStop(0, graphColors.value.gradientBottom);
        gradient.addColorStop(1, graphColors.value.gradientTop);

        return gradient;
      },
      label: label,
      data,
      tension: 0.1,
      fill: true,
    })) ?? [],
}));

const optionsLocal = computed<ChartOptions<ChartType>>(() => {
  let optionsWithTitles: ChartOptions<ChartType> = structuredClone(lineChartBaseOptions);
  optionsWithTitles = mergeDeep<ChartOptions<ChartType>>(optionsWithTitles, {
    scales: {
      y: {
        title: {
          text: props.chartData?.axis.y.title,
        },
      },
      x: {
        type: 'category' as const,
        title: {
          text: props.chartData?.axis.x.title,
        },
        labels: props.chartData?.axis.x.labels,
      },
    },
    plugins: {
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
