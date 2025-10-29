import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppCheckbox from '@comp/components/inputs/AppCheckbox.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import { IconName } from '@comp/components/icons/utils/models';

const getAppCheckbox = (props?: Partial<InstanceType<typeof AppCheckbox>['$props']>) =>
  mount(AppCheckbox, {
    props: {
      modelValue: false,
      label: 'Test label',
      isDisabled: false,
      isError: false,
      fieldId: 'Test fieldId',
      tabindex: 1,
      inverseColor: false,
      ...props,
    },
  });

describe('Компонент AppCheckbox', () => {
  test('При клике на чекбокс меняется значение checked на true', async () => {
    const wrapper = getAppCheckbox();

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();

    await wrapper.find('label').trigger('click');

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeTruthy();
  });

  test('Отображается подпись чекбокса', async () => {
    const wrapper = getAppCheckbox();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если чекбокс недоступен, то при нажатии на чекбокс значение checked не изменяется', async () => {
    const wrapper = getAppCheckbox({ isDisabled: true });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();

    await wrapper.find('label').trigger('click');

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();
  });

  test('При клике на чекбокс вызывается эмит update:modelValue со значением checked', async () => {
    const wrapper = getAppCheckbox();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  test('Если значение чекбокса равно null, то в чекбоксе отображается прочерк', () => {
    const wrapper = getAppCheckbox({ modelValue: null });

    expect(wrapper.findComponent(AppIcon).props().icon).toBe(IconName.IconMinus);
  });

  test('Если проп modelValue = true, то свойство checked чекбокса = true', () => {
    const wrapper = getAppCheckbox({ modelValue: true });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeTruthy();
  });

  test('Если проп modelValue = false, то свойство checked чекбокса = false', () => {
    const wrapper = getAppCheckbox({ modelValue: false });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();
  });

  test('Проп fieldId используется для свзяи чекбокса и подписи', async () => {
    const wrapper = getAppCheckbox();

    expect(wrapper.find<HTMLInputElement>('input').element.id).toBe('Test fieldId');
    expect(wrapper.find<HTMLLabelElement>('label').element.htmlFor).toBe('Test fieldId');
  });

  test('Проп tabindex передается в свойство tabindex чекбокса ', async () => {
    const wrapper = getAppCheckbox();

    expect(wrapper.find<HTMLInputElement>('input').element.tabIndex).toBe(1);
  });
});
