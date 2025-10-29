import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLoading from '@comp/components/AppLoading.vue';
import ChartState from '@comp/components/charts/ChartState.vue';
import type { AppChartProps } from '@comp/components/charts/utils/models';

const getChartState = (props?: Partial<InstanceType<typeof ChartState>['$props']>) =>
  mount(ChartState, {
    props: {
      chartData: propChartDataWithFilledDataset,
      isLoading: false,
      texts: ['EmptyTest1', 'EmptyTest2'],
      ...props,
    },
    slots: {
      default: '<h1>TestTextSlot</h1>',
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

const propChartDataWithFilledDataset: AppChartProps = {
  axis: {
    x: { title: '', labels: ['', ''] },
    y: { title: '' },
  },
  datasets: [{ label: '', data: [1, 2, 3] }],
};

const propChartDataWithEmptyDataset: AppChartProps = {
  ...propChartDataWithFilledDataset,
  datasets: [],
};

describe('Компонент ChartState', () => {
  test('Отображается лоадер', () => {
    const wrapper = getChartState({
      isLoading: true,
    });

    expect(wrapper.findComponent(AppLoading).exists()).toBeTruthy();
  });

  test('Отображается информация о пустых данных', () => {
    const wrapper = getChartState({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.text()).toContain('EmptyTest1');
    expect(wrapper.text()).toContain('EmptyTest2');
  });

  test('Отображается слот', () => {
    const wrapper = getChartState();

    expect(wrapper.text()).toContain('TestTextSlot');
  });
});
