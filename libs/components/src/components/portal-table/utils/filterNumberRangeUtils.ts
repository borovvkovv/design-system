import type { Router } from 'vue-router';
import { stringToNumber } from '@comp/utils/number';
import { getFirst } from '@comp/utils/array';
import { type TColumnControlFilterRangeCommon } from '@comp/components/portal-table/utils/models';
import { type QueryParam, type ColumnFilterNumberRangeForm } from '@comp/components/portal-table/utils/models';
import { getQueryParamByKey } from '@comp/components/portal-table/utils/queryParamUtils';

/**
 * Получение минимального и максимального значений из URL для фильтра с выбором диапазона чисел
 * @param router Маршрутизатор
 * @param columnControl Контрол фильтра с выбором диапазона чисел
 * @returns Параметры формы:
 *
 * Минимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Число - в остальных случаях
 * Максимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Число - в остальных случаях
 *
 */
export const getNumberRangeFromUrl = (
  router: Router,
  columnControl: TColumnControlFilterRangeCommon,
): ColumnFilterNumberRangeForm =>
  getNumberRangeFromQueryParams(
    getQueryParamByKey(router, columnControl.minValueName),
    getQueryParamByKey(router, columnControl.maxValueName),
  );

/**
 * Получение минимального и максимального чисел из query-параметров для фильтра с выбором диапазона чисел
 * @param queryParamMin query-параметр с минимальным числом
 * @param queryParamMax query-параметр с максимальным числом
 * @returns Параметры формы:
 *
 * Минимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Число - в остальных случаях
 * Максимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Число - в остальных случаях
 *
 */
export const getNumberRangeFromQueryParams = (
  queryParamMin: QueryParam | undefined,
  queryParamMax: QueryParam | undefined,
): ColumnFilterNumberRangeForm => {
  const queryParamValueMin = getFirst(queryParamMin?.value);
  const queryParamValueMax = getFirst(queryParamMax?.value);

  return {
    minValue: stringToNumber(queryParamValueMin?.toString() ?? ''),
    maxValue: stringToNumber(queryParamValueMax?.toString() ?? ''),
  };
};

/**
 * Получение пустых минимального и максимального чисел
 * @returns Параметры формы:
 * Минимальное значение = undefined
 * Максимальное значение = undefined
 */
export const getInitialNumberRangeForm = (): ColumnFilterNumberRangeForm => ({
  minValue: undefined,
  maxValue: undefined,
});
