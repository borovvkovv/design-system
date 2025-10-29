import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import { InputType } from '@comp/components/inputs/utils/models';
import IconEyeOpen from '@comp/components/icons/IconEyeOpen.vue';
import IconEyeClose from '@comp/components/icons/IconEyeClose.vue';
import BaseInputIcon from '@comp/components/inputs/BaseInputIcon.vue';
import BasePasswordInput from '@comp/components/inputs/BasePasswordInput.vue';

const getBasePasswordInput = (props?: Partial<InstanceType<typeof BasePasswordInput>['$props']>) => {
  const wrapper = mount(BasePasswordInput, {
    props: {
      modelValue: '',
      size: Size.S,
      label: 'Test label',
      disabled: false,
      minWidth: 10,
      isNotPreventDefaultEnter: false,
      required: false,
      placeholder: '',
      isError: false,
      errorList: [],
      isCorrect: true,
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент BasePasswordInput', () => {
  test('На нажатии на правую иконку меняется иконка с IconEyeClose на IconEyeOpen', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePasswordInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconEyeClose).exists()).toBeTruthy();
    expect(wrapper.findComponent(IconEyeOpen).exists()).toBeFalsy();

    await wrapper.findComponent(BaseInputIcon)?.trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconEyeClose).exists()).toBeFalsy();
    expect(wrapper.findComponent(IconEyeOpen).exists()).toBeTruthy();
  });

  test('На нажатии на правую иконку меняется тип иконки с Password на Text', async () => {
    const wrapper = getBasePasswordInput();

    expect(wrapper.find('input').element.type).toBe(InputType.Password);

    await wrapper.findComponent(BaseInputIcon)?.trigger('click');

    expect(wrapper.find('input').element.type).toBe(InputType.Text);
  });

  test('При вводе текста в инпут вызывается эмит update:modelValue', async () => {
    const wrapper = getBasePasswordInput();
    const input = wrapper.find('input');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    input.element.value = '250';
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  test('Если вызова expose-метода focus выполняется фокус на инпут', () => {
    const wrapper = getBasePasswordInput();
    const input = wrapper.find('input');
    vi.spyOn(input.element, 'focus').mockImplementation(() => vi.fn());

    wrapper.vm.focus();

    expect(input.element.focus).toHaveBeenCalledTimes(1);
  });
});
