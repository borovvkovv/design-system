import { describe, expect, test, vitest } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import CalendarMonth from '@comp/components/calendars/CalendarMonth.vue';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';
import { isInactiveRules } from '@comp/components/calendars/utils/inactive-rules';

const getCalendarMonth = (props?: Partial<InstanceType<typeof CalendarMonth>['$props']>) => {
  const wrapper = mount(CalendarMonth, {
    props: {
      modelValue: new Date(2024, 11, 1),
      isInactiveRule: isInactiveRules.fifthDayNotAllowed,
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

describe('Компонент CalendarMonth', () => {
  test('Отображается месяц и год календаря (Декабрь 2024)', () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.text()).toContain('Декабрь 2024');
  });

  test('Отображаются сокращенным имена дней недели', () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.text()).toContain('пн');
    expect(wrapper.text()).toContain('вт');
    expect(wrapper.text()).toContain('ср');
    expect(wrapper.text()).toContain('чт');
    expect(wrapper.text()).toContain('пт');
    expect(wrapper.text()).toContain('сб');
    expect(wrapper.text()).toContain('вс');
  });

  test('Дни находящиеся вне текущего месяца не отображаются', () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.findAllComponents(CalendarDayCell)[0].props().day.prevMonth).toBeTruthy(); //25
    expect(wrapper.findAllComponents(CalendarDayCell)[1].props().day.prevMonth).toBeTruthy(); //26
    expect(wrapper.findAllComponents(CalendarDayCell)[2].props().day.prevMonth).toBeTruthy(); //27
    expect(wrapper.findAllComponents(CalendarDayCell)[3].props().day.prevMonth).toBeTruthy(); //28
    expect(wrapper.findAllComponents(CalendarDayCell)[4].props().day.prevMonth).toBeTruthy(); //29
    expect(wrapper.findAllComponents(CalendarDayCell)[5].props().day.prevMonth).toBeTruthy(); //30

    expect(wrapper.findAllComponents(CalendarDayCell)[37].props().day.nextMonth).toBeTruthy(); //1
    expect(wrapper.findAllComponents(CalendarDayCell)[38].props().day.nextMonth).toBeTruthy(); //2
    expect(wrapper.findAllComponents(CalendarDayCell)[39].props().day.nextMonth).toBeTruthy(); //3
    expect(wrapper.findAllComponents(CalendarDayCell)[40].props().day.nextMonth).toBeTruthy(); //4
    expect(wrapper.findAllComponents(CalendarDayCell)[41].props().day.nextMonth).toBeTruthy(); //5
  });

  test('Выходные дни выделены красным цветом', () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.weekend).toBeTruthy();

    expect(wrapper.findAllComponents(CalendarDayCell)[12].props().day.weekend).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarDayCell)[13].props().day.weekend).toBeTruthy();

    expect(wrapper.findAllComponents(CalendarDayCell)[19].props().day.weekend).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarDayCell)[20].props().day.weekend).toBeTruthy();

    expect(wrapper.findAllComponents(CalendarDayCell)[26].props().day.weekend).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarDayCell)[27].props().day.weekend).toBeTruthy();

    expect(wrapper.findAllComponents(CalendarDayCell)[33].props().day.weekend).toBeTruthy();
    expect(wrapper.findAllComponents(CalendarDayCell)[34].props().day.weekend).toBeTruthy();
  });

  test('Пятый день месяца неактивен, согласно переданному через проп правилу', () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.findAllComponents(CalendarDayCell)[10].props().day.inactive).toBeTruthy();
  });

  test('При клике на неактивную ячейку появляется попап', async () => {
    vitest.useFakeTimers();

    const wrapper = getCalendarMonth();
    await vitest.runAllTimers();

    expect(wrapper.text()).not.toContain('Дата недоступна для выбора');

    await wrapper.findAllComponents(CalendarDayCell)[10].trigger('click');
    await vitest.runAllTicks();

    expect(wrapper.text()).toContain('Дата недоступна для выбора');
  });

  test('При клике на доступную дату, ячейка становится активной, вызываются эмиты click:date и update:modelValue', async () => {
    vitest.useFakeTimers();

    const wrapper = getCalendarMonth();
    await vitest.runAllTimers();

    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.active).toBeTruthy();

    await wrapper.findAllComponents(CalendarDayCell)[9].trigger('click');

    expect(wrapper.findAllComponents(CalendarDayCell)[9].props().day.active).toBeTruthy();
    expect(wrapper.emitted('click:date')?.[0]).toStrictEqual([new Date(2024, 11, 4)]);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([new Date(2024, 11, 4)]);
  });

  test('При клике на уже активную ячейку, она останется активной', async () => {
    vitest.useFakeTimers();
    const wrapper = getCalendarMonth();
    await vitest.runAllTimers();

    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.active).toBeTruthy();

    await wrapper.findAllComponents(CalendarDayCell)[6].trigger('click');

    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.active).toBeTruthy();
  });

  test('При клике на левую стрелку, отрисовывается предыдущий месяц', async () => {
    const wrapper = getCalendarMonth();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.text()).toContain('Ноябрь 2024');
  });

  test('При клике на левую стрелку активным становится то же число, но предыдущего месяца', async () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.findAllComponents(CalendarDayCell)[6].text()).toBe('1');
    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarDayCell)[4].text()).toBe('1');
    expect(wrapper.findAllComponents(CalendarDayCell)[4].props().day.active).toBeTruthy();
  });

  test('Если после смены месяца на предыдущее, активное число недоступно, то выбирается ближайшее от недоступного число', async () => {
    const wrapper = getCalendarMonth({ modelValue: new Date(2024, 11, 5) });

    expect(wrapper.findAllComponents(CalendarDayCell)[10].text()).toBe('5');
    expect(wrapper.findAllComponents(CalendarDayCell)[10].props().day.inactive).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(CalendarDayCell)[7].text()).toBe('4');
    expect(wrapper.findAllComponents(CalendarDayCell)[7].props().day.active).toBeTruthy();
  });

  test('При клике на правую стрелку, отрисовывается следующий месяц', async () => {
    const wrapper = getCalendarMonth();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.text()).toContain('Январь 2025');
  });

  test('При клике на правую стрелку активным становится то же число, но следующего месяца', async () => {
    const wrapper = getCalendarMonth();

    expect(wrapper.findAllComponents(CalendarDayCell)[6].text()).toBe('1');
    expect(wrapper.findAllComponents(CalendarDayCell)[6].props().day.active).toBeTruthy();

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.findAllComponents(CalendarDayCell)[2].text()).toBe('1');
    expect(wrapper.findAllComponents(CalendarDayCell)[2].props().day.active).toBeTruthy();
  });

  test('Левая/правая стрелка недоступна, если нельзя выбрать ни один день в предыдущем/следующем месяце', () => {
    const wrapper = getCalendarMonth({
      isInactiveRule: (date) => date <= new Date(2024, 10, 31) || date >= new Date(2025, 0, 1),
    });

    expect(wrapper.findAllComponents(AppLink)[0].props().isDisabled).toBeTruthy();
    expect(wrapper.findAllComponents(AppLink)[1].props().isDisabled).toBeTruthy();
  });
});
