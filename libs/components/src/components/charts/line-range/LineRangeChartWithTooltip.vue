<template>
  <div class="relative h-full">
    <LineRangeChart
      v-bind="attrs"
      ref="refChart"
      :chart-data="chartData"
      :is-loading="isLoading"
      :text-when-empty-list="textWhenEmptyList"
      :options="chartOptions"
    />
    <ChartTooltip
      v-if="isGreaterOrEqualLg"
      ref="tooltipRef"
      :container="canvas"
      :x-axis-label="chartTooltipModel.xAxisLabel"
      :values="chartTooltipModel.values"
    />
    <ChartTooltipModal
      v-else
      ref="tooltipRef"
      :tooltip-title="tooltipTitle"
      :is-first="isFirst"
      :is-last="isLast"
      :x-axis-label="chartTooltipModel.xAxisLabel"
      :values="chartTooltipModel.values"
      :activate-prev-point="activatePrevPoint"
      :activate-next-point="activateNextPoint"
      @modal:close="resetActiveElements"
    />
  </div>
</template>

<script setup lang="ts">
import ChartTooltip from '@comp/components/charts/tooltips/ChartTooltip.vue';
import ChartTooltipModal from '@comp/components/charts/tooltips/ChartTooltipModal.vue';
import { computed, ref, useAttrs } from 'vue';
import { useBreakpoints } from '@comp/components/utils/hooks/useBreakpoints';
import { useChartActions } from '@comp/components/charts/utils/useChartActions';
import LineRangeChart from '@comp/components/charts/line-range/LineRangeChart.vue';
import { useChartTooltip } from '@comp/components/charts/tooltips/hooks/useChartTooltipModal';
import type { ChartOptions } from 'chart.js';
import type { LineRangeChartWithTooltipProps } from '@comp/components/charts/line-range/models';

const props = withDefaults(defineProps<LineRangeChartWithTooltipProps>(), {
  tooltipXLabelFormat: (xAxisLabels: string) => xAxisLabels,
  tooltipYLabelFormat: (yAxisLabels: string) => yAxisLabels,
});
const computedXLabelFormat = computed(() => props.tooltipXLabelFormat);
const computedYLabelFormat = computed(() => props.tooltipYLabelFormat);
const attrs = useAttrs();
const breakpoints = useBreakpoints();
const isGreaterOrEqualLg = breakpoints.lg;
const tooltipRef = ref();
const refChart = ref();
const { resetActiveElements, activatePrevPoint, activateNextPoint } = useChartActions(refChart);
const { chartTooltipModel, canvas, isLast, isFirst, desktopOptions, tabletOptions } = useChartTooltip(
  tooltipRef,
  computedXLabelFormat,
  computedYLabelFormat,
);

const chartOptions = computed<ChartOptions<'line'>>(
  () => (isGreaterOrEqualLg.value ? desktopOptions : tabletOptions) as ChartOptions<'line'>,
);
</script>
