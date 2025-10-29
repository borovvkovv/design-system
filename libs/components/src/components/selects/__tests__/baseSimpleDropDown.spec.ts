import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSimpleDropDown from '@comp/components/selects/BaseSimpleDropDown.vue';

const getBaseSimpleDropDown = () =>
  mount(BaseSimpleDropDown, {
    slots: { title: 'Test title', dropDown: 'Test dropDown', border: 'Test border' },
  });

describe('Компонент BaseSimpleDropDown', () => {
  test('При монтировании компонента expose-свойство isDropDownShown=false', () => {
    const wrapper = getBaseSimpleDropDown();

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });

  test('При выполнении expose-метода setDropDownVisibility меняется expose-свойство isDropDownShown', () => {
    vi.useFakeTimers();
    const wrapper = getBaseSimpleDropDown();

    expect(wrapper.vm.isDropDownShown).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);

    expect(wrapper.vm.isDropDownShown).toBeTruthy();

    wrapper.vm.setDropDownVisibility(false);

    expect(wrapper.vm.isDropDownShown).toBeFalsy();
  });
});
