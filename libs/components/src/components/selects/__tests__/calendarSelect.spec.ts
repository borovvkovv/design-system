import { describe, expect, test, vi } from 'vitest';
import { Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import AppCalendar from '@comp/components/AppCalendar.vue';
import IconCalendar from '@comp/components/icons/IconCalendar.vue';
import { CalendarType } from '@comp/components/calendars/utils/models';
import CalendarSelect from '@comp/components/selects/CalendarSelect.vue';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';

const scrollElement = document.createElement('DIV');
vi.mock('@comp/utils/scroll', () => ({
  getScrollElementToProvider: () => scrollElement,
}));

const getCalendarSelect = (props?: Partial<InstanceType<typeof CalendarSelect>['$props']>) =>
  mount(CalendarSelect, {
    props: {
      size: Size.M,
      label: '',
      disabled: false,
      minWidth: 100,
      isNotPreventDefaultEnter: false,
      required: true,
      placeholder: '',
      calendarType: CalendarType.month,
      isInactiveRule: () => false,
      showError: false,
      inactiveErrorText: '',
      modelValue: new Date(2024, 0, 1),
      ...props,
    },
    attachTo: document.body,
  });

describe('Компонент CalendarSelect', () => {
  test('При нажатии на иконку-календарь выпадающий календарь открывается/закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarSelect();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(AppCalendar).exists()).toBeFalsy();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('При вводе символа в инпут вызывается эмит update:modelValue с новой датой', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarSelect();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    wrapper.find('input').setValue('02.03.2024');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([new Date(2024, 2, 2)]);

    wrapper.unmount();
  });

  test('При нажатии за пределы выпадающего календаря и при нажатии на Escape выпадающий календарь закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarSelect();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    await wrapper.trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeFalsy();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    await wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.findComponent(AppCalendar).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('Так как позиционирование выпадающего календаря - absolute, то при скролле страницы и при изменении размера вьюпорта, выпадающий календарь не закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarSelect();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    scrollElement.dispatchEvent(new Event('scroll'));

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    window.dispatchEvent(new Event('resize'));

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('При выбора даты в календаре, выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarSelect();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendar).exists()).toBeTruthy();

    await vi.dynamicImportSettled();
    wrapper.findAllComponents(CalendarDayCell)[2]?.trigger('click');
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(AppCalendar).exists()).toBeFalsy();

    wrapper.unmount();
  });
});
