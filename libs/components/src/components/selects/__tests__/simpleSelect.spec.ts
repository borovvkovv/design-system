import { describe, expect, test, vi } from 'vitest';
import { Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import type { SelectKeyType } from '@comp/components/selects/utils/models';
import SimpleSelect from '@comp/components/selects/SimpleSelect.vue';
import BaseSimpleSelect from '@comp/components/selects/BaseSimpleSelect.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const getSimpleSelect = () => {
  const wrapper = mount(SimpleSelect<SelectKeyType>, {
    props: {
      size: Size.M,
      label: '',
      disabled: false,
      minWidth: 100,
      isNotPreventDefaultEnter: false,
      required: true,
      placeholder: '',
      isLoading: false,
      isErrorLoading: false,
      options: [
        { title: 'Title1', value: 'Value1' },
        { title: 'Title2', value: 'Value2' },
        { title: 'Title3', value: 'Value3' },
      ],
      modelValue: undefined,
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент SimpleSelect', () => {
  test('В выпадающем списке отрисовываются элементы', async () => {
    vi.useFakeTimers();
    mockResizeObserver();
    const wrapper = getSimpleSelect();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('li')?.[0].text()).toBe('Title1');
    expect(wrapper.findAll('li')?.[1].text()).toBe('Title2');
    expect(wrapper.findAll('li')?.[2].text()).toBe('Title3');

    wrapper.unmount();
  });

  test('При выделении элемента в выпадающем списке, в инпуте отображается заголовок элемента', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    expect(wrapper.find('input').element.value).toBe('');

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();
    await wrapper.findAll('li')?.[1].trigger('click');

    expect(wrapper.find('input').element.value).toBe('Title2');

    wrapper.unmount();
  });

  test('При выделении элемента в выпадающем списке, вызывается эмит update:modelValue с данным элементом', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();
    await wrapper.findAll('li')?.[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([{ title: 'Title2', value: 'Value2' }]);

    wrapper.unmount();
  });

  test('После выделения элемента в выпадающем списке, выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('li')).toHaveLength(3);

    await wrapper.findAll('li')?.[1].trigger('click');

    expect(wrapper.findAll('li')).toHaveLength(0);

    wrapper.unmount();
  });

  test('Если ввести в инпут заголовок одного из элементов списка, то вызывается эмит update:modelValue с данным элементом', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').setValue('title2');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([{ title: 'Title2', value: 'Value2' }]);

    wrapper.unmount();
  });

  test('Если ввести в инпут текст, не подходящий ни к одному заголовоку элементов списка, то вызывается эмит update:modelValue с undefined', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.find('input').setValue('different');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([undefined]);

    wrapper.unmount();
  });

  test('Если после вводе текста не подходит ни один элемент списка, то отображается соответствующая заглушка', async () => {
    vi.useFakeTimers();
    const wrapper = getSimpleSelect();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    await wrapper.find('input').setValue('different');

    expect(wrapper.text()).toContain('Ничего не найдено');
    expect(wrapper.text()).toContain('Попробуйте изменить запрос');

    wrapper.unmount();
  });
});
