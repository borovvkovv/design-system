import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarMonthCell from '@comp/components/calendars/CalendarMonthCell.vue';

const getCalendarMonthCell = (monthProps?: Partial<InstanceType<typeof CalendarMonthCell>['$props']['month']>) =>
  mount(CalendarMonthCell, {
    props: {
      month: {
        index: 5,
        name: 'Июнь',
        value: 5,
        active: false,
        inactive: false,
        ...monthProps,
      },
    },
  });

describe('Компонент CalendarMonthCell', () => {
  test('Вызывается эмит при клике на компонент', async () => {
    const wrapper = getCalendarMonthCell();

    await wrapper.trigger('click');

    expect(wrapper.emitted('click:date')).toHaveLength(1);
  });

  test.each([
    [
      {
        active: false,
        inactive: false,
      },
      'text-black-1',
    ],
    [
      {
        active: true,
        inactive: false,
      },
      'text-white',
    ],
    [
      {
        active: false,
        inactive: true,
      },
      'text-grey-2',
    ],
  ])('Если состояния ячейки = %s, то цвет текста = %s', (monthProps, color) => {
    const wrapper = getCalendarMonthCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });

  test.each([
    [
      {
        active: false,
        inactive: false,
      },
      'cursor-pointer',
    ],
    [
      {
        active: true,
        inactive: false,
      },
      'cursor-default',
    ],
    [
      {
        active: false,
        inactive: true,
      },
      'cursor-default',
    ],
    [
      {
        active: true,
        inactive: false,
        isInRange: false,
      },
      'cursor-pointer',
    ],
  ])('Если состояния ячейки = %s, то тип курсора = %s', (monthProps, color) => {
    const wrapper = getCalendarMonthCell(monthProps);

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
    const wrapper = getCalendarMonthCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });
});
