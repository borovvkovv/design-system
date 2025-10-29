import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppCalendar from '@comp/components/AppCalendar.vue';
import { CalendarType } from '@comp/components/calendars/utils/models';
import CalendarYear from '@comp/components/calendars/CalendarYear.vue';
import CalendarMonth from '@comp/components/calendars/CalendarMonth.vue';
import CalendarYears from '@comp/components/calendars/CalendarYears.vue';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';

const isInactiveRule = () => false;
const getAppCalendar = () =>
  mount(AppCalendar, {
    props: {
      calendarType: CalendarType.month,
      modelValue: new Date(2024, 0, 1),
      isInactiveRule,
    },
  });

describe('Компонент AppCalendar', () => {
  test('Компонент отрисовывает соответствующий пропу calendarType компонент календаря', async () => {
    const wrapper = getAppCalendar();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonth).exists()).toBeTruthy();

    await wrapper.setProps({ calendarType: CalendarType.year });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarYear).exists()).toBeTruthy();

    await wrapper.setProps({ calendarType: CalendarType.years });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarYears).exists()).toBeTruthy();
  });

  test('Правило неактивности передается без изменений', async () => {
    const wrapper = getAppCalendar();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonth).vm.isInactiveRule).toStrictEqual(isInactiveRule);
  });

  test('Дата передается без изменений', async () => {
    const wrapper = getAppCalendar();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(CalendarMonth).vm.modelValue).toStrictEqual(new Date(2024, 0, 1));
  });

  test('При клике на доступную дату, вызываются эмиты click:date и update:modelValue', async () => {
    vi.useFakeTimers();
    const wrapper = getAppCalendar();
    await vi.dynamicImportSettled();

    await wrapper.findAllComponents(CalendarDayCell)[9].trigger('click');

    expect(wrapper.emitted('click:date')?.[0]).toStrictEqual([new Date(2024, 0, 10)]);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([new Date(2024, 0, 10)]);
  });
});
