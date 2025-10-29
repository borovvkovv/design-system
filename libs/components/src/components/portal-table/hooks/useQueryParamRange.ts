import { ref, watch } from 'vue';
import type { Router } from 'vue-router';
import type { QueryParam, TColumnControlFilterRangeCommon } from '@comp/components/portal-table/utils/models';
import { addQueryParamToUrl, getQueryParamByKey } from '../utils/queryParamUtils';

/**
 * Работа с параметрами URL, показывающими диапазон
 * @param router Маршрутизатор
 * @param columnControl Контрол столбца портальной таблицы с диапазоном
 * @returns Объект:
 *
 * addNewQueryParamToUrl - добавление query-параметров в URL.
 * queryParam - текущие query-параметры из URL для данного контрола столбца
 */
export const useQueryParamRange = (router: Router, columnControl: TColumnControlFilterRangeCommon) => {
  const queryParamMin = ref<QueryParam | undefined>(getQueryParamByKey(router, columnControl.minValueName));
  const queryParamMax = ref<QueryParam | undefined>(getQueryParamByKey(router, columnControl.maxValueName));

  /**
   * Добавление query-параметров в URL.
   *
   * Если параметр уже существует - значение параметра перезапишется.
   *
   * Если знчение = undefined - параметр удаляется из URL
   * @param queryParam query-параметры
   */
  const addNewQueryParamToUrl = (queryParam: QueryParam[] | QueryParam | undefined) => {
    if (queryParam) addQueryParamToUrl(router, queryParam);
  };

  watch(
    () => router.currentRoute.value.query,
    () => {
      queryParamMin.value = getQueryParamByKey(router, columnControl.minValueName);
      queryParamMax.value = getQueryParamByKey(router, columnControl.maxValueName);
    },
  );

  return {
    addNewQueryParamToUrl,
    queryParamMin,
    queryParamMax,
  };
};
