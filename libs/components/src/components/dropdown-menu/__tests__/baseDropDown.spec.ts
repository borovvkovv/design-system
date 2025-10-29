import { h, nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseDropDown from '@comp/components/dropdown-menu/BaseDropDown.vue';

let toggleDropDown: (() => boolean) | undefined = undefined;
let registerCallSection: (() => void) | undefined = undefined;
let unregisterCallSection: (() => void) | undefined = undefined;
let isDropDownOpened: boolean | undefined = undefined;
let setDropDownVisibility: ((isVisible: boolean) => void) | undefined = undefined;

const getBaseDropDown = () =>
  mount(BaseDropDown, {
    slots: {
      input: (params) => {
        toggleDropDown = params.toggleDropDown;

        return h('div', { id: 'input' });
      },
      dropDown: (params) => {
        registerCallSection = params.registerCallSection;
        unregisterCallSection = params.unregisterCallSection;
        isDropDownOpened = params.isDropDownOpened;
        setDropDownVisibility = params.setDropDownVisibility;

        return h('div', { id: 'dropDown' });
      },
    },
    attachTo: document.body,
  });

describe('Компонент BaseDropDown', () => {
  test('Отображаются слоты input и dropDown', () => {
    const wrapper = getBaseDropDown();

    expect(wrapper.find('#input').exists()).toBeTruthy();
    expect(wrapper.find('#dropDown').exists()).toBeTruthy();
  });

  test('При монтировании компонента, состояние выпадающего списка = закрыто', () => {
    const wrapper = getBaseDropDown();

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('Состояние выпадающего списка меняется при выполнении функции toggleDropDown слота input', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('Состояние выпадающего списка меняется при выполнении функции setDropDownVisibility слота dropDown', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();

    setDropDownVisibility?.(true);

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    setDropDownVisibility?.(true);

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    setDropDownVisibility?.(false);

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('Состояние выпадающего списка меняется при выполнении exposed-функции setDropDownVisibility', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();

    wrapper.vm.setDropDownVisibility(true);

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.vm.setDropDownVisibility(true);

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.vm.setDropDownVisibility(false);

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('При изменении состояния выпадающего списка меняется признак isDropDownOpened слота dropDown', async () => {
    vi.useFakeTimers();
    getBaseDropDown();

    expect(isDropDownOpened).toBeFalsy();

    toggleDropDown?.();
    await nextTick();

    expect(isDropDownOpened).toBeTruthy();

    toggleDropDown?.();
    await nextTick();

    expect(isDropDownOpened).toBeFalsy();
  });

  test('При изменении состояния выпадающего списка, вызывается эмит on:open', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();

    toggleDropDown?.();

    expect(wrapper.emitted('on:open')).toHaveLength(1);
    expect(wrapper.emitted('on:open')?.[0]).toStrictEqual([true]);

    toggleDropDown?.();

    expect(wrapper.emitted('on:open')).toHaveLength(2);
    expect(wrapper.emitted('on:open')?.[1]).toStrictEqual([false]);

    setDropDownVisibility?.(true);

    expect(wrapper.emitted('on:open')).toHaveLength(3);
    expect(wrapper.emitted('on:open')?.[2]).toStrictEqual([true]);

    setDropDownVisibility?.(false);

    expect(wrapper.emitted('on:open')).toHaveLength(4);
    expect(wrapper.emitted('on:open')?.[3]).toStrictEqual([false]);

    wrapper.vm.setDropDownVisibility(true);

    expect(wrapper.emitted('on:open')).toHaveLength(5);
    expect(wrapper.emitted('on:open')?.[4]).toStrictEqual([true]);

    wrapper.vm.setDropDownVisibility(false);

    expect(wrapper.emitted('on:open')).toHaveLength(6);
    expect(wrapper.emitted('on:open')?.[5]).toStrictEqual([false]);
  });

  test('Перед изменением состояния отображения выпадающего списка (isDropDownVisible), вызывается эмит before:visible', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();

    toggleDropDown?.();

    await nextTick();
    await vi.runAllTimers();

    expect(wrapper.emitted('before:visible')).toHaveLength(1);
    expect(wrapper.vm.isDropDownVisible).toBeTruthy();
  });

  test('При нажатии на escape состояние выпадающего списка изменяется на закрыто', () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();
    registerCallSection?.();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('При нажатии ЛКМ за пределами выпадающего списка, состояние выпадающего списка изменяется на закрыто', () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();
    registerCallSection?.();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.trigger('click');

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();
  });

  test('При выполнении функции unregisterCallSection, события нажатия ЛКМ и кнопки escape удаляются', () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDown();
    registerCallSection?.();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    wrapper.trigger('click');

    expect(wrapper.vm.isDropDownOpened).toBeFalsy();

    toggleDropDown?.();

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();

    unregisterCallSection?.();

    wrapper.trigger('keydown', { key: 'Escape' });
    wrapper.trigger('click');

    expect(wrapper.vm.isDropDownOpened).toBeTruthy();
  });
});
