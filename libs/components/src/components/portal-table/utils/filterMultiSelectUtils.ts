import { unref, type MaybeRef } from 'vue';
import type { LocationQueryValueRaw, Router } from 'vue-router';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import {
  ColumnFilterMultiSelectSwitchState,
  type ColumnFilterSwitchMultiSelectForm,
} from '@comp/components/portal-table/utils/models';
import { type TColumnControlFilterSingleCommon } from '@comp/components/portal-table/utils/models';

/**
 * Преобразовать выбранные значения в строки для query-параметра фильтра с множественным выбором
 * @param switchState Состояние переключателя фильтра
 * @param selectedOptions Выбранные элементы фильтра
 * @returns Значение для query-параметра.
 *
 * Undefined, если cостояние переключателя = NotApply.
 *
 * Null, если cостояние переключателя = SelectZero
 *
 * Массив строк, в остальных случаях
 */
export const getQueryParamValueForMultiSelectSwitch = (
  switchState: ColumnFilterMultiSelectSwitchState,
  selectedOptions: ISelectItem[] | undefined,
): LocationQueryValueRaw | LocationQueryValueRaw[] => {
  if (switchState === ColumnFilterMultiSelectSwitchState.NotApply) {
    return undefined;
  }

  if (switchState === ColumnFilterMultiSelectSwitchState.SelectZero) {
    return null;
  }

  return selectedOptions?.map((selectedOption) => selectedOption.value);
};

/**
 * Получить правило валидации фильтра с множественным выбором
 * @param form Параметры формы
 * @returns Правило валидации
 */
export const getColumnFilterSwitchMultiSelectRequireRule = (form: ColumnFilterSwitchMultiSelectForm) =>
  (form.radio === ColumnFilterMultiSelectSwitchState.FromSelect &&
    form.selectedOptions &&
    form.selectedOptions.length > 0) ||
  form.radio === ColumnFilterMultiSelectSwitchState.NotApply ||
  form.radio === ColumnFilterMultiSelectSwitchState.SelectZero;

/**
 * Получить состояние переключателя фильтра с множественным выбором
 * @param selectedOptions Выбранные элементы фильтра
 * @returns Состояние переключателя
 */
export const getMultiSelectSwitchState = (selectedOptions?: ISelectItem[]): ColumnFilterMultiSelectSwitchState => {
  if (!selectedOptions) return ColumnFilterMultiSelectSwitchState.NotApply;

  if (selectedOptions.length === 0) return ColumnFilterMultiSelectSwitchState.SelectZero;

  return ColumnFilterMultiSelectSwitchState.FromSelect;
};

/**
 * Получить query-параметры из URL и преобразовать в массив ISelectItem для вывода в фильтре с множественным выбором
 * @param router Маршрутизатор
 * @param columnControl Контрол выпадающего списка
 * @returns Массив выбранных элементов выпадающего списка или undefined.
 *
 * Массив пустой, если query-параметр пустой (значение query-параметра = null).
 * Undefined, если query-параметр не найден
 * Массив не пустой, если query-параметр содержит хотя бы одно значение
 */
export const getColumnControlOptionsForMultiSelect = (
  router: Router,
  columnControl: TColumnControlFilterSingleCommon,
  options?: MaybeRef<ISelectItem[]>,
): ISelectItem<string>[] | undefined => {
  const queryParamValue = router.currentRoute.value.query[columnControl.column];
  const optionsUnref = unref(options);

  if (queryParamValue instanceof Array) {
    return optionsUnref?.filter((option) => queryParamValue.includes(option.value));
  }

  if (queryParamValue) {
    const filtered = optionsUnref?.find((option) => queryParamValue === option.value);

    return filtered ? [filtered] : undefined;
  }

  if (queryParamValue === null) return [];

  return undefined;
};

/**
 * Получение пустого фильтра с множественным выбором
 * @returns Параметры формы:
 * Массив выбранных элементов = undefined
 * Состояние переключателя = расчитывается в соответствии с выбранными элементами
 */
export const getInitialMultiSelectSwitchForm = (): ColumnFilterSwitchMultiSelectForm => ({
  selectedOptions: undefined,
  radio: getMultiSelectSwitchState(undefined),
});
