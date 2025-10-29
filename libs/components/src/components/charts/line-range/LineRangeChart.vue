<template>
  <ChartState
    :is-loading="isLoading"
    :chart-data="chartData"
    :texts="textWhenEmptyList"
  >
    <div class="h-full">
      <LineRangeChartBase
        ref="refChart"
        :chart-data="chartData"
        :options="options"
      />
    </div>
  </ChartState>
</template>

<script setup lang="ts">
import ChartState from '@comp/components/charts/ChartState.vue';
import LineRangeChartBase from '@comp/components/charts/line-range/LineRangeChartBase.vue';
import { ref } from 'vue';
import type { Chart } from 'chart.js';
import type { AppChartLineRangeProps } from '@comp/components/charts/line-range/models';

defineProps<AppChartLineRangeProps>();

const refChart = ref();

defineExpose({
  getChart: () => refChart.value?.getChart() as Chart,
});
</script>
