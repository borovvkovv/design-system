import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import { CalendarType } from '@comp/components/calendars/utils/models';
import IconCalendar from '@comp/components/icons/IconCalendar.vue';
import DateRangeInput from '@comp/components/inputs/DateRangeInput.vue';

const minDate = new Date(2025, 0, 1);
const minInput = '01.01.2025';
const maxDate = new Date(2025, 1, 1);
const maxInput = '01.02.2025';
const validDate = new Date(2025, 0, 1);
const validInput = '01.01.2025';
const partialDate = new Date(NaN, 4, 1);
const partialInput = '01.05';
const invalidDate = new Date(NaN, NaN, NaN);
const invalidInput = 'test';
const alwaysActiveRule = () => false;
const isInactiveRule = (date: Date) => date.getDate() === 1;
const alwaysInactiveRule = () => true;

const getDateRangeInput = (props?: Partial<InstanceType<typeof DateRangeInput>['$props']>) => {
  const wrapper = mount(DateRangeInput, {
    props: {
      minValue: undefined,
      maxValue: undefined,
      placeholderForMinValue: 'Test placeholderForMinValue',
      placeholderForMaxValue: 'Test placeholderForMaxValue',
      size: Size.M,
      label: 'Test label',
      disabled: false,
      minWidth: 10,
      isNotPreventDefaultEnter: false,
      required: false,
      calendarType: CalendarType.month,
      isInactiveRule: () => false,
      showError: false,
      inactiveErrorText: 'Test inactiveErrorText',
      isError: undefined,
      errorList: undefined,
      'onUpdate:minValue': (newValue?: Date) => {
        wrapper.setProps({ minValue: newValue });
      },
      'onUpdate:maxValue': (newValue?: Date) => {
        wrapper.setProps({ maxValue: newValue });
      },
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент DateRangeInput', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2024, 0, 1));

    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
      })),
    );
  });

  test('Правая иконка инпута в виде календаря', async () => {
    const wrapper = getDateRangeInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconCalendar).exists()).toBeTruthy();
  });

  test('При нажатии на правую иконку вызывается эмит click:iconRight', async () => {
    const wrapper = getDateRangeInput();
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('click:iconRight')).toBeUndefined();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.emitted('click:iconRight')).toHaveLength(1);
  });

  test('Инпуты блокируются при disabled=true', async () => {
    const wrapper = getDateRangeInput({ disabled: true });

    expect(wrapper.findAll('input')[0]?.element.disabled).toBeTruthy();
    expect(wrapper.findAll('input')[1]?.element.disabled).toBeTruthy();
  });

  test('Если задана подпись через проп, то она отображается', async () => {
    const wrapper = getDateRangeInput();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Плейсхолдер для минимальной даты задан либо из пропа, либо из конфига IMask', async () => {
    const wrapper = getDateRangeInput();
    const input = wrapper.findAll('input')[0];

    expect(input.element.placeholder).toBe('Test placeholderForMinValue');

    await wrapper.setProps({ placeholderForMinValue: undefined });

    expect(input.element.placeholder).toBe('ДД.ММ.ГГГГ');
  });

  test('Плейсхолдер для максимальной даты задан либо из пропа, либо из конфига IMask', async () => {
    const wrapper = getDateRangeInput();
    const input = wrapper.findAll('input')[1];

    expect(input.element.placeholder).toBe('Test placeholderForMaxValue');

    await wrapper.setProps({ placeholderForMaxValue: undefined });

    expect(input.element.placeholder).toBe('ДД.ММ.ГГГГ');
  });

  test.each`
    showError | value          | isInactiveRule        | result          | error
    ${true}   | ${validDate}   | ${undefined}          | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validDate}   | ${alwaysActiveRule}   | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validDate}   | ${isInactiveRule}     | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validDate}   | ${alwaysInactiveRule} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${partialDate} | ${undefined}          | ${''}           | ${undefined}
    ${true}   | ${partialDate} | ${alwaysActiveRule}   | ${''}           | ${undefined}
    ${true}   | ${partialDate} | ${isInactiveRule}     | ${''}           | ${undefined}
    ${true}   | ${partialDate} | ${alwaysInactiveRule} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidDate} | ${undefined}          | ${''}           | ${undefined}
    ${true}   | ${invalidDate} | ${alwaysActiveRule}   | ${''}           | ${undefined}
    ${true}   | ${invalidDate} | ${isInactiveRule}     | ${''}           | ${undefined}
    ${true}   | ${invalidDate} | ${alwaysInactiveRule} | ${''}           | ${'Test inactiveErrorText'}
    ${false}  | ${validDate}   | ${undefined}          | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validDate}   | ${alwaysActiveRule}   | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validDate}   | ${isInactiveRule}     | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validDate}   | ${alwaysInactiveRule} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${partialDate} | ${undefined}          | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${partialDate} | ${alwaysActiveRule}   | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${partialDate} | ${isInactiveRule}     | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${partialDate} | ${alwaysInactiveRule} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${undefined}          | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${alwaysActiveRule}   | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${isInactiveRule}     | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${alwaysInactiveRule} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
  `(
    'При монтировании инпута с пропами: showError:$showError,modelValue:$modelValue,isInactiveRule:$isInactiveRule, в инпут выводится: $value, а ошибка - $error',
    ({ showError, value, isInactiveRule, result, error }) => {
      const wrapper = getDateRangeInput({ minValue: value, maxValue: value, showError, isInactiveRule });
      const inputMin = wrapper.findAll('input')[0];
      const inputMax = wrapper.findAll('input')[1];

      if (error) {
        expect(wrapper.text()).toContain(error);
      }
      expect(inputMin.element.value).toBe(result);
      expect(inputMax.element.value).toBe(result);
    },
  );

  test.each`
    showError | minValue       | maxValue       | isInactiveRule        | resultMin       | resultMax       | error
    ${true}   | ${validDate}   | ${invalidDate} | ${undefined}          | ${'01.01.2025'} | ${''}           | ${undefined}
    ${true}   | ${invalidDate} | ${validDate}   | ${undefined}          | ${''}           | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validDate}   | ${invalidDate} | ${alwaysActiveRule}   | ${'01.01.2025'} | ${''}           | ${undefined}
    ${true}   | ${invalidDate} | ${validDate}   | ${alwaysActiveRule}   | ${''}           | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validDate}   | ${invalidDate} | ${isInactiveRule}     | ${'01.01.2025'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidDate} | ${validDate}   | ${isInactiveRule}     | ${''}           | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validDate}   | ${invalidDate} | ${alwaysInactiveRule} | ${'01.01.2025'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidDate} | ${validDate}   | ${alwaysInactiveRule} | ${''}           | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${maxDate}     | ${minDate}     | ${undefined}          | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxDate}     | ${minDate}     | ${alwaysActiveRule}   | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxDate}     | ${minDate}     | ${isInactiveRule}     | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxDate}     | ${minDate}     | ${alwaysInactiveRule} | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${false}  | ${validDate}   | ${invalidDate} | ${undefined}          | ${'01.01.2025'} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${validDate}   | ${undefined}          | ${''}           | ${'01.01.2025'} | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${validDate}   | ${invalidDate} | ${alwaysActiveRule}   | ${'01.01.2025'} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${validDate}   | ${alwaysActiveRule}   | ${''}           | ${'01.01.2025'} | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${validDate}   | ${invalidDate} | ${isInactiveRule}     | ${'01.01.2025'} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${validDate}   | ${isInactiveRule}     | ${''}           | ${'01.01.2025'} | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${validDate}   | ${invalidDate} | ${alwaysInactiveRule} | ${'01.01.2025'} | ${''}           | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${invalidDate} | ${validDate}   | ${alwaysInactiveRule} | ${''}           | ${'01.01.2025'} | ${'Не найдена дата, подходящая под критерии'}
    ${false}  | ${maxDate}     | ${minDate}     | ${undefined}          | ${'01.02.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${maxDate}     | ${minDate}     | ${alwaysActiveRule}   | ${'01.02.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${maxDate}     | ${minDate}     | ${isInactiveRule}     | ${'01.02.2025'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${false}  | ${maxDate}     | ${minDate}     | ${alwaysInactiveRule} | ${'01.02.2025'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
  `(
    'При монтировании инпута с пропами: showError:$showError,modelValue:$modelValue,isInactiveRule:$isInactiveRule, в инпут выводится: $value, а ошибка - $error',
    ({ showError, minValue, maxValue, isInactiveRule, resultMin, resultMax, error }) => {
      const wrapper = getDateRangeInput({ minValue, maxValue, showError, isInactiveRule });
      const inputMin = wrapper.findAll('input')[0];
      const inputMax = wrapper.findAll('input')[1];

      if (error) {
        expect(wrapper.text()).toContain(error);
      }
      expect(inputMin.element.value).toBe(resultMin);
      expect(inputMax.element.value).toBe(resultMax);
    },
  );

  test.each`
    showError | value           | isInactiveRule        | result          | error
    ${true}   | ${validInput}   | ${undefined}          | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${alwaysActiveRule}   | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${isInactiveRule}     | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${alwaysInactiveRule} | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${undefined}          | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${isInactiveRule}     | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${alwaysInactiveRule} | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${undefined}          | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${alwaysActiveRule}   | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${isInactiveRule}     | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${undefined}
    ${false}  | ${validInput}   | ${undefined}          | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${alwaysActiveRule}   | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${isInactiveRule}     | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${undefined}          | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${isInactiveRule}     | ${'30.04.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${undefined}          | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${alwaysActiveRule}   | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${isInactiveRule}     | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${undefined}
  `(
    'Пропсы: showError:$showError,isInactiveRule:$isInactiveRule, при записи значения $modelValue в инпут выводится: $value, а ошибка - $error',
    async ({ showError, value, isInactiveRule, result, error }) => {
      const wrapper = getDateRangeInput({ showError, isInactiveRule });
      const inputMin = wrapper.findAll('input')[0];
      const inputMax = wrapper.findAll('input')[1];

      inputMin.element.value = value;
      await inputMin.trigger('change');

      inputMax.element.value = value;
      await inputMax.trigger('change');

      expect(inputMin.element.value).toBe(result);
      expect(inputMax.element.value).toBe(result);

      if (error) {
        expect(wrapper.text()).toContain(error);
      }
    },
  );

  test.each`
    showError | minValue        | maxValue        | isInactiveRule        | resultMin       | resultMax       | error
    ${true}   | ${validInput}   | ${invalidInput} | ${undefined}          | ${validInput}   | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${validInput}   | ${undefined}          | ${''}           | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${invalidInput} | ${alwaysActiveRule}   | ${validInput}   | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${validInput}   | ${alwaysActiveRule}   | ${''}           | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${invalidInput} | ${isInactiveRule}     | ${validInput}   | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${validInput}   | ${isInactiveRule}     | ${''}           | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${invalidInput} | ${alwaysInactiveRule} | ${validInput}   | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${validInput}   | ${undefined}          | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validInput}   | ${partialInput} | ${undefined}          | ${'01.01.2025'} | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${invalidInput} | ${undefined}          | ${'01.05.2024'} | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${partialInput} | ${undefined}          | ${''}           | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${validInput}   | ${alwaysActiveRule}   | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validInput}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.01.2025'} | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${invalidInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${partialInput} | ${alwaysActiveRule}   | ${''}           | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${validInput}   | ${isInactiveRule}     | ${'01.05.2024'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${partialInput} | ${isInactiveRule}     | ${'01.01.2025'} | ${'01.05.2024'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${partialInput} | ${invalidInput} | ${isInactiveRule}     | ${'01.05.2024'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${partialInput} | ${isInactiveRule}     | ${''}           | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${validInput}   | ${alwaysInactiveRule} | ${'01.05.2024'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${partialInput} | ${alwaysInactiveRule} | ${'01.01.2025'} | ${'01.05.2024'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${partialInput} | ${invalidInput} | ${alwaysInactiveRule} | ${'01.05.2024'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${maxInput}     | ${minInput}     | ${undefined}          | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${alwaysActiveRule}   | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${isInactiveRule}     | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${alwaysInactiveRule} | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${false}  | ${validInput}   | ${invalidInput} | ${undefined}          | ${validInput}   | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${undefined}          | ${''}           | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${alwaysActiveRule}   | ${validInput}   | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${alwaysActiveRule}   | ${''}           | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${isInactiveRule}     | ${'31.12.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${isInactiveRule}     | ${''}           | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${undefined}          | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${undefined}          | ${'01.01.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${undefined}          | ${'01.05.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${undefined}          | ${''}           | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${alwaysActiveRule}   | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.01.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${alwaysActiveRule}   | ${''}           | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${isInactiveRule}     | ${'30.04.2024'} | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${isInactiveRule}     | ${'31.12.2024'} | ${'31.12.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${isInactiveRule}     | ${'30.04.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${isInactiveRule}     | ${''}           | ${'30.04.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${undefined}          | ${'01.02.2025'} | ${'01.02.2025'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${alwaysActiveRule}   | ${'01.02.2025'} | ${'01.02.2025'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${isInactiveRule}     | ${'31.01.2025'} | ${'31.01.2025'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
  `(
    'Пропсы: showError:$showError,isInactiveRule:$isInactiveRule, при записи значения мин $minValue и макс $maxValue в инпут выводится: $value, а ошибка - $error',
    async ({ showError, minValue, maxValue, isInactiveRule, resultMin, resultMax, error }) => {
      const wrapper = getDateRangeInput({ showError, isInactiveRule });
      const inputMin = wrapper.findAll('input')[0];
      const inputMax = wrapper.findAll('input')[1];

      inputMin.element.value = minValue;
      await inputMin.trigger('change');

      inputMax.element.value = maxValue;
      await inputMax.trigger('change');

      expect(inputMin.element.value).toBe(resultMin);
      expect(inputMax.element.value).toBe(resultMax);
      if (error) {
        expect(wrapper.text()).toContain(error);
      }
    },
  );

  test.each`
    showError | minValue        | maxValue        | isInactiveRule        | resultMin       | resultMax       | error
    ${true}   | ${validInput}   | ${invalidInput} | ${undefined}          | ${validInput}   | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${validInput}   | ${undefined}          | ${''}           | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${invalidInput} | ${alwaysActiveRule}   | ${validInput}   | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${validInput}   | ${alwaysActiveRule}   | ${''}           | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${invalidInput} | ${isInactiveRule}     | ${validInput}   | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${validInput}   | ${isInactiveRule}     | ${''}           | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${invalidInput} | ${alwaysInactiveRule} | ${validInput}   | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${validInput}   | ${undefined}          | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validInput}   | ${partialInput} | ${undefined}          | ${'01.01.2025'} | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${invalidInput} | ${undefined}          | ${'01.05.2024'} | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${partialInput} | ${undefined}          | ${''}           | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${validInput}   | ${alwaysActiveRule}   | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${true}   | ${validInput}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.01.2025'} | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${invalidInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${''}           | ${undefined}
    ${true}   | ${invalidInput} | ${partialInput} | ${alwaysActiveRule}   | ${''}           | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${validInput}   | ${isInactiveRule}     | ${'01.05.2024'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${partialInput} | ${isInactiveRule}     | ${'01.01.2025'} | ${'01.05.2024'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${partialInput} | ${invalidInput} | ${isInactiveRule}     | ${'01.05.2024'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${partialInput} | ${isInactiveRule}     | ${''}           | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${validInput}   | ${alwaysInactiveRule} | ${'01.05.2024'} | ${'01.01.2025'} | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${partialInput} | ${alwaysInactiveRule} | ${'01.01.2025'} | ${'01.05.2024'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${partialInput} | ${invalidInput} | ${alwaysInactiveRule} | ${'01.05.2024'} | ${''}           | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${maxInput}     | ${minInput}     | ${undefined}          | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${alwaysActiveRule}   | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${isInactiveRule}     | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${true}   | ${maxInput}     | ${minInput}     | ${alwaysInactiveRule} | ${'01.02.2025'} | ${'01.01.2025'} | ${'Начальная дата не может быть позже конечной'}
    ${false}  | ${validInput}   | ${invalidInput} | ${undefined}          | ${validInput}   | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${undefined}          | ${''}           | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${alwaysActiveRule}   | ${validInput}   | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${alwaysActiveRule}   | ${''}           | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${isInactiveRule}     | ${'31.12.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${isInactiveRule}     | ${''}           | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${undefined}          | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${undefined}          | ${'01.05.2024'} | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${undefined}          | ${'01.05.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${undefined}          | ${''}           | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${alwaysActiveRule}   | ${'01.05.2024'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${alwaysActiveRule}   | ${''}           | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${isInactiveRule}     | ${'30.04.2024'} | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${isInactiveRule}     | ${'30.04.2024'} | ${'30.04.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${isInactiveRule}     | ${'30.04.2024'} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${isInactiveRule}     | ${''}           | ${'30.04.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${validInput}   | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${undefined}          | ${'01.01.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${alwaysActiveRule}   | ${'01.01.2025'} | ${'01.01.2025'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${isInactiveRule}     | ${'31.12.2024'} | ${'31.12.2024'} | ${undefined}
    ${false}  | ${maxInput}     | ${minInput}     | ${alwaysInactiveRule} | ${''}           | ${''}           | ${undefined}
  `(
    'Пропсы: showError:$showError,isInactiveRule:$isInactiveRule, при записи значения мин $minValue и макс $maxValue в инпут выводится: $value, а ошибка - $error',
    async ({ showError, minValue, maxValue, isInactiveRule, resultMin, resultMax, error }) => {
      const wrapper = getDateRangeInput({ showError, isInactiveRule });
      const inputMin = wrapper.findAll('input')[0];
      const inputMax = wrapper.findAll('input')[1];

      inputMax.element.value = maxValue;
      await inputMax.trigger('change');

      inputMin.element.value = minValue;
      await inputMin.trigger('change');

      expect(inputMin.element.value).toBe(resultMin);
      expect(inputMax.element.value).toBe(resultMax);
      if (error) {
        expect(wrapper.text()).toContain(error);
      }
    },
  );
});
