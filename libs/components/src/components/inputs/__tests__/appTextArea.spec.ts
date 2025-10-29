import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconMarker from '@comp/components/icons/IconMarker.vue';
import AppTextArea from '@comp/components/inputs/AppTextArea.vue';

const getAppTextArea = (props?: Partial<InstanceType<typeof AppTextArea>['$props']>) => {
  const wrapper = mount(AppTextArea, {
    props: {
      modelValue: '',
      placeholder: 'Test placeholder',
      isDisabled: false,
      isError: false,
      errorList: ['Test error1', 'Test error2', 'Test error3'],
      rows: 3,
      label: 'Test label',
      required: false,
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      ...props,
    },
  });

  return wrapper;
};

describe('Компонент AppTextArea', () => {
  test('Если задана подпись через проп, то она отображается', async () => {
    const wrapper = getAppTextArea();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если текстовая область обязательна к заполнению, то к подписи добавляется красная метка', async () => {
    const wrapper = getAppTextArea({ required: true });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMarker).exists()).toBeTruthy();
  });

  test('Если задан список ошибок, то он отображается', async () => {
    const wrapper = getAppTextArea();

    expect(wrapper.text()).toContain('Test error1');
    expect(wrapper.text()).toContain('Test error2');
    expect(wrapper.text()).toContain('Test error3');
  });

  test('Через проп задается высота видимой текстовой области', async () => {
    const wrapper = getAppTextArea();

    expect(wrapper.find('textarea').element.rows).toBe(3);
  });

  test('При вводе в область текста вызывается эмит update:modelValue', async () => {
    const wrapper = getAppTextArea();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    wrapper.find('textarea').setValue('test');
    await wrapper.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual(['test']);
  });
});
