import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarYearsRange from '@comp/components/calendars/CalendarYearsRange.vue';
import CalendarYearCell from '@comp/components/calendars/CalendarYearCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';

const getCalendarYearsRange = (props?: Partial<InstanceType<typeof CalendarYearsRange>['$props']>) => {
  const wrapper = mount(CalendarYearsRange, {
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

describe('Компонент CalendarYearsRange', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 10, 1));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('При незаполненных датах, отрисовываются предыдущее (2001-2012) и текущее (2013-2024) двенадцатилетия', () => {
    const wrapper = getCalendarYearsRange();

    expect(wrapper.text()).toContain('2001');
    expect(wrapper.text()).toContain('2002');
    expect(wrapper.text()).toContain('2003');
    expect(wrapper.text()).toContain('2004');
    expect(wrapper.text()).toContain('2005');
    expect(wrapper.text()).toContain('2006');
    expect(wrapper.text()).toContain('2007');
    expect(wrapper.text()).toContain('2008');
    expect(wrapper.text()).toContain('2009');
    expect(wrapper.text()).toContain('2010');
    expect(wrapper.text()).toContain('2011');
    expect(wrapper.text()).toContain('2012');

    expect(wrapper.text()).toContain('2013');
    expect(wrapper.text()).toContain('2014');
    expect(wrapper.text()).toContain('2015');
    expect(wrapper.text()).toContain('2016');
    expect(wrapper.text()).toContain('2017');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('2019');
    expect(wrapper.text()).toContain('2020');
    expect(wrapper.text()).toContain('2021');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');
  });

  test('При заполненных датах, отрисовываются два соседних двенадцатилетия', () => {
    const wrapper = getCalendarYearsRange({ minValue: new Date(1900, 0, 1), maxValue: new Date(2026, 0, 1) });

    expect(wrapper.text()).toContain('2013');
    expect(wrapper.text()).toContain('2014');
    expect(wrapper.text()).toContain('2015');
    expect(wrapper.text()).toContain('2016');
    expect(wrapper.text()).toContain('2017');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('2019');
    expect(wrapper.text()).toContain('2020');
    expect(wrapper.text()).toContain('2021');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');

    expect(wrapper.text()).toContain('2025');
    expect(wrapper.text()).toContain('2026');
    expect(wrapper.text()).toContain('2027');
    expect(wrapper.text()).toContain('2028');
    expect(wrapper.text()).toContain('2029');
    expect(wrapper.text()).toContain('2030');
    expect(wrapper.text()).toContain('2031');
    expect(wrapper.text()).toContain('2032');
    expect(wrapper.text()).toContain('2033');
    expect(wrapper.text()).toContain('2034');
    expect(wrapper.text()).toContain('2035');
    expect(wrapper.text()).toContain('2036');
  });

  test('Только года с 2023 по 2026 активны, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarYearsRange({
      minValue: new Date(2000, 0, 1),
      maxValue: new Date(2027, 0, 1),
      isInactiveRule: isInactiveRules.between20232026,
    });
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    const secondCalendar = wrapper.findAll('[data-test-years]')[1];

    expect(firstCalendar.findAllComponents(CalendarYearCell)[0].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[1].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[2].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[3].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[4].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[5].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[6].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[7].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[8].props().year.inactive).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[9].props().year.inactive).toBeTruthy();

    expect(firstCalendar.findAllComponents(CalendarYearCell)[10].props().year.inactive).toBeFalsy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[11].props().year.inactive).toBeFalsy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[0].props().year.inactive).toBeFalsy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[1].props().year.inactive).toBeFalsy();

    expect(secondCalendar.findAllComponents(CalendarYearCell)[2].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[3].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[4].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[5].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[6].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[7].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[8].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[9].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[10].props().year.inactive).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[11].props().year.inactive).toBeTruthy();
  });

  test('При незаполненных датах диапазон не отрисовывается', async () => {
    const wrapper = getCalendarYearsRange();
    expect(
      wrapper.findAllComponents(CalendarYearCell).every((yearCell) => {
        const monthCellProps = yearCell.props().year;

        return ('isInRange' in monthCellProps && !monthCellProps.isInRange) || !monthCellProps.active;
      }),
    ).toBeTruthy();
  });

  test('Компонент отрисовывает выбранный диапазон', async () => {
    const wrapper = getCalendarYearsRange({ minValue: new Date(2022, 0, 1), maxValue: new Date(2027, 0, 1) });
    await vi.runAllTimers();

    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    const secondCalendar = wrapper.findAll('[data-test-years]')[1];

    expect(firstCalendar.findAllComponents(CalendarYearCell)[9].props().year.active).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[10].props().year.isInRange).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[11].props().year.isInRange).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[0].props().year.isInRange).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[1].props().year.isInRange).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[2].props().year.active).toBeTruthy();
  });

  test('При клике на неактивную ячейку первого двенадцатилетия появляется попап', async () => {
    const wrapper = getCalendarYearsRange({ isInactiveRule: isInactiveRules.between20232026 });
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Год недоступен для выбора');

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Год недоступен для выбора');
  });

  test('При клике на неактивную ячейку второго двенадцатилетия появляется попап', async () => {
    const wrapper = getCalendarYearsRange({
      isInactiveRule: isInactiveRules.between20232026,
    });
    const secondCalendar = wrapper.findAll('[data-test-years]')[1];
    await vi.runAllTimers();

    expect(wrapper).not.toContain('Год недоступен для выбора');

    await secondCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Год недоступен для выбора');
  });

  test('При выборе диапазона, вызываются эмиты set:dateRange и update:minValue, update:maxValue', async () => {
    const wrapper = getCalendarYearsRange();
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    const secondCalendar = wrapper.findAll('[data-test-years]')[1];
    await vi.runAllTimers();

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2001, 0, 1)]);

    await secondCalendar.findAllComponents(CalendarYearCell)[11].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2024, 0, 1)]);
  });

  test('Если выбрать вторую дату меньшей первой, то выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarYearsRange();
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    await vi.runAllTimers();

    await firstCalendar.findAllComponents(CalendarYearCell)[5].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2006, 0, 1)]);

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2001, 0, 1)]);
  });

  test('Для выбора нового диапазона, необходимо выбрать любую дату, выбор диапазона начнется заново с выбранной даты', async () => {
    const wrapper = getCalendarYearsRange();
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];
    await vi.runAllTimers();

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2001, 0, 1)]);

    await firstCalendar.findAllComponents(CalendarYearCell)[5].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2006, 0, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2006, 0, 1)]);

    await firstCalendar.findAllComponents(CalendarYearCell)[2].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[1]).toStrictEqual([new Date(2003, 0, 1)]);
    expect(wrapper.emitted('update:maxValue')?.[1]).toStrictEqual([undefined]);

    await firstCalendar.findAllComponents(CalendarYearCell)[6].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[2]).toStrictEqual([new Date(2007, 0, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[1]).toStrictEqual([new Date(2007, 0, 1)]);
  });

  test('При клике на левую стрелку, каждое двенадцатилетие смещается назад ((2001-2012,2013-2024) -> (1989-2000, 2001-2012))', async () => {
    const wrapper = getCalendarYearsRange();

    expect(wrapper.text()).toContain('2001');
    expect(wrapper.text()).toContain('2002');
    expect(wrapper.text()).toContain('2003');
    expect(wrapper.text()).toContain('2004');
    expect(wrapper.text()).toContain('2005');
    expect(wrapper.text()).toContain('2006');
    expect(wrapper.text()).toContain('2007');
    expect(wrapper.text()).toContain('2008');
    expect(wrapper.text()).toContain('2009');
    expect(wrapper.text()).toContain('2010');
    expect(wrapper.text()).toContain('2011');
    expect(wrapper.text()).toContain('2012');

    expect(wrapper.text()).toContain('2013');
    expect(wrapper.text()).toContain('2014');
    expect(wrapper.text()).toContain('2015');
    expect(wrapper.text()).toContain('2016');
    expect(wrapper.text()).toContain('2017');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('2019');
    expect(wrapper.text()).toContain('2020');
    expect(wrapper.text()).toContain('2021');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain('1989');
    expect(wrapper.text()).toContain('1990');
    expect(wrapper.text()).toContain('1991');
    expect(wrapper.text()).toContain('1992');
    expect(wrapper.text()).toContain('1993');
    expect(wrapper.text()).toContain('1994');
    expect(wrapper.text()).toContain('1995');
    expect(wrapper.text()).toContain('1996');
    expect(wrapper.text()).toContain('1997');
    expect(wrapper.text()).toContain('1998');
    expect(wrapper.text()).toContain('1999');
    expect(wrapper.text()).toContain('2000');

    expect(wrapper.text()).toContain('2001');
    expect(wrapper.text()).toContain('2002');
    expect(wrapper.text()).toContain('2003');
    expect(wrapper.text()).toContain('2004');
    expect(wrapper.text()).toContain('2005');
    expect(wrapper.text()).toContain('2006');
    expect(wrapper.text()).toContain('2007');
    expect(wrapper.text()).toContain('2008');
    expect(wrapper.text()).toContain('2009');
    expect(wrapper.text()).toContain('2010');
    expect(wrapper.text()).toContain('2011');
    expect(wrapper.text()).toContain('2012');
  });

  test('При клике на правую стрелку, каждое двенадцатилетие смещается вперед ((2001-2012,2013-2024) -> (2013-2024,2025-2036))', async () => {
    const wrapper = getCalendarYearsRange();

    expect(wrapper.text()).toContain('2001');
    expect(wrapper.text()).toContain('2002');
    expect(wrapper.text()).toContain('2003');
    expect(wrapper.text()).toContain('2004');
    expect(wrapper.text()).toContain('2005');
    expect(wrapper.text()).toContain('2006');
    expect(wrapper.text()).toContain('2007');
    expect(wrapper.text()).toContain('2008');
    expect(wrapper.text()).toContain('2009');
    expect(wrapper.text()).toContain('2010');
    expect(wrapper.text()).toContain('2011');
    expect(wrapper.text()).toContain('2012');

    expect(wrapper.text()).toContain('2013');
    expect(wrapper.text()).toContain('2014');
    expect(wrapper.text()).toContain('2015');
    expect(wrapper.text()).toContain('2016');
    expect(wrapper.text()).toContain('2017');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('2019');
    expect(wrapper.text()).toContain('2020');
    expect(wrapper.text()).toContain('2021');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain('2013');
    expect(wrapper.text()).toContain('2014');
    expect(wrapper.text()).toContain('2015');
    expect(wrapper.text()).toContain('2016');
    expect(wrapper.text()).toContain('2017');
    expect(wrapper.text()).toContain('2018');
    expect(wrapper.text()).toContain('2019');
    expect(wrapper.text()).toContain('2020');
    expect(wrapper.text()).toContain('2021');
    expect(wrapper.text()).toContain('2022');
    expect(wrapper.text()).toContain('2023');
    expect(wrapper.text()).toContain('2024');

    expect(wrapper.text()).toContain('2025');
    expect(wrapper.text()).toContain('2026');
    expect(wrapper.text()).toContain('2027');
    expect(wrapper.text()).toContain('2028');
    expect(wrapper.text()).toContain('2029');
    expect(wrapper.text()).toContain('2030');
    expect(wrapper.text()).toContain('2031');
    expect(wrapper.text()).toContain('2032');
    expect(wrapper.text()).toContain('2033');
    expect(wrapper.text()).toContain('2034');
    expect(wrapper.text()).toContain('2035');
    expect(wrapper.text()).toContain('2036');
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один год в предыдущем/следующем двенадцатилетии', () => {
    const wrapper = getCalendarYearsRange({
      isInactiveRule: (date) => date.getFullYear() < 2001 || date.getFullYear() > 2024,
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });

  test('При смещении двенадцатилетия назад, диапазон перерисовывается', async () => {
    const wrapper = getCalendarYearsRange({
      minValue: new Date(2023, 0, 1),
      maxValue: new Date(2025, 0, 1),
    });
    await vi.runAllTimers();

    let firstCalendar = wrapper.findAll('[data-test-years]')[0];
    const secondCalendar = wrapper.findAll('[data-test-years]')[1];

    expect(firstCalendar.findAllComponents(CalendarYearCell)[10].props().year.active).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[11].props().year.isInRange).toBeTruthy();
    expect(secondCalendar.findAllComponents(CalendarYearCell)[0].props().year.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    firstCalendar = wrapper.findAll('[data-test-years]')[1];

    expect(firstCalendar.findAllComponents(CalendarYearCell)[10].props().year.active).toBeTruthy();
    expect(firstCalendar.findAllComponents(CalendarYearCell)[11].props().year.isInRange).toBeTruthy();
  });

  test('Для выбора диапазона длиной в один элемент, необходимо выбрать два раза одну дату', async () => {
    const wrapper = getCalendarYearsRange();
    await vi.runAllTimers();
    const firstCalendar = wrapper.findAll('[data-test-years]')[0];

    expect(firstCalendar.findAllComponents(CalendarYearCell)[0].props().year.active).not.toBeTruthy();

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.emitted('update:minValue')?.[0]).toStrictEqual([new Date(2001, 0, 1)]);

    await firstCalendar.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.emitted('update:maxValue')?.[0]).toStrictEqual([new Date(2001, 0, 1)]);
    expect(wrapper.emitted('set:dateRange')?.[0]).toStrictEqual([new Date(2001, 0, 1)]);

    expect(firstCalendar.findAllComponents(CalendarYearCell)[0].props().year.active).toBeTruthy();
  });
});
