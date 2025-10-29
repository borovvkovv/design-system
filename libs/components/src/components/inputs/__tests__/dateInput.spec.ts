import { beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import DateInput from '@comp/components/inputs/DateInput.vue';
import IconMarker from '@comp/components/icons/IconMarker.vue';
import IconCalendar from '@comp/components/icons/IconCalendar.vue';
import { CalendarType } from '@comp/components/calendars/utils/models';

const validDate = new Date(2025, 0, 1);
const validInput = '01.01.2025';
const partialDate = new Date(NaN, 4, NaN);
const partialInput = '01.05';
const invalidDate = new Date(NaN, NaN, NaN);
const invalidInput = 'test';
const alwaysActiveRule = () => false;
const isInactiveRule = (date: Date) => date.getDate() === 1;
const alwaysInactiveRule = () => true;

const getDateInput = (props?: Partial<InstanceType<typeof DateInput>['$props']>) => {
  const wrapper = mount(DateInput, {
    props: {
      modelValue: new Date(),
      size: Size.S,
      label: 'Test label',
      disabled: false,
      minWidth: 10,
      isNotPreventDefaultEnter: false,
      required: false,
      placeholder: 'Test placeholder',
      calendarType: CalendarType.month,
      isInactiveRule: () => false,
      showError: false,
      inactiveErrorText: 'Test inactiveErrorText',
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент DateInput', () => {
  beforeAll(() => {
    vi.setSystemTime(new Date(2024, 0, 1));
  });

  test('Правая иконка инпута в виде календаря', async () => {
    const wrapper = getDateInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconCalendar).exists()).toBeTruthy();
  });

  test('При нажатии на правую иконку вызывается эмит click:iconRight', async () => {
    const wrapper = getDateInput();
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('click:iconRight')).toBeUndefined();

    await wrapper.findComponent(IconCalendar).trigger('click');

    expect(wrapper.emitted('click:iconRight')).toHaveLength(1);
  });

  test('Инпут блокируется при disabled=true', async () => {
    const wrapper = getDateInput({ disabled: true });

    expect(wrapper.find('input').element.disabled).toBeTruthy();
  });

  test('Если задана подпись через проп, то она отображается', async () => {
    const wrapper = getDateInput();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если инпут обязателен к заполнению, то к подписи добавляется красная метка', async () => {
    const wrapper = getDateInput({ required: true });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMarker).exists()).toBeTruthy();
  });

  test('Плейсхолдер задан либо из пропа, либо из конфига IMask', async () => {
    const wrapper = getDateInput();
    const input = wrapper.find('input');

    expect(input.element.placeholder).toBe('Test placeholder');

    await wrapper.setProps({ placeholder: undefined });

    expect(input.element.placeholder).toBe('ДД.ММ.ГГГГ');
  });

  test.each`
    showError | modelValue     | isInactiveRule        | value           | error
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
    ({ showError, modelValue, isInactiveRule, value, error }) => {
      const wrapper = getDateInput({ modelValue, showError, isInactiveRule });
      const input = wrapper.find('input');

      if (error) {
        expect(wrapper.text()).toContain(error);
      }
      expect(input.element.value).toBe(value);
    },
  );

  test.each`
    showError | modelValue      | isInactiveRule        | value           | error
    ${true}   | ${validInput}   | ${undefined}          | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${alwaysActiveRule}   | ${validInput}   | ${undefined}
    ${true}   | ${validInput}   | ${isInactiveRule}     | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${validInput}   | ${alwaysInactiveRule} | ${validInput}   | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${undefined}          | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${undefined}
    ${true}   | ${partialInput} | ${isInactiveRule}     | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${partialInput} | ${alwaysInactiveRule} | ${'01.05.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${undefined}          | ${'01.01.2024'} | ${undefined}
    ${true}   | ${invalidInput} | ${alwaysActiveRule}   | ${'01.01.2024'} | ${undefined}
    ${true}   | ${invalidInput} | ${isInactiveRule}     | ${'01.01.2024'} | ${'Test inactiveErrorText'}
    ${true}   | ${invalidInput} | ${alwaysInactiveRule} | ${'01.01.2024'} | ${'Test inactiveErrorText'}
    ${false}  | ${validInput}   | ${undefined}          | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${alwaysActiveRule}   | ${validInput}   | ${undefined}
    ${false}  | ${validInput}   | ${isInactiveRule}     | ${'31.12.2024'} | ${undefined}
    ${false}  | ${validInput}   | ${alwaysInactiveRule} | ${''}           | ${undefined}
    ${false}  | ${partialInput} | ${undefined}          | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${alwaysActiveRule}   | ${'01.05.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${isInactiveRule}     | ${'30.04.2024'} | ${undefined}
    ${false}  | ${partialInput} | ${alwaysInactiveRule} | ${''}           | ${undefined}
    ${false}  | ${invalidInput} | ${undefined}          | ${'01.01.2024'} | ${undefined}
    ${false}  | ${invalidInput} | ${alwaysActiveRule}   | ${'01.01.2024'} | ${undefined}
    ${false}  | ${invalidInput} | ${isInactiveRule}     | ${'31.12.2023'} | ${undefined}
    ${false}  | ${invalidInput} | ${alwaysInactiveRule} | ${''}           | ${undefined}
  `(
    'Пропсы: showError:$showError,isInactiveRule:$isInactiveRule, при записи значения $modelValue в инпут выводится: $value, а ошибка - $error',
    async ({ showError, modelValue, isInactiveRule, value, error }) => {
      const wrapper = getDateInput({ showError, isInactiveRule });
      const input = wrapper.find('input');

      input.element.value = modelValue;
      await input.trigger('change');

      if (error) {
        expect(wrapper.text()).toContain(error);
      }
      expect(input.element.value).toBe(value);
    },
  );
});
