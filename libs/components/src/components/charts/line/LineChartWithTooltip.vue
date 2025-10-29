<template>
  <LineChart
    ref="refLine"
    v-bind="attrs"
    :is-loading="isLoading"
    :text-when-empty-list="textWhenEmptyList"
    :color="color"
    :options="options"
    :chart-data="chartData"
  />
  <TextTooltip
    v-if="isGreaterOrEqualLg"
    ref="tooltipRef"
    :texts="tooltipTexts"
    :container="canvas"
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
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import type { ChartOptions } from 'chart.js';
import LineChart from '@comp/components/charts/line/LineChart.vue';
import TextTooltip from '@comp/components/charts/tooltips/TextTooltip.vue';
import { useBreakpoints } from '@comp/components/utils/hooks/useBreakpoints';
import ChartTooltipModal from '@comp/components/charts/tooltips/ChartTooltipModal.vue';
import { useChartActions } from '@comp/components/charts/utils/useChartActions';
import { useChartTooltip } from '@comp/components/charts/tooltips/hooks/useChartTooltipModal';
import type { LineChartWithTooltipProps } from '@comp/components/charts/line/models';

const props = withDefaults(defineProps<LineChartWithTooltipProps>(), {
  tooltipXLabelFormat: (xAxisLabels: string) => xAxisLabels,
  tooltipYLabelFormat: (yAxisLabels: string) => yAxisLabels,
});
const computedXLabelFormat = computed(() => props.tooltipXLabelFormat);
const computedYLabelFormat = computed(() => props.tooltipYLabelFormat);

const breakpoints = useBreakpoints();
const isGreaterOrEqualLg = breakpoints.lg;

const attrs = useAttrs();
const refLine = ref();
const tooltipRef = ref();
const { resetActiveElements, activateNextPoint, activatePrevPoint } = useChartActions(refLine);
const { chartTooltipModel, canvas, isLast, isFirst, desktopOptions, tabletOptions } = useChartTooltip(
  tooltipRef,
  computedXLabelFormat,
  computedYLabelFormat,
);

const tooltipTexts = computed(() => [
  chartTooltipModel.xAxisLabel,
  ...chartTooltipModel.values.map((value) => value.text),
]);

const options = computed<ChartOptions<'line'>>(() =>
  isGreaterOrEqualLg.value ? (desktopOptions as ChartOptions<'line'>) : (tabletOptions as ChartOptions<'line'>),
);
</script>
