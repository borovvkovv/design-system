import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarYearRange from '@comp/components/calendars/CalendarYearRange.vue';
import CalendarMonthCell from '@comp/components/calendars/CalendarMonthCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';

const getCalendarYearRange = (props?: Partial<InstanceType<typeof CalendarYearRange>['$props']>) => {
  const wrapper = mount(CalendarYearRange, {
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

describe('Компонент CalendarYearRange', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 10, 1));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('При незаполненных датах отрисовываются текущий (2024) и следующий года', async () => {
    const wrapper = getCalendarYearRange();

    expect(wrapper.text()).toContain('2024');
    expect(wrapper.text()).toContain('2025');
  });

  test('При заполненных датах, отрисовываются два соседних года. Причем второй год всегда содержит конечную дату из выбранного диапазона', () => {
    const wrapper = getCalendarYearRange({ minValue: new Date(2024, 4, 1), maxValue: new Date(2026, 4, 1) });

    expect(wrapper.text()).toContain('2025');
    expect(wrapper.text()).toContain('2026');
  });

  test('Календарь отрисовывает все месяцы года', () => {
    const wrapper = getCalendarYearRange();

    const year2024 = wrapper.findAll('[data-test-year]')[0];
    const year2025 = wrapper.findAll('[data-test-year]')[1];

    expect(year2024.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(year2024.findAllComponents(CalendarMonthCell)[1].text()).toBe('Февраль');
    expect(year2024.findAllComponents(CalendarMonthCell)[2].text()).toBe('Март');
    expect(year2024.findAllComponents(CalendarMonthCell)[3].text()).toBe('Апрель');
    expect(year2024.findAllComponents(CalendarMonthCell)[4].text()).toBe('Май');
    expect(year2024.findAllComponents(CalendarMonthCell)[5].text()).toBe('Июнь');
    expect(year2024.findAllComponents(CalendarMonthCell)[6].text()).toBe('Июль');
    expect(year2024.findAllComponents(CalendarMonthCell)[7].text()).toBe('Август');
    expect(year2024.findAllComponents(CalendarMonthCell)[8].text()).toBe('Сентябрь');
    expect(year2024.findAllComponents(CalendarMonthCell)[9].text()).toBe('Октябрь');
    expect(year2024.findAllComponents(CalendarMonthCell)[10].text()).toBe('Ноябрь');
    expect(year2024.findAllComponents(CalendarMonthCell)[11].text()).toBe('Декабрь');

    expect(year2025.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(year2025.findAllComponents(CalendarMonthCell)[1].text()).toBe('Февраль');
    expect(year2025.findAllComponents(CalendarMonthCell)[2].text()).toBe('Март');
    expect(year2025.findAllComponents(CalendarMonthCell)[3].text()).toBe('Апрель');
    expect(year2025.findAllComponents(CalendarMonthCell)[4].text()).toBe('Май');
    expect(year2025.findAllComponents(CalendarMonthCell)[5].text()).toBe('Июнь');
    expect(year2025.findAllComponents(CalendarMonthCell)[6].text()).toBe('Июль');
    expect(year2025.findAllComponents(CalendarMonthCell)[7].text()).toBe('Август');
    expect(year2025.findAllComponents(CalendarMonthCell)[8].text()).toBe('Сентябрь');
    expect(year2025.findAllComponents(CalendarMonthCell)[9].text()).toBe('Октябрь');
    expect(year2025.findAllComponents(CalendarMonthCell)[10].text()).toBe('Ноябрь');
    expect(year2025.findAllComponents(CalendarMonthCell)[11].text()).toBe('Декабрь');
  });

  test('Шестой месяц 2024 года неактивен, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarYearRange({ isInactiveRule: isInactiveRules.juneNotAllowed });
    const year2024 = wrapper.findAll('[data-test-year]')[0];

    expect(year2024.findAllComponents(CalendarMonthCell)[5].props().month.inactive).toBeTruthy();
  });

  test('При незаполненных датах диапазон не отрисовывается', async () => {
    const wrapper = getCalendarYearRange();
    expect(
      wrapper.findAllComponents(CalendarMonthCell).every((monthCell) => {
        const monthCellProps = monthCell.props().month;

        return ('isInRange' in monthCellProps && !monthCellProps.isInRange) || !monthCellProps.active;
      }),
    ).toBeTruthy();
  });

  test('Компонент отрисовывает выбранный диапазон', async () => {
    const wrapper = getCalendarYearRange({ minValue: new Date(2024, 9, 1), maxValue: new Date(2025, 2, 1) });
    const year2024 = wrapper.findAll('[data-test-year]')[0];
    const year2025 = wrapper.findAll('[data-test-year]')[1];
    await vi.runAllTimers();

    expect(year2024.findAllComponents(CalendarMonthCell)[9].props().month.active).toBeTruthy();
    expect(year2024.findAllComponents(CalendarMonthCell)[10].props().month.isInRange).toBeTruthy();
    expect(year2024.findAllComponents(CalendarMonthCell)[11].props().month.isInRange).toBeTruthy();
    expect(year2025.findAllComponents(CalendarMonthCell)[0].props().month.isInRange).toBeTruthy();
    expect(year2025.findAllComponents(CalendarMonthCell)[1].props().month.isInRange).toBeTruthy();
    expect(year2025.findAllComponents(CalendarMonthCell)[2].props().month.active).toBeTruthy();
  });

  test('При клике на неактивную ячейку первого года появляется попап', async () => {
    const wrapper = getCalendarYearRange({ isInactiveRule: isInactiveRules.juneNotAllowed });
    const year2024 = wrapper.findAll('[data-test-year]')[0];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Месяц недоступен для выбора');

    await year2024.findAllComponents(CalendarMonthCell)[5].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Месяц недоступен для выбора');
  });

  test('При клике на неактивную ячейку второго года появляется попап', async () => {
    const wrapper = getCalendarYearRange({
      minValue: new Date(2023, 0, 1),
      maxValue: new Date(2024, 0, 1),
      isInactiveRule: isInactiveRules.juneNotAllowed,
    });
    const year2024 = wrapper.findAll('[data-test-year]')[1];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Месяц недоступен для выбора');

    await year2024.findAllComponents(CalendarMonthCell)[5].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Месяц недоступен для выбора');
  });

  test('При выборе диапазона, вызываются эмиты set:dateRange и update:minValue, update:maxValue', async () => {
    const wrapper = getCalendarYearRange();
    const year2024 = wrapper.findAll('[data-test-year]')[0];
    const year2025 = wrapper.findAll('[data-test-year]')[1];
    await vi.runAllTimers();

    await year2024.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);

    await year2025.findAllComponents(CalendarMonthCell)[5].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2025, 5, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2025, 5, 1)]);
  });

  test('Если выбрать вторую дату меньшей первой, то выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarYearRange();
    await vi.runAllTimers();
    const year2024 = wrapper.findAll('[data-test-year]')[0];

    await year2024.findAllComponents(CalendarMonthCell)[5].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 5, 1)]);

    await year2024.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2024, 0, 1)]);
  });

  test('Для выбора нового диапазона, необходимо выбрать любую дату, выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarYearRange();
    await vi.runAllTimers();
    const year2024 = wrapper.findAll('[data-test-year]')[0];

    await year2024.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);

    await year2024.findAllComponents(CalendarMonthCell)[5].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 5, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 5, 1)]);

    await year2024.findAllComponents(CalendarMonthCell)[2].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2024, 2, 1)]);
    expect(wrapper.emitted('update:maxValue')?.[1]).toStrictEqual([undefined]);

    await year2024.findAllComponents(CalendarMonthCell)[6].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[2]).toStrictEqual([new Date(2024, 6, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[1]).toStrictEqual([new Date(2024, 6, 1)]);
  });

  test('При клике на левую стрелку, каждый год смещается назад (2024-2025 -> 2023-2024)', async () => {
    const wrapper = getCalendarYearRange();

    expect(wrapper.text()).toContain('2024');
    expect(wrapper.text()).toContain('2025');

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');
  });

  test('При клике на правую стрелку, каждый год смещается вперед (2024-2025 -> 2025-2026)', async () => {
    const wrapper = getCalendarYearRange();

    expect(wrapper.text()).toContain('2024');
    expect(wrapper.text()).toContain('2025');

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain('2025');
    expect(wrapper.text()).toContain('2026');
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один месяц в предыдущем/следующем году', () => {
    const wrapper = getCalendarYearRange({
      isInactiveRule: (date) => date.getFullYear() <= 2023 || date.getFullYear() >= 2025,
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });

  test('При смещении месяца назад, диапазон перерисовывается', async () => {
    const wrapper = getCalendarYearRange({
      minValue: new Date(2024, 10, 1),
      maxValue: new Date(2025, 0, 1),
    });
    await vi.runAllTimers();

    let year2024 = wrapper.findAll('[data-test-year]')[0];
    const year2025 = wrapper.findAll('[data-test-year]')[1];

    expect(year2024.findAllComponents(CalendarMonthCell)[10].props().month.active).toBeTruthy();
    expect(year2024.findAllComponents(CalendarMonthCell)[11].props().month.isInRange).toBeTruthy();
    expect(year2025.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    year2024 = wrapper.findAll('[data-test-year]')[1];

    expect(year2024.findAllComponents(CalendarMonthCell)[10].props().month.active).toBeTruthy();
    expect(year2024.findAllComponents(CalendarMonthCell)[11].props().month.isInRange).toBeTruthy();
  });

  test('Для выбора диапазона длиной в один элемент, необходимо выбрать два раза одну дату', async () => {
    const wrapper = getCalendarYearRange();
    await vi.runAllTimers();
    const year2024 = wrapper.findAll('[data-test-year]')[0];

    expect(year2024.findAllComponents(CalendarMonthCell)[0].props().month.active).not.toBeTruthy();

    await year2024.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);

    await year2024.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);
    expect(year2024.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();
  });
});
