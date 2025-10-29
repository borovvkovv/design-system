import { computed, ref, unref, type MaybeRef } from 'vue';
import type { Router } from 'vue-router';
import { SortType } from '@comp/utils/compare';
import { equalsOrIncludes } from '@comp/utils/array';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import {
  type ColumnSetting,
  type TPortalHeaderCell,
  type TPortalHeaderRow,
  type IPortalTableFilterRef,
  type PortalTableFilterInfo,
  type PortalTableFilter,
  type ISelectedOption,
} from '@comp/components/portal-table/utils/models';
import { type QueryParam, type TColumnControlFilterSingleCommon } from '@comp/components/portal-table/utils/models';
import { getSelectItemsWithUniqueTitles } from '@comp/components/selects/utils';
import {
  getHeaderCellTitle,
  getLastVisiblePortalHeaderCellIndex,
} from '@comp/components/portal-table/utils/headerUtils';
import { addQueryParamToUrl, getQueryParamValueAsString } from '@comp/components/portal-table/utils/queryParamUtils';

/**
 * Обновить данные о столбцах у ячеек шапки таблицы с помощью настройки столбцов. Обратное действие - headerCellsToColumnSettings
 * @param columnSettings Настройки столбцов
 * @param cells Ячейки шапки таблицы
 * @returns Ячейки шапки таблицы с обновленными данными о столбцах
 */
export const columnSettingsToHeaderCells = <T>(
  columnSettings: ColumnSetting[],
  cells?: TPortalHeaderCell<T>[],
): TPortalHeaderCell<T>[] => {
  const sortedColumnSettingsByOrderIndex = [...columnSettings].sort(
    (setting1, setting2) => setting1.index - setting2.index,
  );

  const lastVisibleHeaderCellIndex = getLastVisiblePortalHeaderCellIndex(sortedColumnSettingsByOrderIndex);

  return (
    cells?.map((cell, cellIndex) => {
      return {
        ...cell,
        isHidden: columnSettings[cellIndex].isHidden,
        index: columnSettings[cellIndex].index,
        isLastVisibleCell: columnSettings[cellIndex].index === lastVisibleHeaderCellIndex,
      };
    }) ?? []
  );
};

/**
 * Собрать данные о настройках столбцов с ячеек шапки таблицы. Обратное действие - columnSettingsToHeaderCells
 * @param cells Ячейки шапки таблицы
 * @returns Настройки столбцов
 */
export const headerCellsToColumnSettings = <T>(cells?: TPortalHeaderCell<T>[]): ColumnSetting[] =>
  cells?.map((cell, cellIndex) => ({
    title: getHeaderCellTitle(cell),
    isDisabled: cell.isDisabled ?? false,
    isHidden: cell.isHidden ?? false,
    isHiddenInitially: cell.isHidden ?? false,
    index: cell.index ?? cellIndex,
    initialIndex: cell.index ?? cellIndex,
    columnIndexes: getColumnIndexByHeaderCellIndex(cells, cellIndex),
  })) ?? [];

/**
 * Сбросить фильтры/сортировку на столбцах, которые скрыты
 * @param header Шапка таблицы
 * @param columnSettings Настройки для столбца таблицы
 * @returns Шапка таблицы со сброшенными фильтрами/сортировкой
 */
export const resetColumnQueryParamIfColumnHidden = <T>(
  header: TPortalHeaderRow<T> | undefined,
  router: Router,
): void => {
  const queryParamsKeys: string[] = [];

  header?.cells.forEach((cell) => {
    if (cell.isHidden)
      cell.controls?.forEach((control) => {
        if (control.type === 'filterNumberRange' || control.type === 'filterDateRange')
          queryParamsKeys.push(...[control.minValueName, control.maxValueName]);
        else queryParamsKeys.push(control.column);
      });
  });

  addQueryParamToUrl(
    router,
    queryParamsKeys.map((key) => ({ key, value: undefined })),
  );
};

/**
 * Изменить query-параметры согласно фильтрам
 * @param router Маршрутизатор
 * @param filterRefs Фильтры
 */
export const applyFilters = (router: Router, filterRefs: IPortalTableFilterRef[]): void => {
  const queryParams: QueryParam[] = [];
  filterRefs.forEach((filterRef) => {
    const queryParam = filterRef.getQueryParam();
    if (queryParam instanceof Array) queryParams.push(...queryParam);
    else queryParams.push(queryParam);
  });

  addQueryParamToUrl(router, queryParams);
};

/**
 * Собрать информацию о фильтрах в ячейках хэдера
 * @param header Хэдер
 * @returns Массив данных о фильтрах:
 *
 * - контрол
 *
 * - индекс в массиве контролов ячейки хэдера
 *
 *  - индекс ячейки хэдера,
 *
 * - имя столбца, где работает фильтр
 */
