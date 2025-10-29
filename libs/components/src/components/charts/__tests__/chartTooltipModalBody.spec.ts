import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ChartTooltipModalBody from '@comp/components/charts/tooltips/modal-tooltip/ChartTooltipModalBody.vue';

const getChartTooltipModalBody = (props?: Partial<InstanceType<typeof ChartTooltipModalBody>['$props']>) =>
  mount(ChartTooltipModalBody, {
    props: {
      xAxisLabel: 'Test xAxisLabel',
      values: [
        {
          color: '#000',
          text: 'Test text 1',
        },
        {
          color: '#fff',
          text: 'Test text 2',
        },
      ],
      tooltipTitle: 'Test tooltipTitle',
      ...props,
    },
  });

describe('Компонент ChartTooltipModalBody', () => {
  test('Отрисовывает заголовок', () => {
    const wrapper = getChartTooltipModalBody();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test tooltipTitle');
  });

  test('Отрисовывает наименование оси X', () => {
    const wrapper = getChartTooltipModalBody();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test xAxisLabel');
  });

  test('Отрисовывает значения', () => {
    const wrapper = getChartTooltipModalBody();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test text 1');
    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test text 2');
  });

  test('Если передано только одно значение, то цвет набора данных не отображается', () => {
    const wrapper = getChartTooltipModalBody({
      values: [{ color: '#000', text: 'value1' }],
    });

    expect(wrapper.findComponent(ChartTooltipModalBody).findAll('[data-test="datasetColor"]')).toHaveLength(0);
  });

  test('Если передано более одного значения, то цвет набора данных отображается', () => {
    const wrapper = getChartTooltipModalBody();

    expect(wrapper.findComponent(ChartTooltipModalBody).findAll('[data-test="datasetColor"]')).toHaveLength(2);
  });
});
