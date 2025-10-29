import { describe, expect, test } from 'vitest';
import { twMergeDirective } from '@comp/directives/tw-merge';
import { AppColor, Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import BaseButton from '@comp/components/buttons/BaseButton.vue';

describe('Компонент BaseButton', () => {
  test('Отображение BaseButton по умолчанию', () => {
    const wrapper = mount(BaseButton, {
      global: {
        directives: {
          twMerge: {},
        },
      },
    });

    expect(wrapper.element.disabled).toBeFalsy();
    expect(wrapper.element.type).toBe('button');
  });

  test('Отображение дефолтного слота BaseButton', () => {
    const wrapper = mount(BaseButton, {
      global: {
        directives: {
          twMerge: {},
        },
      },
      slots: {
        default: '<div id="child">Child</div>',
      },
    });

    expect(wrapper.find('#child').exists()).toBeTruthy();
  });

  test('Вызов эмита при событии click на BaseButton', () => {
    const wrapper = mount(BaseButton, {
      global: {
        directives: {
          twMerge: {},
        },
      },
    });

    wrapper.trigger('click');
    wrapper.trigger('click');

    const incrementEvent = wrapper.emitted('buttonClick');
    expect(incrementEvent).toHaveLength(2);
  });

  test('Классы и атрибуты кнопки меняются в зависимости от пропсов', async () => {
    const wrapper = mount(BaseButton, {
      global: {
        directives: {
          twMerge: {},
        },
      },
      props: {
        color: AppColor.Blue,
        size: Size.XS,
        isDisabled: false,
        type: 'submit',
      },
    });

    expect(wrapper.element.disabled).toBeFalsy();
    expect(wrapper.element.type).toBe('submit');
    expect(wrapper.classes()).toContain('bg-blue-2');
    expect(wrapper.classes()).toContain('h-7');

    await wrapper.setProps({
      color: AppColor.Grey,
      size: Size.M,
      isDisabled: true,
      type: 'reset',
    });

    expect(wrapper.classes()).not.toContain('bg-blue-2');
    expect(wrapper.classes()).not.toContain('h-7');
    expect(wrapper.element.disabled).toBeTruthy();
    expect(wrapper.element.type).toBe('reset');
    expect(wrapper.classes()).toContain('bg-grey-5');
    expect(wrapper.classes()).toContain('h-12');
  });

  test('Атрибут tw-merge оставляет среди классов-tailwind одинакового типа только последний', () => {
    const defaultBgColor = 'bg-red-3';
    const defaultHeight = 'h-10';
    const propsBgColor = 'bg-red-1';
    const propsHeight = 'h-20';

    const wrapper = mount(BaseButton, {
      global: {
        directives: {
          twMerge: twMergeDirective,
        },
      },
      props: {
        color: AppColor.Red,
        size: Size.S,
      },
      attrs: {
        class: [propsBgColor, propsHeight],
      },
    });

    expect(wrapper.classes()).toContain(propsBgColor);
    expect(wrapper.classes()).toContain(propsHeight);
    expect(wrapper.classes()).not.toContain(defaultBgColor);
    expect(wrapper.classes()).not.toContain(defaultHeight);
  });
});
