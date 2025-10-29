import { describe, expect, test } from 'vitest';
import type { ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import AppLoading from '@comp/components/AppLoading.vue';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import BarChart from '@comp/components/charts/bar-chart/BarChart.vue';
import BarChartBase from '@comp/components/charts/bar-chart/BarChartBase.vue';

const getBarChart = (props?: Partial<InstanceType<typeof BarChart>['$props']>) => {
  const wrapper = mount(BarChart, {
    props: {
      chartData: propChartDataWithFilledDataset,
      options,
      isLoading: false,
      textWhenEmptyList: ['EmptyTest1', 'EmptyTest2'],
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

  return wrapper;
};

const propChartDataWithFilledDataset: AppChartProps = {
  axis: {
    x: { title: 'XTitleTest', labels: ['label1', 'label2'] },
    y: { title: 'YTitleTest' },
  },
  datasets: [{ label: 'datasetLabelTest', data: [1, 2, 3], color: '#123456' }],
};

const propChartDataWithEmptyDataset: AppChartProps = {
  ...propChartDataWithFilledDataset,
  datasets: [],
};

const options: ChartOptions<'bar'> = {
  events: [],
  plugins: { title: { display: true } },
};

describe('Компонент BarChart', () => {
  test('Отображается лоадер', () => {
    const wrapper = getBarChart({
      isLoading: true,
    });

    expect(wrapper.findComponent(AppLoading).exists()).toBeTruthy();
  });

  test('Отображается информация о пустых данных', () => {
    const wrapper = getBarChart({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.text()).toContain('EmptyTest1');
    expect(wrapper.text()).toContain('EmptyTest2');
  });

  test('Отображается график', () => {
    const wrapper = getBarChart();

    expect(wrapper.findComponent(Bar).exists()).toBeTruthy();
  });

  test('Проп chartData передается в дочерний компонент', () => {
    const wrapper = getBarChart();
    expect(wrapper.findComponent(BarChartBase).props().chartData).toStrictEqual(propChartDataWithFilledDataset);
  });

  test('Проп options передается в дочерний компонент', () => {
    const wrapper = getBarChart();
    expect(wrapper.findComponent(BarChartBase).props().options).toStrictEqual(options);
  });
});
