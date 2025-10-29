/* tslint:disable no-bitwise*/
import type { ISelectItem } from '@comp/components/selects/utils/models';
import { compareByStringKey, SortType } from '@comp/utils/compare';

/**
 * Преобразовать первый символ строки в прописной формат
 * @param str
 */
export const uppercaseFirst = (str: string): string => {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

/**
 * Отсортировать массив ISelectItem по свойству title.
 * @param array Массив ISelectItem
 * @param sortType Тип сортировки
 * @returns Отсортированная копия переданного параметром array массива
 */
export const sortISelectItems = (array: ISelectItem[], sortType: SortType) =>
  [...array].sort(compareByStringKey('title', sortType));

export const removePxMeasureFromValue = (stringWithPx: string) => {
  if (stringWithPx.toLowerCase().endsWith('px')) {
    return Number(stringWithPx.slice(0, -2));
  }

  return Number(stringWithPx);
};
