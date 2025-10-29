import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import { IconName } from '@comp/components/icons/utils/models';
import { InputType } from '@comp/components/inputs/utils/models';
import IconCross from '@comp/components/icons/IconCross.vue';
import IconArrowLeft from '@comp/components/icons/IconArrowLeft.vue';
import BaseInputIcon from '@comp/components/inputs/BaseInputIcon.vue';
import BaseSimpleInput from '@comp/components/inputs/BaseSimpleInput.vue';

const getBaseSimpleInput = (props?: Partial<InstanceType<typeof BaseSimpleInput>['$props']>) => {
  const wrapper = mount(BaseSimpleInput, {
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
      type: InputType.Text,
      iconLeft: IconName.IconArrowLeft,
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      'onChange:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент BaseSimpleInput', () => {
  test('Правая иконка отображается в виде крестика, если в инпуте значение не пустое и инпут не заблокирован', async () => {
    const wrapper = getBaseSimpleInput();
    await vi.dynamicImportSettled();
    const input = wrapper.find('input');

    expect(wrapper.findComponent(IconCross).exists()).toBeFalsy();

    input.element.value = 'test';
    await input.trigger('input');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconCross).exists()).toBeTruthy();

    await wrapper.setProps({ disabled: true });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconCross).exists()).toBeFalsy();
  });

  test('Правая иконка очищает значение инпута', async () => {
    const wrapper = getBaseSimpleInput();
    await vi.dynamicImportSettled();
    const input = wrapper.find('input');

    expect(input.element.value).toBe('');

    input.element.value = 'test';
    await input.trigger('input');

    expect(input.element.value).toBe('test');

    await wrapper.findAllComponents(BaseInputIcon)[1]?.trigger('click');

    expect(input.element.value).toBe('');
  });

  test('Если задана левая иконка, то она отображается всегда', async () => {
    const wrapper = getBaseSimpleInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowLeft).isVisible()).toBeTruthy();
  });

  test('После введения текста в инпут выполняется эмит change:modelValue с текстом из инпута', async () => {
    const wrapper = getBaseSimpleInput();

    expect(wrapper.emitted('change:modelValue')).toBeUndefined();

    wrapper.find('input').element.value = 'test';
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('change:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('change:modelValue')?.[0]).toStrictEqual(['test']);
  });

  test('При введении символа в инпут выполняется эмит update:modelValue с текстом из инпута', async () => {
    const wrapper = getBaseSimpleInput();

    wrapper.find('input').element.value = 'test';
    await wrapper.find('input').trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual(['test']);
  });

  test('Если вызова expose-метода focus выполняется фокус на инпут', () => {
    const wrapper = getBaseSimpleInput();
    const input = wrapper.find('input');
    vi.spyOn(input.element, 'focus').mockImplementation(() => vi.fn());

    wrapper.vm.focus();

    expect(input.element.focus).toHaveBeenCalledTimes(1);
  });
});
