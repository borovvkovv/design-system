import { describe, expect, test } from 'vitest';
import { Line } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import type { ChartData } from 'chart.js';
import { yScaleText } from '@comp/assets/styles/chartjs-extension/plugins';
import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import { lineChartBaseOptions } from '@comp/components/charts/line/utils';
import LineChartBase from '@comp/components/charts/line/LineChartBase.vue';

const getLineChartBase = (props?: Partial<InstanceType<typeof LineChartBase>['$props']>) =>
  mount(LineChartBase, {
    props: {
      chartData: propChartDataWithFilledDataset,
      color: 'green',
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

const lineChartData: ChartData<'line'> = {
  datasets: [
    expect.objectContaining({
      borderColor: '#00bf2a',
      pointBackgroundColor: '#00bf2a',
      hoverBackgroundColor: '#00bf2a',
      label: 'datasetLabelTest',
      data: [1, 2, 3],
      tension: 0.1,
      fill: true,
    }),
  ],
};

const baseOptions: ChartOptions<'line'> = {
  ...lineChartBaseOptions,
  scales: {
    y: {
      ...lineChartBaseOptions?.scales?.y,
      title: { ...lineChartBaseOptions?.scales?.y?.title, text: propChartDataWithFilledDataset.axis.y.title },
    },
    x: {
      type: 'category',
      ...lineChartBaseOptions?.scales?.x,
      title: { ...lineChartBaseOptions?.scales?.x?.title, text: propChartDataWithFilledDataset.axis.x.title },
      labels: propChartDataWithFilledDataset.axis.x.labels,
    },
  },
  plugins: {
    ...lineChartBaseOptions.plugins,
    yScaleText,
  },
};

const propOptions: ChartOptions<'line'> = {
  events: [],
  plugins: { title: { display: true } },
};

const baseOptionsWithPropOptions: ChartOptions<'line'> = {
  ...baseOptions,
  events: propOptions.events,
  plugins: {
    ...baseOptions.plugins,
    ...propOptions.plugins,
  },
};

describe('Компонент LineChartBase', () => {
  test('График не отрисовывается, если не загрузились данные', () => {
    const wrapper = getLineChartBase({
      chartData: null,
    });

    expect(wrapper.findComponent(Line).exists()).toBeFalsy();
  });

  test('График не отрисовывается, если задан пустой набор значений', () => {
    const wrapper = getLineChartBase({
      chartData: propChartDataWithEmptyDataset,
    });

    expect(wrapper.findComponent(Line).exists()).toBeFalsy();
  });

  test('Переданные через проп данные преобразуются в необходимый формат и передаются в график', () => {
    const wrapper = getLineChartBase();

    expect(wrapper.findComponent(Line).props().data).toEqual(lineChartData);
  });

  test('В график передаются только базовые параметры, если параметры через проп не заданы', () => {
    const wrapper = getLineChartBase({
      options: undefined,
    });

    expect(wrapper.findComponent(Line).props().options).toStrictEqual(baseOptions);
  });

  test('В график передаются объединенные базовые и передаваемые через проп параметры', () => {
    const wrapper = getLineChartBase({
      options: propOptions,
    });

    expect(wrapper.findComponent(Line).props().options).toStrictEqual(baseOptionsWithPropOptions);
  });
});
