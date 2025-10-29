import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarYear from '@comp/components/calendars/CalendarYear.vue';
import CalendarMonthCell from '@comp/components/calendars/CalendarMonthCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';

const getCalendarYear = (props?: Partial<InstanceType<typeof CalendarYear>['$props']>) => {
  const wrapper = mount(CalendarYear, {
    props: {
      modelValue: new Date(2024, 0, 1),
      isInactiveRule: isInactiveRules.juneNotAllowed,
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

describe('Компонент CalendarYear', () => {
  test('Отображается год календаря (2024)', () => {
    const wrapper = getCalendarYear();

    expect(wrapper.text()).toContain('2024');
  });

  test('Календарь отрисовывает все месяцы года', () => {
    const wrapper = getCalendarYear();

    expect(wrapper.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[1].text()).toBe('Февраль');
    expect(wrapper.findAllComponents(CalendarMonthCell)[2].text()).toBe('Март');
    expect(wrapper.findAllComponents(CalendarMonthCell)[3].text()).toBe('Апрель');
    expect(wrapper.findAllComponents(CalendarMonthCell)[4].text()).toBe('Май');
    expect(wrapper.findAllComponents(CalendarMonthCell)[5].text()).toBe('Июнь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[6].text()).toBe('Июль');
    expect(wrapper.findAllComponents(CalendarMonthCell)[7].text()).toBe('Август');
    expect(wrapper.findAllComponents(CalendarMonthCell)[8].text()).toBe('Сентябрь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[9].text()).toBe('Октябрь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[10].text()).toBe('Ноябрь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[11].text()).toBe('Декабрь');
  });

  test('Шестой месяц неактивен, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarYear();

    expect(wrapper.findAllComponents(CalendarMonthCell)[5].props().month.inactive).toBeTruthy();
  });

  test('При клике на неактивную ячейку появляется попап', async () => {
    vi.useFakeTimers();

    const wrapper = getCalendarYear();
    await vi.runAllTimers();

    expect(wrapper.text()).not.toContain('Месяц недоступен для выбора');

    await wrapper.findAllComponents(CalendarMonthCell)[5].trigger('click');
    await vi.runAllTicks();

    expect(wrapper.text()).toContain('Месяц недоступен для выбора');
  });

  test('При клике на доступный месяц, ячейка становится активной, вызываются эмиты click:date и update:modelValue', async () => {
    vi.useFakeTimers();

    const wrapper = getCalendarYear();
    await vi.runAllTimers();

    await wrapper.findAllComponents(CalendarMonthCell)[2].trigger('click');

    expect(wrapper.findAllComponents(CalendarMonthCell)[2].props().month.active).toBeTruthy();

    expect(wrapper.emitted('click:date')?.[0]).toStrictEqual([new Date(2024, 2, 1)]);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([new Date(2024, 2, 1)]);
  });

  test('При клике на уже активную ячейку, она останется активной', async () => {
    vi.useFakeTimers();
    const wrapper = getCalendarYear();
    await vi.runAllTimers();

    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();

    await wrapper.findAllComponents(CalendarMonthCell)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();
  });

  test('При клике на левую стрелку, отрисовывается предыдущий год', async () => {
    const wrapper = getCalendarYear();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain('2023');
  });

  test('При клике на левую стрелку активным становится тот же месяц, но предыдущего года', async () => {
    const wrapper = getCalendarYear();

    expect(wrapper.text()).toContain(2024);
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain(2023);
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();
  });

  test('Если после смены года на предыдущий, активный месяц недоступен, то выбирается ближайший от недоступного месяц', async () => {
    const wrapper = getCalendarYear({ modelValue: new Date(2025, 5, 1) });

    expect(wrapper.findAllComponents(CalendarMonthCell)[5].text()).toBe('Июнь');

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarMonthCell)[5].props().month.inactive).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarMonthCell)[4].text()).toBe('Май');
    expect(wrapper.findAllComponents(CalendarMonthCell)[4].props().month.active).toBeTruthy();
  });

  test('При клике на правую стрелку, отрисовывается следующий год', async () => {
    const wrapper = getCalendarYear();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain('2025');
  });

  test('При клике на правую стрелку активным становится тот же месяц, но следующего года', async () => {
    const wrapper = getCalendarYear();

    expect(wrapper.text()).toContain(2024);
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain(2025);
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].text()).toBe('Январь');
    expect(wrapper.findAllComponents(CalendarMonthCell)[0].props().month.active).toBeTruthy();
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один месяц в предыдущем/следующем году', () => {
    const wrapper = getCalendarYear({
      isInactiveRule: (date) => date.getFullYear() <= 2023 || date.getFullYear() >= 2025,
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });
});
