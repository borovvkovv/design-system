import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TextTooltip from '@comp/components/charts/tooltips/TextTooltip.vue';

const getTextTooltip = () =>
  mount(TextTooltip, {
    props: {
      texts: ['Test text1', 'Test text2'],
      container: undefined,
    },
  });

describe('Компонент TextTooltip', () => {
  test('При монтировании попап не отрисовывается', () => {
    const wrapper = getTextTooltip();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап появляется/исчезает при выполнении expose-метода open/close', async () => {
    vi.useFakeTimers();
    const wrapper = getTextTooltip();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.close();
    await vi.runAllTicks();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Попап отрисовывает текст', async () => {
    vi.useFakeTimers();
    const wrapper = getTextTooltip();

    wrapper.vm.open();
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Test text1');
    expect(wrapper.text()).toContain('Test text2');
  });
});
