import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarYears from '@comp/components/calendars/CalendarYears.vue';
import CalendarYearCell from '@comp/components/calendars/CalendarYearCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';

const getCalendarYears = (props?: Partial<InstanceType<typeof CalendarYears>['$props']>) => {
  const wrapper = mount(CalendarYears, {
    props: {
      modelValue: new Date(2024, 0, 1),
      isInactiveRule: isInactiveRules.between20232026,
      ...props,
      'onClick:date': (newDate) => {
        wrapper.setProps({ modelValue: newDate });
      },
      'onUpdate:modelValue': (newDate) => {
        wrapper.setProps({ modelValue: newDate });
      },
    },
  });

  return wrapper;
};

describe('Компонент CalendarYears', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('Отображается слово "Год"', () => {
    const wrapper = getCalendarYears();

    expect(wrapper.text()).toContain('Год');
  });

  test('Календарь отрисовывает двенадцатилетие, текущий год (2024) задает точку отсчета для положения остальных годов. Текущий год отрисовывается последним', async () => {
    const wrapper = getCalendarYears();

    expect(wrapper.findAllComponents(CalendarYearCell)[0].text()).toBe('2013');
    expect(wrapper.findAllComponents(CalendarYearCell)[1].text()).toBe('2014');
    expect(wrapper.findAllComponents(CalendarYearCell)[2].text()).toBe('2015');
    expect(wrapper.findAllComponents(CalendarYearCell)[3].text()).toBe('2016');
    expect(wrapper.findAllComponents(CalendarYearCell)[4].text()).toBe('2017');
    expect(wrapper.findAllComponents(CalendarYearCell)[5].text()).toBe('2018');
    expect(wrapper.findAllComponents(CalendarYearCell)[6].text()).toBe('2019');
    expect(wrapper.findAllComponents(CalendarYearCell)[7].text()).toBe('2020');
    expect(wrapper.findAllComponents(CalendarYearCell)[8].text()).toBe('2021');
    expect(wrapper.findAllComponents(CalendarYearCell)[9].text()).toBe('2022');
    expect(wrapper.findAllComponents(CalendarYearCell)[10].text()).toBe('2023');
    expect(wrapper.findAllComponents(CalendarYearCell)[11].text()).toBe('2024');
  });

  test('Года после 2026 недоступны, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarYears({ modelValue: new Date(2027, 0, 1) });

    expect(wrapper.findAllComponents(CalendarYearCell)[0].props().year.inactive).toBeFalsy();
    expect(wrapper.findAllComponents(CalendarYearCell)[1].props().year.inactive).toBeFalsy();
    expect(wrapper.findAllComponents(CalendarYearCell)[2].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[3].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[4].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[5].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[6].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[7].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[8].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[9].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[10].props().year.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarYearCell)[11].props().year.inactive).toBeTruthy();
  });

  test('При клике на неактивную ячейку появляется попап', async () => {
    const wrapper = getCalendarYears();
    await vi.runAllTimers();

    expect(wrapper.text()).not.toContain('Год недоступен для выбора');

    await wrapper.findAllComponents(CalendarYearCell)[0].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Год недоступен для выбора');
  });

  test('При клике на доступный год, ячейка становится активной, вызываются эмиты click:date и update:modelValue', async () => {
    const wrapper = getCalendarYears();
    await vi.runAllTimers();

    await wrapper.findAllComponents(CalendarYearCell)[10].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell)[10].props().year.active).toBeTruthy();

    expect(wrapper.emitted('click:date')?.[0]).toStrictEqual([new Date(2023, 0, 1)]);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([new Date(2023, 0, 1)]);
  });

  test('При клике на уже активную ячейку, она останется активной', async () => {
    const wrapper = getCalendarYears();
    await vi.runAllTimers();

    expect(wrapper.findAllComponents(CalendarYearCell)[11].props().year.active).toBeTruthy();

    await wrapper.findAllComponents(CalendarYearCell)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell)[11].props().year.active).toBeTruthy();
  });

  test('При клике на левую стрелку, отрисовывается предыдущее двенадцатилетие', async () => {
    const wrapper = getCalendarYears();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell)[0].text()).toBe('2001');
    expect(wrapper.findAllComponents(CalendarYearCell)[1].text()).toBe('2002');
    expect(wrapper.findAllComponents(CalendarYearCell)[2].text()).toBe('2003');
    expect(wrapper.findAllComponents(CalendarYearCell)[3].text()).toBe('2004');
    expect(wrapper.findAllComponents(CalendarYearCell)[4].text()).toBe('2005');
    expect(wrapper.findAllComponents(CalendarYearCell)[5].text()).toBe('2006');
    expect(wrapper.findAllComponents(CalendarYearCell)[6].text()).toBe('2007');
    expect(wrapper.findAllComponents(CalendarYearCell)[7].text()).toBe('2008');
    expect(wrapper.findAllComponents(CalendarYearCell)[8].text()).toBe('2009');
    expect(wrapper.findAllComponents(CalendarYearCell)[9].text()).toBe('2010');
    expect(wrapper.findAllComponents(CalendarYearCell)[10].text()).toBe('2011');
    expect(wrapper.findAllComponents(CalendarYearCell)[11].text()).toBe('2012');
  });

  test('При клике на левую/правую стрелку активным остается выбранный ранее год', async () => {
    const wrapper = getCalendarYears();

    expect(wrapper.findAllComponents(CalendarYearCell)[11].text()).toBe('2024');
    expect(wrapper.findAllComponents(CalendarYearCell)[11].props().year.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell).every((yearCell) => !yearCell.props().year.active)).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell)[11].text()).toBe('2024');
    expect(wrapper.findAllComponents(CalendarYearCell)[11].props().year.active).toBeTruthy();
  });

  test('При клике на правую стрелку, отрисовывается следующее двенадцатилетие', async () => {
    const wrapper = getCalendarYears();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.findAllComponents(CalendarYearCell)[0].text()).toBe('2025');
    expect(wrapper.findAllComponents(CalendarYearCell)[1].text()).toBe('2026');
    expect(wrapper.findAllComponents(CalendarYearCell)[2].text()).toBe('2027');
    expect(wrapper.findAllComponents(CalendarYearCell)[3].text()).toBe('2028');
    expect(wrapper.findAllComponents(CalendarYearCell)[4].text()).toBe('2029');
    expect(wrapper.findAllComponents(CalendarYearCell)[5].text()).toBe('2030');
    expect(wrapper.findAllComponents(CalendarYearCell)[6].text()).toBe('2031');
    expect(wrapper.findAllComponents(CalendarYearCell)[7].text()).toBe('2032');
    expect(wrapper.findAllComponents(CalendarYearCell)[8].text()).toBe('2033');
    expect(wrapper.findAllComponents(CalendarYearCell)[9].text()).toBe('2034');
    expect(wrapper.findAllComponents(CalendarYearCell)[10].text()).toBe('2035');
    expect(wrapper.findAllComponents(CalendarYearCell)[11].text()).toBe('2036');
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один год в предыдущем/следующем 12-летии', () => {
    const wrapper = getCalendarYears({
      isInactiveRule: (date) => date.getFullYear() >= 2025 || date.getFullYear() <= 2012,
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });
});
