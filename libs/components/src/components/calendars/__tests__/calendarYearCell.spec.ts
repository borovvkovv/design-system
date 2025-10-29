import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarYearCell from '@comp/components/calendars/CalendarYearCell.vue';

const getCalendarYearCell = (yearProps?: Partial<InstanceType<typeof CalendarYearCell>['$props']['year']>) =>
  mount(CalendarYearCell, {
    props: {
      year: {
        value: 5,
        active: false,
        inactive: false,
        ...yearProps,
      },
    },
  });

describe('Компонент CalendarYearCell', () => {
  test('Вызывается эмит при клике на компонент', async () => {
    const wrapper = getCalendarYearCell();

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
    const wrapper = getCalendarYearCell(monthProps);

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
    const wrapper = getCalendarYearCell(monthProps);

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
    const wrapper = getCalendarYearCell(monthProps);

    expect(wrapper.classes()).toContain(color);
  });
});
