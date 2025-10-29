import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelectDropDown from '@comp/components/selects/BaseSelectDropDown.vue';

const scrollElement = document.createElement('DIV');
vi.mock('@comp/utils/scroll', () => ({
  getScrollElementToProvider: () => scrollElement,
}));

const getBaseSelectDropDown = (props?: Partial<InstanceType<typeof BaseSelectDropDown>['$props']>) =>
  mount(BaseSelectDropDown, {
    props,
    slots: {
      input: '<div />',
      dropDown: ({ registerCallSection }) => {
        registerCallSection();

        return '<div />';
      },
    },
  });

describe('Компонент BaseSelectDropDown', () => {
  test('При монтировании компонента expose-свойство isDropDownShown=false', () => {
    const wrapper = getBaseSelectDropDown();

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });

  test('Если позиционирование выпадающего списка - fixed и вызван метод registerCallSection из слота dropDown, то при изменении размера страницы он закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSelectDropDown({ isDropDownFixed: true });

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    window.dispatchEvent(new Event('resize'));

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });

  test('Если позиционирование выпадающего списка - fixed и вызван метод registerCallSection из слота dropDown, то при скролле страницы выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseSelectDropDown({ isDropDownFixed: true });

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    scrollElement.dispatchEvent(new Event('scroll'));

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });

  test('Если позиционирование выпадающего списка - fixed но метод registerCallSection из слота dropDown не вызван, то при изменении размера страницы он закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseSelectDropDown, {
      props: { isDropDownFixed: true },
      slots: {
        input: '<div />',
        dropDown: ({ registerCallSection, unregisterCallSection }) => {
          registerCallSection();
          unregisterCallSection();

          return '<div />';
        },
      },
    });

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    window.dispatchEvent(new Event('resize'));

    expect(wrapper.vm.isDropDownShown).toBeTruthy();
  });

  test('Если позиционирование выпадающего списка - fixed но метод registerCallSection из слота dropDown не вызван, то при скролле страницы выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = mount(BaseSelectDropDown, {
      props: { isDropDownFixed: true },
      slots: {
        input: '<div />',
        dropDown: ({ registerCallSection, unregisterCallSection }) => {
          registerCallSection();
          unregisterCallSection();
          return '<div />';
        },
      },
    });

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    scrollElement.dispatchEvent(new Event('scroll'));

    expect(wrapper.vm.isDropDownShown).toBeTruthy();
  });

  test('При выполнении expose-метода setDropDownVisibility меняется expose-свойство isDropDownShown', () => {
    vi.useFakeTimers();
    const wrapper = getBaseSelectDropDown();

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    wrapper.vm.setDropDownVisibility(false);

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });
});
