import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppSwitcher from '@comp/components/inputs/AppSwitcher.vue';

const getAppSwitcher = (props?: Partial<InstanceType<typeof AppSwitcher>['$props']>) => {
  const wrapper = mount(AppSwitcher, {
    props: {
      modelValue: false,
      isDisabled: false,
      tabIndex: 1,
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      ...props,
    },
  });

  return wrapper;
};

describe('Компонент AppSwitcher', () => {
  test('Активный переключатель сдвинут на право', async () => {
    const wrapper = getAppSwitcher();

    expect(wrapper.find('[data-test="switcherToggler"]').classes()).toContainEqual('left-1');

    await wrapper.trigger('click');

    expect(wrapper.find('[data-test="switcherToggler"]').classes()).toContainEqual('left-4.5');
  });

  test('Неактивный переключатель сдвинут на лево', async () => {
    const wrapper = getAppSwitcher();

    expect(wrapper.find('[data-test="switcherToggler"]').classes()).toContainEqual('left-1');
  });

  test('Если переключатель недоступен, то при нажатии на него переключатель не меняет местоположения', async () => {
    const wrapper = getAppSwitcher();

    expect(wrapper.classes()).not.toContainEqual('pointer-events-none');

    await wrapper.setProps({ isDisabled: true });

    expect(wrapper.classes()).toContainEqual('pointer-events-none');
  });

  test('При клике на переключатель вызывается эмит update:modelValue со значением true/false', async () => {
    const wrapper = getAppSwitcher();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([true]);
  });
});
