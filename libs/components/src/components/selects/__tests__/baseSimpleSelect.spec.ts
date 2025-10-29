import { describe, expect, test, vi } from 'vitest';
import { Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import LinesSkeleton from '@comp/components/skeletons/LinesSkeleton.vue';
import BaseSimpleSelect from '@comp/components/selects/BaseSimpleSelect.vue';
import IconArrowUpTriangle from '@comp/components/icons/IconArrowUpTriangle.vue';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';

const scrollElement = document.createElement('DIV');
vi.mock('@comp/utils/scroll', () => ({
  getScrollElementToProvider: () => scrollElement,
}));

const getBaseSimpleSelect = (props?: Partial<InstanceType<typeof BaseSimpleSelect>['$props']>) => {
  const wrapper = mount(BaseSimpleSelect, {
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
      query: '',
      isEmpty: false,
      isFullWidthDropDown: false,
      ...props,
    },
    slots: {
      default: '<div id="slot" />',
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

describe('Компонент BaseSimpleSelect', () => {
  test('Меняется значок при открытии/закрытии выпадающего списка', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeTruthy();
    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeFalsy();
    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('При вводе символа в инпут выпадающий список открывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    expect(wrapper.find('#slot').exists()).toBeFalsy();
    wrapper.find('input').setValue('test');
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('При нажатии на иконку-стрелку выпадающий список открывается/закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();
    await vi.dynamicImportSettled();

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    await wrapper.findComponent(IconArrowDownTriangle).trigger('click');

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconArrowUpTriangle).trigger('click');

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('После изменения текста в инпуте вызывается эмит change:query с новым текстом', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    expect(wrapper.emitted('change:query')).toBeUndefined();
    wrapper.find('input').setValue('test');

    expect(wrapper.emitted('change:query')).toHaveLength(1);
    expect(wrapper.emitted('change:query')?.[0]).toStrictEqual(['test']);

    wrapper.unmount();
  });

  test('При вводе символа в инпут вызывается эмит update:query с новым текстом', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    expect(wrapper.emitted('update:query')).toBeUndefined();
    wrapper.find('input').setValue('test');

    expect(wrapper.emitted('update:query')).toHaveLength(1);
    expect(wrapper.emitted('update:query')?.[0]).toStrictEqual(['test']);

    wrapper.unmount();
  });

  test('Если при открытии выпадающего списка еще идет загрузка данных, то отображается соответствующая заглушка', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect({ isLoading: true });

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(LinesSkeleton).exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('Если при открытии выпадающего списка вышла ошибка загрузки данных, то отображается соответствующая заглушка', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect({ isErrorLoading: true });

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.text()).toContain('Что-то пошло не так...');
    expect(wrapper.text()).toContain('Попробуйте повторить попытку позже');

    wrapper.unmount();
  });

  test('При нажатии за пределы выпадающего списка и при нажатии на Escape выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    await wrapper.trigger('click');

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    await wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('Так как позиционирование выпадающего списка - absolute, то при скролле стоаницы и при изменении размера вьюпорта, выпадающий список не закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    scrollElement.dispatchEvent(new Event('scroll'));

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    window.dispatchEvent(new Event('resize'));

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('Если при открытии выпадающего списка загруженные данные пусты, то отображается соответствующая заглушка', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect({ isEmpty: true });

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.text()).toContain('Ничего не найдено');
    expect(wrapper.text()).toContain('Попробуйте изменить запрос');

    wrapper.unmount();
  });

  test('Если при открытии выпадающего списка данные загрузились, то они отображаются', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('При вызове expose-метода setDropDownVisibility выпаюащий список открывается/закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleSelect();

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeTruthy();

    wrapper.vm.setDropDownVisibility(false);
    await vi.runAllTimersAsync();

    expect(wrapper.find('#slot').exists()).toBeFalsy();

    wrapper.unmount();
  });
});
