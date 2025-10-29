import { unref, type MaybeRef } from 'vue';
import type { Router } from 'vue-router';
import { getFirst } from '@comp/utils/array';
import { makeMsDate, parseMsDate } from '@comp/utils/date';
import {
  type ColumnFilterDateRangeForm,
  type TColumnControlFilterDateRange,
} from '@comp/components/portal-table/utils/models';
import { type QueryParam } from '@comp/components/portal-table/utils/models';
import { getQueryParamByKey } from '@comp/components/portal-table/utils/queryParamUtils';

/**
 * Получение минимального и максимального дат из URL для фильтра с выбором диапазона дат
 * @param router Маршрутизатор
 * @param columnControl Контрол фильтра с выбором диапазона дат
 * @returns Параметры формы:
 *
 * Минимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Дата - в остальных случаях
 * Максимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Дата - в остальных случаях
 *
 */
export const getDateRangeFromUrl = (
  router: Router,
  columnControl: TColumnControlFilterDateRange,
): ColumnFilterDateRangeForm =>
  getDateRangeFromQueryParams(
    getQueryParamByKey(router, columnControl.minValueName),
    getQueryParamByKey(router, columnControl.maxValueName),
  );

/**
 * Получение минимальной и максимальной дат из query-параметров для фильтра с выбором диапазона дат
 * @param queryParamMin query-параметр с минимальной датой
 * @param queryParamMax query-параметр максимальной датой
 * @returns Параметры формы:
 *
 * Минимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Дата - в остальных случаях
 * Максимальное значение = undefined, если query-параметр отсутствует или значение параметра пусто. Дата - в остальных случаях
 *
 */
export const getDateRangeFromQueryParams = (
  queryParamMin: QueryParam | undefined,
  queryParamMax: QueryParam | undefined,
): ColumnFilterDateRangeForm => {
  const queryParamValueMin = getFirst(queryParamMin?.value);
  const queryParamValueMax = getFirst(queryParamMax?.value);

  return {
    minValue: queryParamValueMin ? parseMsDate(queryParamValueMin.toString()) : undefined,
    maxValue: queryParamValueMax ? parseMsDate(queryParamValueMax.toString()) : undefined,
  };
};

/**
 * Преобразовать даты в строковые значения для query-параметра фильтра с выбором диапазона дат
 * @param minValue Минимальная дата
 * @param maxValue Максимальная дата
 * @returns Объект, где minValue - строка с минимальной датой, maxValue - строка с максимальной датой
 */
export const getQueryParamValueForDateRange = (
  minValue: Date | undefined,
  maxValue: Date | undefined,
): { minValue: string | undefined; maxValue: string | undefined } => ({
  minValue: minValue ? makeMsDate(minValue) : undefined,
  maxValue: maxValue ? makeMsDate(maxValue) : undefined,
});

/**
 * Получение пустых минимального и максимального дат
 * @returns Параметры формы:
 * Минимальное значение = минимальная дата по умолчанию, либо undefined
 * Максимальное значение = максимальная дата по умолчанию, либо undefined
 */
export const getInitialDateRangeForm = (columnControl: TColumnControlFilterDateRange): ColumnFilterDateRangeForm => ({
  minValue: columnControl.defaultMinValueDate,
  maxValue: columnControl.defaultMaxValueDate,
});

/**
 * Получить query-параметры по умолчанию для фильтра с выбором диапазона дат, если нет текущих query-параметров в url
 * @param columnControl Контрол фильтра с выбором диапазона дат
 * @param currentQueryParamMin Текущий query-параметр с минимальной датой из url
 * @param currentQueryParamMax Текущий query-параметр с максимальной датой из url
 * @returns Массив query-параметров по умолчанию. Undefined, если даты по умолчанию не заданы, либо текущие query-параметры есть в url
 */
export const getInitialQueryParams = (
  columnControl: TColumnControlFilterDateRange,
  currentQueryParamMin: MaybeRef<QueryParam | undefined>,
  currentQueryParamMax: MaybeRef<QueryParam | undefined>,
): QueryParam[] | undefined => {
  const { minValue, maxValue } = getQueryParamValueForDateRange(
    columnControl.defaultMinValueDate,
    columnControl.defaultMaxValueDate,
  );

  const initialQueryParams: QueryParam[] = [];

  if (!unref(currentQueryParamMin)?.value && minValue)
    initialQueryParams.push({
      key: columnControl.minValueName,
      value: minValue,
    });

  if (!unref(currentQueryParamMax)?.value && maxValue)
    initialQueryParams.push({
      key: columnControl.maxValueName,
      value: maxValue,
    });

  return initialQueryParams.length ? initialQueryParams : undefined;
};
