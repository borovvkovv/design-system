import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TooltipBase from '@comp/components/charts/tooltips/TooltipBase.vue';

const getTooltipBase = () =>
  mount(TooltipBase, {
    props: {
      container: undefined,
    },
    slots: {
      default: '<div id="tooltipBaseTest" />',
    },
  });

describe('Компонент TooltipBase', () => {
  test('При монтировании попап не отрисовывается', () => {
    const wrapper = getTooltipBase();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап появляется/исчезает при выполнении expose-метода open/close', async () => {
    vi.useFakeTimers();
    const wrapper = getTooltipBase();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.close();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап отрисовывает слот', async () => {
    vi.useFakeTimers();
    const wrapper = getTooltipBase();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.find('#tooltipBaseTest').exists()).toBeTruthy();
  });
});
