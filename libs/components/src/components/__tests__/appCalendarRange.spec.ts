import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppCalendarRange from '@comp/components/AppCalendarRange.vue';
import { CalendarType } from '@comp/components/calendars/utils/models';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';
import CalendarYearRange from '@comp/components/calendars/CalendarYearRange.vue';
import CalendarMonthRange from '@comp/components/calendars/CalendarMonthRange.vue';
import CalendarYearsRange from '@comp/components/calendars/CalendarYearsRange.vue';

const isInactiveRule = () => false;
const getAppCalendarRange = (props?: Partial<InstanceType<typeof AppCalendarRange>['$props']>) => {
  const wrapper = mount(AppCalendarRange, {
    props: {
      calendarType: CalendarType.month,
      minValue: undefined,
      maxValue: undefined,
      isInactiveRule,
      ...props,
      'onUpdate:minValue': (newDate) => {
        wrapper.setProps({ minValue: newDate });
      },
      'onUpdate:maxValue': (newDate) => {
        wrapper.setProps({ maxValue: newDate });
      },
    },
  });

  return wrapper;
};

describe('Компонент AppCalendarRange', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('Компонент отрисовывает соответствующий пропу calendarType компонент календаря', async () => {
    const wrapper = getAppCalendarRange();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonthRange).exists()).toBeTruthy();

    await wrapper.setProps({ calendarType: CalendarType.year });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarYearRange).exists()).toBeTruthy();

    await wrapper.setProps({ calendarType: CalendarType.years });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarYearsRange).exists()).toBeTruthy();
  });

  test('Правило неактивности передается без изменений', async () => {
    const wrapper = getAppCalendarRange();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonthRange).vm.isInactiveRule).toStrictEqual(isInactiveRule);
  });

  test('Дата передается без изменений', async () => {
    const wrapper = getAppCalendarRange({ minValue: new Date(2024, 0, 1), maxValue: new Date(2024, 1, 1) });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonthRange).vm.minValue).toStrictEqual(new Date(2024, 0, 1));
    expect(wrapper.findComponent(CalendarMonthRange).vm.maxValue).toStrictEqual(new Date(2024, 1, 1));
  });

  test('При выборе диапазона, вызываются эмиты set:dateRange и update:minValue, update:maxValue', async () => {
    vi.useFakeTimers();
    const wrapper = getAppCalendarRange();
    await vi.dynamicImportSettled();
    const january2024 = wrapper.findAll('[data-test-month]')[0];
    const february2024 = wrapper.findAll('[data-test-month]')[1];

    await january2024.findAllComponents(CalendarDayCell)[8].trigger('click');
    await vi.runAllTimersAsync();

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 0, 9)]);
    expect(wrapper.emitted('update:maxValue')).toBeUndefined();
    expect(wrapper.emitted('set:dateRange')).toBeUndefined();

    await february2024.findAllComponents(CalendarDayCell)[11].trigger('click');
    await vi.runAllTimersAsync();

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 1, 9)]);
    expect(wrapper.emitted('set:dateRange')).toHaveLength(1);
  });
});
