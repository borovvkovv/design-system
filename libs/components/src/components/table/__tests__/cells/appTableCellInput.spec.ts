import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTableCellInput from '@comp/components/table/cells/AppTableCellInput.vue';

const getAppTableCellInput = () =>
  mount(AppTableCellInput, {
    props: {
      modelValue: {
        type: 'input',
        input: { modelValue: 'test' },
      },
    },
  });

describe('Компонент AppTableCellInput', () => {
  test('При удалении из фокуса инпута вызывается эмит update:modelValue', async () => {
    const wrapper = getAppTableCellInput();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').trigger('blur');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([
      {
        type: 'input',
        input: { modelValue: 'test' },
      },
    ]);
  });

  test('После введения текста в инпут эмит change:modelValue не вызывается', async () => {
    const wrapper = getAppTableCellInput();

    expect(wrapper.emitted('change:modelValue')).toBeUndefined();

    wrapper.find('input').element.value = 'testModified';
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('change:modelValue')).toBeUndefined();
  });
});
