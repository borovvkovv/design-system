import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import IconCalendar from '@comp/components/icons/IconCalendar.vue';
import AppCalendarRange from '@comp/components/AppCalendarRange.vue';
import { CalendarType } from '@comp/components/calendars/utils/models';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';
import CalendarRangeSelect from '@comp/components/selects/CalendarRangeSelect.vue';
import CalendarMonthRange from '@comp/components/calendars/CalendarMonthRange.vue';

const scrollElement = document.createElement('DIV');

const getCalendarRangeSelect = (props?: Partial<InstanceType<typeof CalendarRangeSelect>['$props']>) => {
  const wrapper = mount(CalendarRangeSelect, {
    props: {
      size: Size.M,
      label: '',
      disabled: false,
      minWidth: 100,
      isNotPreventDefaultEnter: false,
      required: false,
      calendarType: CalendarType.month,
      isInactiveRule: () => false,
      showError: false,
      inactiveErrorText: '',
      minValue: new Date(2024, 0, 1),
      maxValue: new Date(2024, 1, 1),
      placeholderForMinValue: '',
      placeholderForMaxValue: '',
      'onUpdate:minValue': (newValue) => {
        wrapper.setProps({ minValue: newValue });
      },
      'onUpdate:maxValue': (newValue) => {
        wrapper.setProps({ maxValue: newValue });
      },
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент CalendarRangeSelect', () => {
  beforeEach(() => {
    vi.mock('@comp/utils/scroll', () => ({
      getScrollElementToProvider: () => scrollElement,
    }));

    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
      })),
    );
  });

  test('При нажатии на иконку-календарь выпадающий календарь открывается/закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeFalsy();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('При выборе минимальной даты вызывается эмит update:minValue', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconCalendar).trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('update:minValue')).toBeUndefined();
    wrapper.findComponent(CalendarMonthRange).findAllComponents(CalendarDayCell)[2]?.trigger('click');

    expect(wrapper.emitted('update:minValue')).toHaveLength(1);
    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 0, 3)]);

    wrapper.unmount();
  });

  test('При выборе минимальной даты вызывается эмит update:maxValue', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconCalendar).trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('update:maxValue')).toBeUndefined();

    await wrapper.findComponent(CalendarMonthRange).findAllComponents(CalendarDayCell)[2]?.trigger('click');
    await wrapper.findComponent(CalendarMonthRange).findAllComponents(CalendarDayCell)[3]?.trigger('click');

    expect(wrapper.emitted('update:maxValue')).toHaveLength(2);
    expect(wrapper.emitted('update:maxValue')?.[1]).toStrictEqual([new Date(2024, 0, 4)]);

    wrapper.unmount();
  });

  test('При нажатии за пределы выпадающего календаря и при нажатии на Escape выпадающий календарь закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    await wrapper.trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeFalsy();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    await wrapper.trigger('keydown', { key: 'Escape' });

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('Так как позиционирование выпадающего календаря - absolute, то при скролле страницы и при изменении размера вьюпорта, выпадающий календарь не закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    scrollElement.dispatchEvent(new Event('scroll'));

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    window.dispatchEvent(new Event('resize'));

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('При выбора даты в календаре, выпадающий список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarRangeSelect();

    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconCalendar).trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeTruthy();

    await wrapper.findComponent(CalendarMonthRange).findAllComponents(CalendarDayCell)[2]?.trigger('click');
    await wrapper.findComponent(CalendarMonthRange).findAllComponents(CalendarDayCell)[3]?.trigger('click');

    expect(wrapper.findComponent(AppCalendarRange).exists()).toBeFalsy();

    wrapper.unmount();
  });
});
