import { defineComponent, h, type Component } from 'vue';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import BaseCalendarPopup from '@comp/components/popup/BaseCalendarPopup.vue';

let slotMethods = {
  showPopup: () => {},
  closePopup: () => {},
};

const getBaseCalendar = (stubs?: Record<string, Component>) =>
  mount(BaseCalendar, {
    props: {
      popupText: 'Test popup',
      isIconArrowRightDisabled: false,
      isIconArrowLeftDisabled: false,
    },
    global: {
      stubs,
    },
    slots: {
      default: (params) => {
        slotMethods = params;

        return '<div />';
      },
    },
  });

describe('Компонент BaseCalendar', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('Левая и правая стрелки будут недоступны, если заданы соответствующие пропсы', async () => {
    const wrapper = getBaseCalendar();

    expect(wrapper.findAllComponents(AppLink)[0].props('isDisabled')).toBeFalsy();
    expect(wrapper.findAllComponents(AppLink)[1].props('isDisabled')).toBeFalsy();

    await wrapper.setProps({
      isIconArrowLeftDisabled: true,
      isIconArrowRightDisabled: true,
    });

    expect(wrapper.findAllComponents(AppLink)[0].props('isDisabled')).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props('isDisabled')).toBeTruthy();
  });

  test('Компонент передает проп popupText в компонент BaseCalendarPopup', () => {
    const wrapper = getBaseCalendar();

    expect(wrapper.findComponent(BaseCalendarPopup).props('text')).toBe('Test popup');
  });

  test('Вызываются эмиты при клике на стрелки', async () => {
    const wrapper = getBaseCalendar();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.emitted('onIconArrowLeftClick')).toHaveLength(1);

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.emitted('onIconArrowRightClick')).toHaveLength(1);
  });

  test('Вызываются эмиты при клике на стрелки', async () => {
    vi.useFakeTimers();

    const wrapper = getBaseCalendar({
      BaseCalendarPopup: defineComponent({
        setup: () => ({
          showPopup: vi.fn(),
          closePopup: vi.fn(),
        }),
        render: () => h('div'),
      }),
    });
    await vi.runAllTicks();
    await vi.runAllTimers();

    expect(wrapper.findComponent(BaseCalendarPopup).vm.showPopup).not.toHaveBeenCalledOnce();
    slotMethods.showPopup();
    expect(wrapper.findComponent(BaseCalendarPopup).vm.showPopup).toHaveBeenCalledOnce();

    expect(wrapper.findComponent(BaseCalendarPopup).vm.closePopup).not.toHaveBeenCalledOnce();
    slotMethods.closePopup();
    expect(wrapper.findComponent(BaseCalendarPopup).vm.closePopup).toHaveBeenCalledOnce();
  });
});