export const getFilterInfoList = <T>(header: TPortalHeaderRow<T> | undefined) => {
  const filterInfoList: PortalTableFilterInfo<PortalTableFilter>[] = [];

  header?.cells.forEach((cell, cellIndex) => {
    if (!cell.isHidden) {
      cell.controls?.forEach((control, controlIndex) => {
        if (control.type !== 'sort') {
          filterInfoList.push({
            columnControl: control,
            columnControlIndex: controlIndex,
            headerCellIndex: cellIndex,
            headerTitle: getHeaderCellTitle(cell),
          });
        }
      });
    }
  });

  return filterInfoList;
};

/**
 * Получить query-параметр из URL и преобразовать в ISelectItem для вывода в выпадающем списке выбора
 * @param router Маршрутизатор
 * @param columnControl Контрол выпадающего списка
 * @param options Все элементы выпадающего списка.
 * Используется для нахождения элемента списка, значение которого совпадает со значением соответствующего query-параметра из URL
 * @returns Выбранный элемент выпадающего списка или undefined. Если список undefined, то создать новый ISelectItem
 *
 * Undefined, если query-параметр не найден
 * Объект ISelectItem, если query-параметр не пуст
 */
export const getColumnControlOption = (
  router: Router,
  columnControl: TColumnControlFilterSingleCommon,
  options?: MaybeRef<ISelectItem[]>,
): ISelectItem | undefined => {
  const queryParamValue = getQueryParamValueAsString(router, columnControl.column);
  const optionsUnref = unref(options);

  return optionsUnref
    ? optionsUnref.find((option) => option.value === queryParamValue)
    : queryParamValue
      ? {
          title: queryParamValue,
          value: queryParamValue,
        }
      : undefined;
};

/**
 * Получение списка для отображения в фильтре с выбором/множественным выбором
 * @param columnControl Контрол выпадающего списка с выбором/множественным выбором
 * @returns Объект с параметрами:
 *
 * options - массив ISelectItem[] для отображения в фильтре
 *
 * isLoadingOptions - признак процесса загрузки списка
 *
 * isLoadingOptionsError - признак неудачной загрузки списка
 */
export const useFilterOptions = (columnControl: ISelectedOption) => {
  const columnData = columnControl.getColumnData();

  if (columnData instanceof Array) {
    const uniqueOptions = computed(() => getSelectItemsWithUniqueTitles(columnData, SortType.Asc));

    return {
      options: uniqueOptions,
      isLoadingOptions: ref(false),
      isLoadingOptionsError: ref(false),
    };
  }

  const { data, isLoading: isLoadingOptions, isLoadingError: isLoadingOptionsError } = columnData;
  const uniqueOptions = computed(() => getSelectItemsWithUniqueTitles(data.value, SortType.Asc));

  return {
    options: uniqueOptions,
    isLoadingOptions,
    isLoadingOptionsError,
  };
};

/**
 * Вычислить индекс(-ы) столбца(-ов) по индексу ячейки хэдера
 * @param headerCells Ячейки хэдера
 * @param headerCellIndex Индекс ячейки хэдера
 * @returns Индекс столбца. Может быть массивом, если ячейка хэдера объединяет несколько столбцов
 */
export const getColumnIndexByHeaderCellIndex = <T>(
  headerCells: TPortalHeaderCell<T>[],
  headerCellIndex: number,
): number | number[] => {
  const headerCellShift = headerCells
    .slice(0, headerCellIndex)
    .map((headerCell) => headerCell.colspan ?? 1)
    .reduce((sum, colSpan) => sum + colSpan, 0);

  const headerCellColumnCount = headerCells[headerCellIndex].colspan ?? 1;

  const headerCellColumnIndexes = Array(headerCellColumnCount)
    .fill(0)
    .map((_, i) => i + headerCellShift);

  return headerCellColumnCount === 1 ? headerCellShift : headerCellColumnIndexes;
};

/**
 * Вычислить индекс настройки столбца таблицы по индексу столбца
 * @param columnSettings Настройки столбцов таблицы
 * @param columnIndex Индекс столбца
 * @returns Индекс настройки столбца таблицы
 */
export const getColumnSettingIndexByColumnIndex = (columnSettings: ColumnSetting[], columnIndex: number): number => {
  const columnSettingsIndex = columnSettings.findIndex((columnSetting) =>
    equalsOrIncludes(columnSetting.columnIndexes, columnIndex),
  );
  if (columnSettingsIndex !== -1) return columnSettings[columnSettingsIndex].index;

  return 0;
};
