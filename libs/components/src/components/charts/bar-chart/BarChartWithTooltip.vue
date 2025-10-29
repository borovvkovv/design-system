<template>
  <div class="relative h-full">
    <BarChart
      v-bind="attrs"
      ref="refChart"
      :chart-data="chartData"
      :is-loading="isLoading"
      :text-when-empty-list="textWhenEmptyList"
      :options="barChartOptions"
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
import BarChart from '@comp/components/charts/bar-chart/BarChart.vue';
import ChartTooltipModal from '@comp/components/charts/tooltips/ChartTooltipModal.vue';
import { computed, ref, useAttrs } from 'vue';
import type { ChartOptions } from 'chart.js';
import { horizontalBarChartBaseOptions } from '@comp/components/charts/bar-chart/utils';
import { BreakpointName } from '@comp/enums/breakpoint-name';
import { useBreakpoints } from '@comp/components/utils/hooks/useBreakpoints';
import ChartTooltip from '@comp/components/charts/tooltips/ChartTooltip.vue';
import { useChartActions } from '@comp/components/charts/utils/useChartActions';
import { useChartTooltip } from '@comp/components/charts/tooltips/hooks/useChartTooltipModal';
import type { BarChartWithTooltipProps } from '@comp/components/charts/bar-chart/models';

const props = withDefaults(defineProps<BarChartWithTooltipProps>(), {
  tooltipXLabelFormat: (xAxisLabels: string) => xAxisLabels,
  tooltipYLabelFormat: (yAxisLabels: string) => yAxisLabels,
});
const computedXLabelFormat = computed(() => props.tooltipXLabelFormat);
const computedYLabelFormat = computed(() => props.tooltipYLabelFormat);
const attrs = useAttrs();
const breakpoints = useBreakpoints();
const isGreaterOrEqualLg = breakpoints.lg;
const isSm = breakpoints.smaller(BreakpointName.Md);
const refChart = ref();
const { resetActiveElements, activatePrevPoint, activateNextPoint } = useChartActions(refChart);
const tooltipRef = ref();
const { chartTooltipModel, canvas, isLast, isFirst, desktopOptions, tabletOptions } = useChartTooltip(
  tooltipRef,
  computedXLabelFormat,
  computedYLabelFormat,
);

const barChartOptions = computed<ChartOptions<'bar'>>(() => {
  if (isGreaterOrEqualLg.value) {
    return desktopOptions as ChartOptions<'bar'>;
  }

  if (isSm.value) {
    return {
      ...horizontalBarChartBaseOptions,
      ...tabletOptions,
    } as ChartOptions<'bar'>;
  }

  return tabletOptions as ChartOptions<'bar'>;
});
</script>
