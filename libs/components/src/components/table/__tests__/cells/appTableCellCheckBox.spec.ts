import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTableCellCheckBox from '@comp/components/table/cells/AppTableCellCheckBox.vue';

const getAppTableCellCheckBox = () =>
  mount(AppTableCellCheckBox, {
    props: {
      modelValue: {
        type: 'checkBox',
        isChecked: false,
      },
    },
  });

describe('Компонент AppTableCellCheckBox', () => {
  test('Подписи у ячейки-чекбокса нет', async () => {
    const wrapper = getAppTableCellCheckBox();

    expect(wrapper.text()).toContain('');
  });

  test('Ячейка-чекбокс всегда доступна', async () => {
    const wrapper = getAppTableCellCheckBox();

    expect(wrapper.find<HTMLInputElement>('input').element.disabled).toBeFalsy();
  });

  test('При клике на чекбокс вызывается эмит update:modelValue с новым значением свойства isChecked', async () => {
    const wrapper = getAppTableCellCheckBox();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([
      {
        type: 'checkBox',
        isChecked: true,
      },
    ]);
  });
});
