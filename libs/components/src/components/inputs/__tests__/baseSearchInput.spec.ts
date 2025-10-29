import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import { InputType } from '@comp/components/inputs/utils/models';
import IconMagnifier from '@comp/components/icons/IconMagnifier.vue';
import BaseSearchInput from '@comp/components/inputs/BaseSearchInput.vue';

const getBaseSearchInput = () =>
  mount(BaseSearchInput, {
    props: {
      modelValue: '',
      size: Size.S,
      label: 'Test label',
      disabled: false,
      minWidth: 10,
      isNotPreventDefaultEnter: false,
      required: false,
      placeholder: '',
    },
    attachTo: document.body,
  });
describe('Компонент BaseSearchInput', () => {
  test('Задана левая иконка в виде лупы', async () => {
    const wrapper = getBaseSearchInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMagnifier).exists()).toBeTruthy();
  });

  test('После введения текста в инпут выполняется эмит change:modelValue с текстом из инпута', async () => {
    const wrapper = getBaseSearchInput();

    expect(wrapper.emitted('change:modelValue')).toBeUndefined();

    wrapper.find('input').element.value = 'test';
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('change:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('change:modelValue')?.[0]).toStrictEqual(['test']);
  });

  test('При введении символа в инпут выполняется эмит update:modelValue с текстом из инпута', async () => {
    const wrapper = getBaseSearchInput();

    wrapper.find('input').element.value = 'test';
    await wrapper.find('input').trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual(['test']);
  });

  test('Тип инпута - Text', async () => {
    const wrapper = getBaseSearchInput();

    expect(wrapper.find('input').element.type).toBe(InputType.Text);
  });
});
