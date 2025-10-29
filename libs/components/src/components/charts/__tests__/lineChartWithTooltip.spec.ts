import { ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import LineChart from '@comp/components/charts/line/LineChart.vue';
import TextTooltip from '@comp/components/charts/tooltips/TextTooltip.vue';
import ChartTooltipModal from '@comp/components/charts/tooltips/ChartTooltipModal.vue';
import LineChartWithTooltip from '@comp/components/charts/line/LineChartWithTooltip.vue';

const getLineChartWithTooltip = () =>
  shallowMount(LineChartWithTooltip, {
    props: {
      chartData: propChartData,
      isLoading: false,
      options: undefined,
      tooltipTitle: '',
      textWhenEmptyList: [''],
      tooltipXLabelFormat: undefined,
      tooltipYLabelFormat: undefined,
    },
  });

const propChartData: AppChartProps = {
  axis: {
    x: { title: 'XTitleTest', labels: ['label1', 'label2'] },
    y: { title: 'YTitleTest' },
  },
  datasets: [{ label: 'datasetLabelTest', data: [1, 2, 3], color: '#123456' }],
};

const useBreakpointsMocked = vi.hoisted(() => vi.fn());

vi.mock('@comp/components/utils/hooks/useBreakpoints', () => ({
  useBreakpoints: useBreakpointsMocked,
}));

vi.mock('@comp/components/charts/utils/useChartActions', () => ({
  useChartActions: () => ({
    resetActiveElements: () => {},
    activatePrevPoint: () => {},
    activateNextPoint: () => {},
  }),
}));

vi.mock('@comp/components/charts/tooltips/hooks/useChartTooltipModal', () => ({
  useChartTooltip: () => ({
    chartTooltipModel: {
      xAxisLabel: '',
      values: [
        {
          color: '',
          text: '',
        },
      ],
    },
    canvas: () => {},
    isLast: ref(false),
    isFirst: ref(false),
    desktopOptions: () => {},
    tabletOptions: () => {},
  }),
}));

describe('Компонент LineChartWithTooltip', () => {
  test('При ширине экрана меньше lg всплывающая подсказка будет модальным окном', () => {
    useBreakpointsMocked.mockReturnValue({
      lg: ref(false),
      smaller: () => ref(false),
    });
    const wrapper = getLineChartWithTooltip();

    expect(wrapper.findComponent(ChartTooltipModal).exists()).toBeTruthy();
  });

  test('При ширине экрана больше или равной lg всплывающая подсказка будет попапом', () => {
    useBreakpointsMocked.mockReturnValue({
      lg: ref(true),
      smaller: () => ref(false),
    });
    const wrapper = getLineChartWithTooltip();

    expect(wrapper.findComponent(TextTooltip).exists()).toBeTruthy();
  });

  test('Проп chartData передается в дочерний компонент', () => {
    useBreakpointsMocked.mockReturnValue({
      lg: ref(true),
      smaller: () => ref(false),
    });

    const wrapper = getLineChartWithTooltip();
    expect(wrapper.findComponent(LineChart).props().chartData).toStrictEqual(propChartData);
  });
});
