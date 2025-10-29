import { describe, expect, test } from 'vitest';
import type { ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import AppLoading from '@comp/components/AppLoading.vue';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import LineRangeChart from '@comp/components/charts/line-range/LineRangeChart.vue';
import LineRangeChartBase from '@comp/components/charts/line-range/LineRangeChartBase.vue';

const getLineRangeChart = (props?: Partial<InstanceType<typeof LineRangeChart>['$props']>) =>
  mount(LineRangeChart, {
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

describe('Компонент LineRangeChart', () => {
  test('Отображается лоадер', () => {
    const wrapper = getLineRangeChart({
      isLoading: true,
    });

    expect(wrapper.findComponent(AppLoading).exists()).toBeTruthy();
  });

  test('Отображается информация о пустых данных', () => {
    const wrapper = getLineRangeChart({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.text()).toContain('EmptyTest1');
    expect(wrapper.text()).toContain('EmptyTest2');
  });

  test('Отображается график', () => {
    const wrapper = getLineRangeChart();

    expect(wrapper.findComponent(Line).exists()).toBeTruthy();
  });

  test('Проп chartData передается в дочерний компонент', () => {
    const wrapper = getLineRangeChart();

    expect(wrapper.findComponent(LineRangeChartBase).props().chartData).toStrictEqual(propChartDataWithFilledDataset);
  });

  test('Проп options передается в дочерний компонент', () => {
    const wrapper = getLineRangeChart();
    expect(wrapper.findComponent(LineRangeChartBase).props().options).toStrictEqual(options);
  });
});
