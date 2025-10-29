import { describe, expect, test } from 'vitest';
import type { ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import AppLoading from '@comp/components/AppLoading.vue';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import LineChart from '@comp/components/charts/line/LineChart.vue';
import LineChartBase from '@comp/components/charts/line/LineChartBase.vue';

const getLineChart = (props?: Partial<InstanceType<typeof LineChart>['$props']>) => {
  const wrapper = mount(LineChart, {
    props: {
      chartData: propChartDataWithFilledDataset,
      color: 'blue',
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

const options: ChartOptions<'line'> = {
  events: [],
  plugins: { title: { display: true } },
};

describe('Компонент LineChart', () => {
  test('Отображается лоадер', () => {
    const wrapper = getLineChart({
      isLoading: true,
    });

    expect(wrapper.findComponent(AppLoading).exists()).toBeTruthy();
  });

  test('Отображается информация о пустых данных', () => {
    const wrapper = getLineChart({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.text()).toContain('EmptyTest1');
    expect(wrapper.text()).toContain('EmptyTest2');
  });

  test('Отображается график', () => {
    const wrapper = getLineChart();

    expect(wrapper.findComponent(Line).exists()).toBeTruthy();
  });

  test('Проп chartData передается в дочерний компонент', () => {
    const wrapper = getLineChart();

    expect(wrapper.findComponent(LineChartBase).props().chartData).toStrictEqual(propChartDataWithFilledDataset);
  });

  test('Проп options передается в дочерний компонент', () => {
    const wrapper = getLineChart();
    expect(wrapper.findComponent(LineChartBase).props().options).toStrictEqual(options);
  });
});
