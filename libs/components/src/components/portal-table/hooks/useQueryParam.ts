import { computed, ref, watch } from 'vue';
import type { Router } from 'vue-router';
import type { QueryParam, TColumnControlFilterSingleCommon } from '../utils/models';
import { addQueryParamToUrl, getQueryParamByKey } from '../utils/queryParamUtils';

/**
 * Работа с параметрами URL
 * @param router Маршрутизатор
 * @param columnControl Контрол столбца портальной таблицы
 * @returns Объект:
 *
 * addNewQueryParamToUrl - добавление query-параметра в URL.
 * queryParam - текущий query-параметр из URL для данного контрола столбца
 */
export const useQueryParam = (router: Router, columnControl: TColumnControlFilterSingleCommon) => {
  const queryParamKey = computed<string>(() => columnControl.column);
  const queryParam = ref<QueryParam | undefined>(getQueryParamByKey(router, queryParamKey.value));

  /**
   * Добавление query-параметра в URL
   *
   * Если параметр уже существует - значение параметра перезапишется.
   *
   * Если знчение = undefined - параметр удаляется из URL
   * @param queryParam query-параметр
   */
  const addNewQueryParamToUrl = (queryParam: QueryParam | QueryParam[] | undefined) => {
    if (queryParam) addQueryParamToUrl(router, queryParam);
  };

  watch(
    () => router.currentRoute.value.query,
    () => (queryParam.value = getQueryParamByKey(router, queryParamKey.value)),
  );

  return {
    addNewQueryParamToUrl,
    queryParam,
  };
};
