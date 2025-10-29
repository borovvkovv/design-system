import type { LocationQueryValueRaw } from 'vue-router';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import {
  ColumnFilterSelectSwitchState,
  type ColumnFilterSwitchSelectForm,
} from '@comp/components/portal-table/utils/models';

/**
 * Получить значение для query-параметра фильтра с выбором
 * @param switchState Состояние переключателя фильтра
 * @param selectedOption Выбранный элемент фильтра
 * @returns Значение для query-параметра.
 *
 * Undefined, если cостояние переключателя = All.
 *
 * String - в остальных случаях
 */
export const getQueryParamValueForSelectSwitch = (
  switchState: ColumnFilterSelectSwitchState,
  selectedOption: ISelectItem | undefined,
): LocationQueryValueRaw | LocationQueryValueRaw[] =>
  switchState === ColumnFilterSelectSwitchState.All ? undefined : selectedOption?.value;

/**
 * Получить состояние переключателя фильтра с выбором
 * @param selectedOption Выбранный элемент фильтра
 * @returns Состояние переключателя
 */
export const getSelectSwitchState = (selectedOption: ISelectItem | undefined): ColumnFilterSelectSwitchState =>
  selectedOption ? ColumnFilterSelectSwitchState.FromSelect : ColumnFilterSelectSwitchState.All;

/**
 * Получить правило валидации фильтра с выбором
 * @param form Параметры формы
 * @returns Правило валидации
 */
export const getColumnFilterSwitchSelectRequireRule = (form: ColumnFilterSwitchSelectForm) =>
  (form.radio === ColumnFilterSelectSwitchState.FromSelect && !!form.selectedOption) ||
  form.radio === ColumnFilterSelectSwitchState.All;

/**
 * Получение пустого фильтра с выбором
 * @returns Параметры формы:
 * Выбранный элемент = undefined
 * Состояние переключателя = рассчитывается в соответствии с выбранным элементом
 */
export const getInitialSelectSwitchForm = (): ColumnFilterSwitchSelectForm => ({
  selectedOption: undefined,
  radio: getSelectSwitchState(undefined),
});
