import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChartTooltip from '@comp/components/charts/tooltips/ChartTooltip.vue';

const getChartTooltip = (props?: Partial<InstanceType<typeof ChartTooltip>['$props']>) =>
  mount(ChartTooltip, {
    props: {
      xAxisLabel: 'Test xAxisLabel',
      values: [
        { color: '#000', text: 'Test text 1' },
        { color: '#fff', text: 'Test text 2' },
      ],
      container: undefined,
      ...props,
    },
  });

describe('Компонент ChartTooltip', () => {
  test('При монтировании попап не отрисовывается', () => {
    const wrapper = getChartTooltip();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап появляется/исчезает при выполнении expose-метода open/close', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltip();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.close();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап отрисовывает наименование оси X', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltip();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Test xAxisLabel');
  });

  test('Попап отрисовывает значения', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltip();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Test text 1');
    expect(wrapper.text()).toContain('Test text 2');
  });

  test('Если передано только одно значение, то цвет набора данных не отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltip({
      values: [{ color: '#000', text: 'Test text 1' }],
    });

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.findAll('[data-test="datasetColor"]')).toHaveLength(0);
  });

  test('Если передано более одного значения, то цвет набора данных отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltip();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.findAll('[data-test="datasetColor"]')).toHaveLength(2);
  });
});
