import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';
import CalendarMonthRange from '@comp/components/calendars/CalendarMonthRange.vue';

const getCalendarMonthRange = (props?: Partial<InstanceType<typeof CalendarMonthRange>['$props']>) => {
  const wrapper = mount(CalendarMonthRange, {
    props: {
      minValue: undefined,
      maxValue: undefined,
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

describe('Компонент CalendarMonthRange', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 10, 1));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('При незаполненных датах отрисовываются текущий (Ноябрь 2024) и следующий месяцы', async () => {
    const wrapper = getCalendarMonthRange();

    expect(wrapper.text()).toContain('Ноябрь 2024');
    expect(wrapper.text()).toContain('Декабрь 2024');
  });

  test('При заполненных датах, отрисовываются два соседних месяца. Причем второй месяц всегда содержит конечную дату из выбранного диапазона', () => {
    const wrapper = getCalendarMonthRange({ minValue: new Date(2020, 0, 1), maxValue: new Date(2025, 0, 9) });

    expect(wrapper.text()).toContain('Декабрь 2024');
    expect(wrapper.text()).toContain('Январь 2025');
  });

  test('Отображаются сокращенным имена дней недели', () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.text()).toContain('пн');
    expect(november2024.text()).toContain('вт');
    expect(november2024.text()).toContain('ср');
    expect(november2024.text()).toContain('чт');
    expect(november2024.text()).toContain('пт');
    expect(november2024.text()).toContain('сб');
    expect(november2024.text()).toContain('вс');

    expect(december2024.text()).toContain('пн');
    expect(december2024.text()).toContain('вт');
    expect(december2024.text()).toContain('ср');
    expect(december2024.text()).toContain('чт');
    expect(december2024.text()).toContain('пт');
    expect(december2024.text()).toContain('сб');
    expect(december2024.text()).toContain('вс');
  });

  test('Дни, находящиеся вне месяца, не отображаются', () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.findAllComponents(CalendarDayCell)[0].props().day.prevMonth).toBeTruthy(); //28
    expect(november2024.findAllComponents(CalendarDayCell)[1].props().day.prevMonth).toBeTruthy(); //29
    expect(november2024.findAllComponents(CalendarDayCell)[2].props().day.prevMonth).toBeTruthy(); //30
    expect(november2024.findAllComponents(CalendarDayCell)[3].props().day.prevMonth).toBeTruthy(); //31
    expect(november2024.findAllComponents(CalendarDayCell)[34].props().day.nextMonth).toBeTruthy(); //1

    expect(december2024.findAllComponents(CalendarDayCell)[0].props().day.prevMonth).toBeTruthy(); //25
    expect(december2024.findAllComponents(CalendarDayCell)[1].props().day.prevMonth).toBeTruthy(); //26
    expect(december2024.findAllComponents(CalendarDayCell)[2].props().day.prevMonth).toBeTruthy(); //27
    expect(december2024.findAllComponents(CalendarDayCell)[3].props().day.prevMonth).toBeTruthy(); //28
    expect(december2024.findAllComponents(CalendarDayCell)[4].props().day.prevMonth).toBeTruthy(); //29
    expect(december2024.findAllComponents(CalendarDayCell)[5].props().day.prevMonth).toBeTruthy(); //30
    expect(december2024.findAllComponents(CalendarDayCell)[37].props().day.nextMonth).toBeTruthy(); //1
    expect(december2024.findAllComponents(CalendarDayCell)[38].props().day.nextMonth).toBeTruthy(); //2
    expect(december2024.findAllComponents(CalendarDayCell)[39].props().day.nextMonth).toBeTruthy(); //3
    expect(december2024.findAllComponents(CalendarDayCell)[40].props().day.nextMonth).toBeTruthy(); //4
    expect(december2024.findAllComponents(CalendarDayCell)[41].props().day.nextMonth).toBeTruthy(); //5
  });

  test('Выходные дни выделены красным цветом', () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.findAllComponents(CalendarDayCell)[5].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[6].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[12].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[13].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[19].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[20].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[26].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[27].props().day.weekend).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[33].props().day.weekend).toBeTruthy();

    expect(december2024.findAllComponents(CalendarDayCell)[6].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[12].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[13].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[19].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[20].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[26].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[27].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[33].props().day.weekend).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[34].props().day.weekend).toBeTruthy();
  });

  test('Пятый день месяца неактивен, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarMonthRange({ isInactiveRule: isInactiveRules.fifthDayNotAllowed });
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.findAllComponents(CalendarDayCell)[8].props().day.inactive).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[10].props().day.inactive).toBeTruthy();
  });

  test('При незаполненных датах диапазон не отрисовывается', async () => {
    const wrapper = getCalendarMonthRange();

    expect(
      wrapper.findAllComponents(CalendarDayCell).every((dayCell) => {
        const dayCellProps = dayCell.props().day;

        return ('isInRange' in dayCellProps && !dayCellProps.isInRange) || !dayCellProps.active;
      }),
    ).toBeTruthy();
  });

  test('При заполненных датах диапазон отрисовывается', async () => {
    const wrapper = getCalendarMonthRange({ minValue: new Date(2024, 10, 28), maxValue: new Date(2024, 11, 3) });
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];
    await vi.runAllTimers();

    expect(november2024.findAllComponents(CalendarDayCell)[31].props().day.active).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[32].props().day.isInRange).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[33].props().day.isInRange).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[6].props().day.isInRange).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[7].props().day.isInRange).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[8].props().day.active).toBeTruthy();
  });

  test('При клике на неактивную ячейку первого месяца появляется попап', async () => {
    const wrapper = getCalendarMonthRange({ isInactiveRule: isInactiveRules.fifthDayNotAllowed });
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Дата недоступна для выбора');

    await november2024.findAllComponents(CalendarDayCell)[8].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Дата недоступна для выбора');
  });

  test('При клике на неактивную ячейку второго месяца появляется попап', async () => {
    const wrapper = getCalendarMonthRange({ isInactiveRule: isInactiveRules.fifthDayNotAllowed });
    const december2024 = wrapper.findAll('[data-test-month]')[1];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Дата недоступна для выбора');

    await december2024.findAllComponents(CalendarDayCell)[10].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Дата недоступна для выбора');
  });

  test('При выборе диапазона, вызываются эмиты set:dateRange и update:minValue, update:maxValue', async () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];
    await vi.runAllTimers();

    await november2024.findAllComponents(CalendarDayCell)[33].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 10, 30)]);

    await december2024.findAllComponents(CalendarDayCell)[7].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 11, 2)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 11, 2)]);
  });

  test('Если выбрать вторую дату меньшей первой, то выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    await vi.runAllTimers();

    await november2024.findAllComponents(CalendarDayCell)[33].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 10, 30)]);

    await november2024.findAllComponents(CalendarDayCell)[32].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2024, 10, 29)]);
  });

  test('Для выбора нового диапазона, необходимо выбрать любую дату, выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    await vi.runAllTimers();

    await november2024.findAllComponents(CalendarDayCell)[31].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 10, 28)]);

    await november2024.findAllComponents(CalendarDayCell)[33].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 10, 30)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 10, 30)]);

    await november2024.findAllComponents(CalendarDayCell)[7].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2024, 10, 4)]);
    expect(wrapper.emitted('update:maxValue')?.[1]).toStrictEqual([undefined]);

    await november2024.findAllComponents(CalendarDayCell)[20].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[2]).toStrictEqual([new Date(2024, 10, 17)]);
    expect(wrapper.emitted('set:dateRange')?.[1]).toStrictEqual([new Date(2024, 10, 17)]);
  });

  test('При клике на левую стрелку, каждый месяц смещается назад (Ноябрь-Декабрь -> Октябрь-Ноябрь)', async () => {
    const wrapper = getCalendarMonthRange();

    expect(wrapper.text()).toContain('Ноябрь 2024');
    expect(wrapper.text()).toContain('Декабрь 2024');

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain('Октябрь 2024');
    expect(wrapper.text()).toContain('Ноябрь 2024');
  });

  test('При клике на правую стрелку, каждый месяц смещается вперед (Ноябрь-Декабрь -> Декабрь-Январь)', async () => {
    const wrapper = getCalendarMonthRange();

    expect(wrapper.text()).toContain('Ноябрь 2024');
    expect(wrapper.text()).toContain('Декабрь 2024');

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain('Декабрь 2024');
    expect(wrapper.text()).toContain('Январь 2025');
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один день в предыдущем/следующем месяце', () => {
    const wrapper = getCalendarMonthRange({
      isInactiveRule: (date) => date <= new Date(2024, 10, 1) || date >= new Date(2025, 0, 1),
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });

  test('При смещении месяца, диапазон перерисовывается', async () => {
    const wrapper = getCalendarMonthRange({
      minValue: new Date(2024, 10, 29),
      maxValue: new Date(2024, 11, 2),
    });
    await vi.runAllTimers();

    let november2024 = wrapper.findAll('[data-test-month]')[0];
    const december2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.findAllComponents(CalendarDayCell)[32].props().day.active).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[33].props().day.isInRange).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[6].props().day.isInRange).toBeTruthy();
    expect(december2024.findAllComponents(CalendarDayCell)[7].props().day.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    november2024 = wrapper.findAll('[data-test-month]')[1];

    expect(november2024.findAllComponents(CalendarDayCell)[32].props().day.active).toBeTruthy();
    expect(november2024.findAllComponents(CalendarDayCell)[33].props().day.isInRange).toBeTruthy();
  });

  test('Для выбора диапазона длиной в один элемент, необходимо выбрать два раза одну дату', async () => {
    const wrapper = getCalendarMonthRange();
    const november2024 = wrapper.findAll('[data-test-month]')[0];
    await vi.runAllTimers();

    await november2024.findAllComponents(CalendarDayCell)[4].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 10, 1)]);

    await november2024.findAllComponents(CalendarDayCell)[4].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 10, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 10, 1)]);
  });
});
