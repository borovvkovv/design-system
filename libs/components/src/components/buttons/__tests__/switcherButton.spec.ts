import { describe, expect, test, vitest } from 'vitest';
import { AppColor } from '@comp/enums';
import { mount } from '@vue/test-utils';
import BaseButton from '@comp/components/buttons/BaseButton.vue';
import SwitcherButton from '@comp/components/buttons/SwitcherButton.vue';
import TextButton from '@comp/components/buttons/TextButton.vue';

const getSwitcherButton = () => {
  const wrapper = mount(SwitcherButton, {
    props: {
      modelValue: true,
      switcher: {
        left: {
          text: 'Правда',
          value: true,
        },
        right: {
          text: 'Ложь',
          value: false,
        },
      },
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({
          modelValue: newValue,
        });
      },
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

  return wrapper;
};

describe('Компонент SwitcherButton', () => {
  test('Компонент SwitcherButton отображает переключатель и подписи левой и правой частей переключателя', async () => {
    const wrapper = getSwitcherButton();
    await vitest.dynamicImportSettled();
    const leftPart = wrapper.findAllComponents(TextButton)[0];
    const rightPart = wrapper.findAllComponents(TextButton)[1];

    expect(leftPart.text()).toBe('Правда');
    expect(rightPart.text()).toBe('Ложь');
    expect(wrapper.props('modelValue')).toBeTruthy();
    expect(leftPart.findComponent(BaseButton).classes()).toContain('bg-blue-2');
    expect(rightPart.findComponent(BaseButton).classes()).toContain('bg-grey-5');
  });

  test('При нажатии на левую/правую часть переключателя обновляется modelValue и активная часть переключателя меняет цвет', async () => {
    const wrapper = getSwitcherButton();
    await vitest.dynamicImportSettled();
    const leftPart = wrapper.findAllComponents(TextButton)[0];
    const rightPart = wrapper.findAllComponents(TextButton)[1];

    await leftPart.trigger('click');

    const updateModelValueEvent = wrapper.emitted('update:modelValue');

    expect(updateModelValueEvent).toHaveLength(1);
    expect(updateModelValueEvent?.[0][0]).toBeTruthy();
    expect(wrapper.props().modelValue).toBeTruthy();
    expect(leftPart.findComponent(TextButton).props().color).toBe(AppColor.Blue);
    expect(rightPart.findComponent(TextButton).props().color).toBe(AppColor.Grey);

    await rightPart.trigger('click');

    expect(updateModelValueEvent).toHaveLength(2);
    expect(updateModelValueEvent?.[1][0]).toBeFalsy();
    expect(wrapper.props().modelValue).toBeFalsy();
    expect(leftPart.findComponent(TextButton).props().color).toBe(AppColor.Grey);
    expect(rightPart.findComponent(TextButton).props().color).toBe(AppColor.Blue);
  });
});
