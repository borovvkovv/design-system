<template>
  <ChartState
    :is-loading="isLoading"
    :chart-data="chartData"
    :texts="textWhenEmptyList"
  >
    <BarChartBase
      ref="refChart"
      :chart-data="chartData"
      :options="options"
    />
  </ChartState>
</template>

<script setup lang="ts">
import ChartState from '@comp/components/charts/ChartState.vue';
import BarChartBase from '@comp/components/charts/bar-chart/BarChartBase.vue';
import { ref } from 'vue';
import type { Chart } from 'chart.js';
import type { AppBarChartProps } from '@comp/components/charts/bar-chart/models';

defineProps<AppBarChartProps>();

const refChart = ref();

defineExpose({
  getChart: () => refChart.value?.getChart() as Chart,
});
</script>
