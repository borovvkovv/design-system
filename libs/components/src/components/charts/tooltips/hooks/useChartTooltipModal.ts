import { type MaybeRef, reactive, ref, unref } from 'vue';
import type { IChartTooltipBase } from '@comp/components/charts/tooltips/models';
import type { ActiveDataPoint, Chart, ChartOptions } from 'chart.js';
import type { Reactive, Ref } from 'vue';

export const useChartTooltip = (
  tooltipRef: MaybeRef,
  tooltipXLabelFormat: MaybeRef<(xAxisPointLabel: string, xAxisNextPointLabel: string) => string> = (xAxisLabel) =>
    xAxisLabel,
  tooltipYLabelFormat: MaybeRef<(yAxisPointLabel: string) => string> = (yAxisLabel) => yAxisLabel,
): {
  chartTooltipModel: Reactive<IChartTooltipBase>;
  isFirst: Ref<boolean>;
  isLast: Ref<boolean>;
  desktopOptions: ChartOptions;
  tabletOptions: ChartOptions;
  canvas: Ref<HTMLElement | undefined>;
} => {
  const canvas = ref<HTMLElement | undefined>();

  const chartTooltipModel = reactive<IChartTooltipBase>({
    values: [],
    xAxisLabel: '',
  });

  const isFirst = ref(false);
  const isLast = ref(false);

  const updateChartTooltipModel = (chart: Chart, tooltipActiveElements: ActiveDataPoint[]) => {
    const dataIndex = tooltipActiveElements[0].index;
    const datasets = chart.data.datasets.filter(
      (dataset) => (dataset.type === 'line' && !dataset.fill) || dataset.type !== 'line',
    );
    const scales = chart.scales;
    const ticks = scales.x.type === 'category' ? scales.x.ticks : scales.y.ticks;
    chartTooltipModel.xAxisLabel = unref(tooltipXLabelFormat)(
      ticks[dataIndex]?.label?.toString() ?? '',
      ticks[dataIndex + 1]?.label?.toString() ?? '',
    );
    chartTooltipModel.values = datasets.map((dataset) => ({
      color: dataset.backgroundColor?.toString() ?? '',
      text: unref(tooltipYLabelFormat)(dataset.data[dataIndex]?.toString() ?? ''),
    }));
    const activeElements: ActiveDataPoint[] = datasets.map((_, datasetIndex) => ({
      index: dataIndex,
      datasetIndex,
    }));
    isFirst.value = dataIndex === 0;
    isLast.value = dataIndex + 1 === (datasets[0]?.data.length ?? 0);

    //TODO разобраться почему при движении по бару слетает состояние active
    chart.setActiveElements(activeElements);
  };

  const desktopOptions: ChartOptions = {
    plugins: {
      tooltip: {
        enabled: false,
        external: (context) => {
          const tooltipActiveElements: ActiveDataPoint[] = context.tooltip.getActiveElements();
          if (tooltipActiveElements.length === 0) {
            unref(tooltipRef)?.close();
            return;
          }

          updateChartTooltipModel(context.chart, tooltipActiveElements);
          canvas.value = context.chart.canvas;
          unref(tooltipRef)?.open(context.tooltip.caretX, context.tooltip.caretY);
        },
      },
    },
  };

  const tabletOptions: ChartOptions = {
    events: ['click'],
    plugins: {
      tooltip: {
        enabled: false,
        external: (context) => {
          const tooltipActiveElements: ActiveDataPoint[] = context.tooltip.getActiveElements();
          if (tooltipActiveElements.length === 0) {
            return;
          }

          updateChartTooltipModel(context.chart, tooltipActiveElements);
          tooltipRef.value?.openModal();
        },
      },
    },
  };

  return {
    chartTooltipModel,
    isFirst,
    isLast,
    desktopOptions,
    tabletOptions,
    canvas,
  };
};
