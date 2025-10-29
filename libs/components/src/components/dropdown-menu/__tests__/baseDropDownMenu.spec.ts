import { h } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { MenuButton, MenuItems } from '@headlessui/vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import BaseDropDownMenu from '@comp/components/dropdown-menu/BaseDropDownMenu.vue';

let isOpened: boolean | undefined = undefined;
const textSlotClickHandler = vi.fn();
const linkSlotClickHandler = vi.fn();

const getBaseDropDownMenu = () =>
  mount(BaseDropDownMenu, {
    props: {
      menu: {
        items: [
          { type: 'text', text: 'text', click: textSlotClickHandler },
          { type: 'link', title: 'linkTitle', click: linkSlotClickHandler },
        ],
      },
      delayInMs: 500,
    },
    slots: {
      menuButton: (params) => {
        isOpened = params.isOpened;

        return h('div', { id: 'menuButton' });
      },
    },
    attachTo: document.body,
  });

describe('Компонент BaseDropDownMenu', () => {
  test('Отображается кнопка меню', () => {
    const wrapper = getBaseDropDownMenu();

    expect(wrapper.find('#menuButton').exists()).toBeTruthy();
  });

  test('При монтировании компонента меню не отображается', () => {
    const wrapper = getBaseDropDownMenu();

    expect(wrapper.text()).not.toContain('text');
    expect(wrapper.text()).not.toContain('linkTitle');
    expect(isOpened).toBeFalsy();
  });

  test('При наведении курсором на кнопку, открывается меню через 500 мс', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(400);

    expect(isOpened).toBeFalsy();

    await vi.advanceTimersByTime(100);

    expect(isOpened).toBeTruthy();
  });

  test('Если при наведении курсора на кнопку, нажать ЛКМ не дожидаясь открытия меню через 500 мс, открывается меню сразу', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(400);

    expect(isOpened).toBeFalsy();

    await wrapper.findComponent(MenuButton).trigger('click');

    expect(isOpened).toBeTruthy();
  });

  test('При выведении курсора с кнопки, закрывается меню через 500 мс', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeTruthy();

    await wrapper.findComponent(MenuButton).trigger('mouseleave');
    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeFalsy();
  });

  test('При наведении на кнопку, затем выведении курсора с кнопки на меню, меню не закроется', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeTruthy();

    await wrapper.findComponent(MenuButton).trigger('mouseleave');
    await wrapper.findComponent(MenuItems).trigger('mouseenter');
    await vi.advanceTimersByTime(1000);

    expect(isOpened).toBeTruthy();
  });

  test('При выведении курсора с меню, меню закроется через 500мс', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeTruthy();

    await wrapper.findComponent(MenuButton).trigger('mouseleave');
    await wrapper.findComponent(MenuItems).trigger('mouseenter');
    await wrapper.findComponent(MenuItems).trigger('mouseleave');
    await vi.advanceTimersByTime(400);

    expect(isOpened).toBeTruthy();

    await vi.advanceTimersByTime(100);

    expect(isOpened).toBeFalsy();
  });

  test('Меню отображает пункты, заданные через проп', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    expect(wrapper.text()).toContain('text');
    expect(wrapper.text()).toContain('linkTitle');

    await wrapper.findComponent(MenuButton).trigger('mouseleave');
    await vi.advanceTimersByTime(500);
    await vi.runAllTimers();

    expect(wrapper.text()).not.toContain('text');
    expect(wrapper.text()).not.toContain('linkTitle');
  });

  test('При нажатии ЛКМ на текстовый пункт меню, вызывается заданный через проп обработчик, и меню закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    await wrapper.find('span').trigger('click');

    expect(textSlotClickHandler).toHaveBeenCalledOnce();

    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeFalsy();
  });

  test('При нажатии ЛКМ на пункт меню - ссылку, вызывается заданный через проп обработчик, и меню закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseDropDownMenu();

    await wrapper.findComponent(MenuButton).trigger('mouseenter');
    await vi.advanceTimersByTime(500);

    await wrapper.findComponent(AppLink).trigger('click');

    expect(linkSlotClickHandler).toHaveBeenCalledOnce();

    await vi.advanceTimersByTime(500);

    expect(isOpened).toBeFalsy();
  });
});
