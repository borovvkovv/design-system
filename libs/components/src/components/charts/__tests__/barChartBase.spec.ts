import { describe, expect, test } from 'vitest';
import { Bar } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import type { ChartData, ChartOptions } from 'chart.js';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import BarChartBase from '@comp/components/charts/bar-chart/BarChartBase.vue';
import { barChartBaseOptions } from '@comp/components/charts/bar-chart/utils';

const getBarChartBase = (props?: Partial<InstanceType<typeof BarChartBase>['$props']>) =>
  mount(BarChartBase, {
    props: {
      chartData: propChartDataWithFilledDataset,
      options: undefined,
      ...props,
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

const barChartData: ChartData<'bar'> = {
  datasets: [
    {
      label: propChartDataWithFilledDataset.datasets[0].label,
      data: propChartDataWithFilledDataset.datasets[0].data,
      borderColor: propChartDataWithFilledDataset.datasets[0].color,
      backgroundColor: propChartDataWithFilledDataset.datasets[0].color,
    },
  ],
};

const baseOptions: ChartOptions<'bar'> = {
  ...barChartBaseOptions,
  scales: {
    y: {
      ...barChartBaseOptions?.scales?.y,
      title: { ...barChartBaseOptions?.scales?.y?.title, text: propChartDataWithFilledDataset.axis.y.title },
    },
    x: {
      type: 'category',
      ...barChartBaseOptions?.scales?.x,
      title: { ...barChartBaseOptions?.scales?.x?.title, text: propChartDataWithFilledDataset.axis.x.title },
      labels: propChartDataWithFilledDataset.axis.x.labels,
    },
  },
};

const propOptions: ChartOptions<'bar'> = {
  events: [],
  plugins: { title: { display: true } },
};

const baseOptionsWithPropOptions: ChartOptions<'bar'> = {
  ...baseOptions,
  events: propOptions.events,
  plugins: {
    ...baseOptions.plugins,
    ...propOptions.plugins,
  },
};

describe('Компонент BarChartBase', () => {
  test('График не отрисовывается, если не загрузились данные', () => {
    const wrapper = getBarChartBase({
      chartData: null,
    });

    expect(wrapper.findComponent(Bar).exists()).toBeFalsy();
  });

  test('График не отрисовывается, если задан пустой набор значений', () => {
    const wrapper = getBarChartBase({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.findComponent(Bar).exists()).toBeFalsy();
  });

  test('Переданные через проп данные преобразуются в необходимый формат и передаются в график', () => {
    const wrapper = getBarChartBase();

    expect(wrapper.findComponent(Bar).props().data).toStrictEqual(barChartData);
  });

  test('В график передаются только базовые параметры, если параметры через проп не заданы', () => {
    const wrapper = getBarChartBase({
      options: undefined,
    });

    expect(wrapper.findComponent(Bar).props().options).toStrictEqual(baseOptions);
  });

  test('В график передаются объединенные базовые и передаваемые через проп параметры', () => {
    const wrapper = getBarChartBase({
      options: propOptions,
    });

    expect(wrapper.findComponent(Bar).props().options).toStrictEqual(baseOptionsWithPropOptions);
  });
});
