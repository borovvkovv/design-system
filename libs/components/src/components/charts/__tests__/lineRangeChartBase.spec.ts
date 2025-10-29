import { describe, expect, test } from 'vitest';
import { Line } from 'vue-chartjs';
import { mount } from '@vue/test-utils';
import type { ChartData } from 'chart.js';
import { yScaleText } from '@comp/assets/styles/chartjs-extension/plugins';
import type { ChartOptions } from '@comp/assets/styles/chartjs-extension/models';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import { defaultLineChartOptions } from '@comp/components/charts/line-range/utils';
import LineRangeChartBase from '@comp/components/charts/line-range/LineRangeChartBase.vue';

const getLineRangeChartBase = (props?: Partial<InstanceType<typeof LineRangeChartBase>['$props']>) =>
  mount(LineRangeChartBase, {
    props: {
      chartData: propChartData,
      options: undefined,
      ...props,
    },
  });

const propChartData: AppChartProps = {
  axis: {
    x: { title: 'XTitleTest', labels: ['label1', 'label2'] },
    y: { title: 'YTitleTest' },
  },
  datasets: [{ label: 'datasetLabelTest', data: [1, 2, 3], color: '#123456' }],
};

const lineChartData: ChartData<'line'> = {
  datasets: [
    {
      type: 'line',
      label: 'datasetLabelTest',
      data: [1, 2, 3],
      cubicInterpolationMode: 'monotone',
      borderWidth: 1,
      borderColor: '#123456',
      backgroundColor: '#123456',
      pointRadius: 4,
      pointBorderColor: '_white_350915',
      pointHoverRadius: 5,
      fill: false,
    },
  ],
};

const baseOptions: ChartOptions<'line'> = {
  ...defaultLineChartOptions,
  scales: {
    y: {
      ...defaultLineChartOptions?.scales?.y,
      title: { ...defaultLineChartOptions?.scales?.y?.title, text: propChartData.axis.y.title },
    },
    x: {
      type: 'category',
      ...defaultLineChartOptions?.scales?.x,
      title: { ...defaultLineChartOptions?.scales?.x?.title, text: propChartData.axis.x.title },
      labels: propChartData.axis.x.labels,
    },
  },
  plugins: expect.objectContaining({
    ...defaultLineChartOptions.plugins,
    yScaleText,
  }),
};

const propOptions: ChartOptions<'line'> = {
  events: [],
  plugins: { title: { display: true } },
};

const baseOptionsWithPropOptions: ChartOptions<'line'> = {
  ...baseOptions,
  events: propOptions.events,
  plugins: expect.objectContaining({
    ...defaultLineChartOptions.plugins,
    ...propOptions.plugins,
  }),
};

describe('Компонент LineRangeChartBase', () => {
  test('Переданные через проп данные преобразуются в необходимый формат и передаются в график', () => {
    const wrapper = getLineRangeChartBase();

    expect(wrapper.findComponent(Line).props().data).toStrictEqual(lineChartData);
  });

  test('В график передаются только базовые параметры, если параметры через проп не заданы', () => {
    const wrapper = getLineRangeChartBase({
      options: undefined,
    });

    expect(wrapper.findComponent(Line).props().options).toEqual(baseOptions);
  });

  test('В график передаются объединенные базовые и передаваемые через проп параметры', () => {
    const wrapper = getLineRangeChartBase({
      options: propOptions,
    });

    expect(wrapper.findComponent(Line).props().options).toEqual(baseOptionsWithPropOptions);
  });
});
