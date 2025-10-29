import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';

const getCalendarDayCell = (dayProps?: Partial<InstanceType<typeof CalendarDayCell>['$props']['day']>) =>
  mount(CalendarDayCell, {
    props: {
      day: {
        value: 5,
        active: false,
        inactive: false,
        prevMonth: false,
        nextMonth: false,
        weekend: false,
        ...dayProps,
      },
    },
  });

describe('Компонент CalendarDayCell', () => {
  test('Вызывается эмит при клике на компонент', async () => {
    const wrapper = getCalendarDayCell();

    await wrapper.trigger('click');

    expect(wrapper.emitted('click:date')).toHaveLength(1);
  });

  test.each([
    [
      {
        active: false,
        inactive: false,
        weekend: false,
      },
      'text-black-1',
    ],
    [
      {
        active: true,
        inactive: false,
        weekend: false,
      },
      'text-white',
    ],
    [
      {
        active: false,
        inactive: true,
        weekend: false,
      },
      'text-grey-2',
    ],
    [
      {
        active: false,
        inactive: false,
        weekend: true,
      },
      'text-red-3',
    ],
  ])('Если состояния ячейки = %s, то цвет текста = %s', (monthProps, color) => {
    const wrapper = getCalendarDayCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });

  test('Число месяца отрисовывается, если пропсы prevMonth и nextMonth = false', async () => {
    const wrapper = getCalendarDayCell();

    expect(wrapper.text()).toBe('5');

    await wrapper.setProps({
      day: {
        value: 5,
        prevMonth: true,
        nextMonth: false,
      },
    });

    expect(wrapper.text()).toBe('');

    await wrapper.setProps({
      day: {
        value: 5,
        prevMonth: false,
        nextMonth: true,
      },
    });

    expect(wrapper.text()).toBe('');
  });

  test.each([
    [{}, 'cursor-pointer'],
    [
      {
        active: true,
      },
      'cursor-default',
    ],
    [
      {
        inactive: true,
      },
      'cursor-default',
    ],
    [
      {
        prevMonth: true,
      },
      'cursor-default',
    ],
    [
      {
        nextMonth: true,
      },
      'cursor-default',
    ],
    [
      {
        active: true,
        isInRange: false,
      },
      'cursor-pointer',
    ],
  ])('Если состояния ячейки = %s, то тип курсора = %s', (monthProps, color) => {
    const wrapper = getCalendarDayCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });

  test.each([
    [
      {
        active: true,
        isInRange: undefined,
      },
      'bg-blue-2',
    ],
    [
      {
        active: false,
        isInRange: true,
      },
      'bg-grey-5',
    ],
  ])('Если состояния ячейки = %s, то цвет фона = %s', (monthProps, color) => {
    const wrapper = getCalendarDayCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });
});
