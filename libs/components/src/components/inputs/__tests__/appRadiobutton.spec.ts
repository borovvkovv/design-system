import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppRadiobutton from '@comp/components/inputs/AppRadiobutton.vue';

const getAppRadiobutton = (props?: Partial<InstanceType<typeof AppRadiobutton>['$props']>) =>
  mount(AppRadiobutton, {
    props: {
      modelValue: 'Test modelValue',
      value: 'Test value',
      groupName: 'Test groupName',
      label: 'Test label',
      isDisabled: false,
      isError: false,
      fieldId: 'Test fieldId',
      ...props,
    },
  });

describe('Компонент AppRadiobutton', () => {
  test('При клике на переключатель меняется значение checked на true', async () => {
    const wrapper = getAppRadiobutton();

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();

    await wrapper.find('label').trigger('click');

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeTruthy();
  });

  test('Отображается подпись переключателя', async () => {
    const wrapper = getAppRadiobutton();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если переключатель недоступен, то при нажатии на него значение checked не изменяется', async () => {
    const wrapper = getAppRadiobutton({ isDisabled: true });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();

    await wrapper.find('input').trigger('input');

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();
  });

  test('При клике на переключатель вызывается эмит update:modelValue со значением value', async () => {
    const wrapper = getAppRadiobutton();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual(['Test value']);
  });

  test('Если modelValue не равен значению текущего переключателя, то свойство checked переключателя = false', () => {
    const wrapper = getAppRadiobutton({ modelValue: 'Non test value' });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeFalsy();
  });

  test('Если modelValue равен значению текущего переключателя, то свойство checked переключателя = true', () => {
    const wrapper = getAppRadiobutton({ modelValue: 'Test value' });

    expect(wrapper.find<HTMLInputElement>('input').element.checked).toBeTruthy();
  });

  test('Проп fieldId используется для свзяи переключателя и подписи', async () => {
    const wrapper = getAppRadiobutton();

    expect(wrapper.find<HTMLInputElement>('input').element.id).toBe('Test fieldId');
  });
});
