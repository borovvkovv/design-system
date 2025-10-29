<template>
  <ChartState
    :is-loading="isLoading"
    :chart-data="chartData"
    :texts="textWhenEmptyList"
  >
    <div class="h-full">
      <LineChartBase
        ref="refChart"
        :chart-data="chartData"
        :color="color"
        :options="options"
      />
    </div>
  </ChartState>
</template>

<script setup lang="ts">
import ChartState from '@comp/components/charts/ChartState.vue';
import LineChartBase from '@comp/components/charts/line/LineChartBase.vue';
import { ref } from 'vue';
import type { Chart } from 'chart.js';
import type { AppLineChartProps } from '@comp/components/charts/line/models';

defineProps<AppLineChartProps>();

const refChart = ref();

defineExpose({
  getChart: () => refChart.value?.getChart() as Chart,
});
</script>
