import { unref, type MaybeRef } from 'vue';
import type { LocationQueryRaw, LocationQueryValueRaw, Router } from 'vue-router';
import { getFirst } from '@comp/utils/array';
import { type QueryParam } from '@comp/components/portal-table/utils/models';

/**
 * Найти query-параметр в URL, и получить его значение в виде строки
 * @param router Маршрутизатор
 * @param key Ключ
 * @returns Значение query-параметра или undefined, если параметр не найден
 */
export const getQueryParamValueAsString = (router: Router, key: string): string | undefined => {
  const queryParamValue = getQueryParamByKey(router, key)?.value;
  const firstQueryParamValue = getFirst(queryParamValue);

  return firstQueryParamValue?.toString() ?? undefined;
};

/**
 * Добавить/перезаписать query-парамтеры в URL
 * @param router Маршрутизатор
 * @param queryParam Query-параметры
 */
export const addQueryParamToUrl = (router: Router, queryParam: QueryParam | QueryParam[]) => {
  const queryParamAsArray = queryParam instanceof Array ? queryParam : [queryParam];

  const locationQueryRaw = queryParamAsArray.reduce<LocationQueryRaw>(
    (locationQueryRaw, queryParam) => Object.assign(locationQueryRaw, { [queryParam.key]: queryParam.value }),
    {},
  );

  router.push({
    path: router.currentRoute.value.path,
    query: { ...router.currentRoute.value.query, ...locationQueryRaw },
  });
};

/**
 * Получить query-параметр из URL по ключу
 * @param router Маршрутизатор
 * @param key Ключ
 * @returns Объект - key = ключ query-параметра, value = значение query-параметра.
 * Undefined - если query-параметр с переданным ключом не найден
 */
export const getQueryParamByKey = (router: Router, key: string): QueryParam | undefined => {
  const queryParamValue = router.currentRoute.value.query[key];

  return queryParamValue
    ? {
        key,
        value: queryParamValue,
      }
    : undefined;
};

/**
 * Получение одного значения query-параметра из массива по ключу
 * @param queryParams Массив query-параметров
 * @param key Ключ
 * @returns Значение query-параметра, либо undefined, если query-параметр не найден
 */
export const getQueryParamValueByKey = (
  queryParams: MaybeRef<QueryParam[] | undefined>,
  key: string,
): LocationQueryValueRaw => getFirst(getQueryParamValuesByKey(queryParams, key));

/**
 * Получение значения(-й) query-параметра из массива по ключу
 * @param queryParams Массив query-параметров
 * @param key Ключ
 * @returns Значение(-я) query-параметра, либо undefined, если query-параметр не найден
 */
export const getQueryParamValuesByKey = (
  queryParams: MaybeRef<QueryParam[] | undefined>,
  key: string,
): LocationQueryValueRaw | LocationQueryValueRaw[] => getQueryParamFromArrayByKey(queryParams, key)?.value;

/**
 * Получение query-параметра из массива по ключу
 * @param queryParams Массив query-параметров
 * @param key Ключ
 * @returns query-параметр, либо undefined, если query-параметр не найден
 */
export const getQueryParamFromArrayByKey = (
  queryParams: MaybeRef<QueryParam[] | undefined>,
  key: string,
): QueryParam | undefined => unref(queryParams)?.find((queryParam) => queryParam.key === key);

/**
 * Получение одного значения query-параметра в виде строки из массива по ключу
 * @param queryParams Массив query-параметров
 * @param key Ключ
 * @returns Значение query-параметра в виде строки или undefined, если параметр не найден
 */
export const getQueryParamValueAsStringByKey = (
  queryParams: MaybeRef<QueryParam[] | undefined>,
  key: string,
): string | undefined => {
  const firstQueryParamValue = getFirst(getQueryParamValuesByKey(queryParams, key));

  return firstQueryParamValue?.toString() ?? undefined;
};
