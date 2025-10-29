import { getFirst, replaceItemInArrayByIndex } from '@comp/utils/array';
import {
  type TColumnControl,
  type TPortalHeaderCell,
  type TPortalHeaderRow,
  DEFAULT_MIN_WIDTH_PX,
  type BaseColumnSetting,
} from '@comp/components/portal-table/utils/models';

/**
 * Получить имя столбца. В случаях, когда ячейка шапки таблциы содержит только иконку, небоходимо считывать параметр "stubText" у ячейки
 * @param headerCell Ячейка шапки табицы
 * @returns Имя стоблца, который возглавляет ячейка
 */
export const getHeaderCellTitle = <T>(headerCell: TPortalHeaderCell<T>) => {
  switch (headerCell.type) {
    case 'icon':
    case 'checkBox':
      return headerCell.stubText ?? '';
    case 'text':
      return headerCell.fullName ?? headerCell.text;
  }
};

/**
 * Получить либо шапку таблицы, либо первую строку шапки таблицы, если шапка многомерная
 * @param header Шапка таблицы, может быть массивом
 * @returns Шапка таблицы
 */
export const getHeaderOrFirstHeaderRow = <T>(header: TPortalHeaderRow<T> | TPortalHeaderRow<T>[]) => getFirst(header);

export const resetSortControl = (control: TColumnControl): TColumnControl =>
  control.type === 'sort' ? { ...control, sortOrder: undefined } : control;

export const resetHeaderCell = <T>(cell: TPortalHeaderCell<T>): TPortalHeaderCell<T> => ({
  ...cell,
  controls: cell.controls?.map(resetSortControl),
});

/**
 * Сортировка ячеек хэдера портальной таблицы по порядковому индексу
 * @param headerRowCells Ячейки
 * @returns Массив отсортированнных ячеек
 */
export const orderHeaderRow = <T>(headerRowCells: TPortalHeaderCell<T>[]) =>
  [...headerRowCells].sort((cell1, cell2) => (cell1.index ?? 0) - (cell2.index ?? 0));

/**
 * Инициализация некоторых паратров ячеек хэдера портальной таблицы перед ее использованием
 * @param headerRow Строка хэдера
 * @param cellElements html-элементы ячеек
 * @returns Строка хэдера с заполненными параметрами (width, minWidth, isLastVisibleCell)
 */
export const initializeHeaderRowCells = <T>(
  headerRow: TPortalHeaderRow<T>,
  cellElements: HTMLElement[] | undefined,
): TPortalHeaderRow<T> => {
  const orderedCells = orderHeaderRow(headerRow.cells);

  return {
    ...headerRow,
    cells: headerRow.cells.map((cell, cellIndex) => {
      const lastVisibleCellIndex = getLastVisiblePortalHeaderCellIndex(orderedCells);

      const cellElement = cellElements?.[cellIndex];
      let minWidth: number | undefined = undefined;
      const width = cellElement?.getBoundingClientRect().width;

      if (cellElement) {
        const minWidthStyle = window.getComputedStyle(cellElement).minWidth;
        const minWidthAsString = minWidthStyle.endsWith('px') ? minWidthStyle.slice(0, -2) : minWidthStyle;
        minWidth = minWidthAsString !== '' ? Number(minWidthAsString) : DEFAULT_MIN_WIDTH_PX;
      }

      return {
        ...cell,
        width,
        minWidth,
        isLastVisibleCell: cellIndex === lastVisibleCellIndex,
      };
    }),
  };
};

/**
 * Получить индекс последней видимой ячейки хэдера таблицы портала
 * @param sortedCells Массив базовых настроек ячейки хэдера, отсортированный по порядковому индексу
 * @returns Индекс ячейки.
 *
 * Поиск произвдоится в следующем порядке:
 *
 * - последняя ячейка со свойством !isHidden
 *
 * - если нет, то самый большой индекс ячейки передаваемого массива ячеек
 */
export const getLastVisiblePortalHeaderCellIndex = (sortedCells: BaseColumnSetting[]) => {
  const lastIndex = sortedCells?.map((cell) => !cell.isHidden).lastIndexOf(true);

  return lastIndex !== -1 ? lastIndex : sortedCells.length - 1;
};

/**
 * Добавить ячейку в массив ячеек хэдера портальной таблицы
 * @param headerRow Неупорядоченный массив ячеек портальной таблицы
 * @param cell Ячейка
 * @param cellOrderIndex Порядковый индекс ячейки
 * @returns Массив ячеек с новой ячейкой
 */
export const insertCellIntoPortalTableHeaderRow = <T>(
  headerRow: TPortalHeaderRow<T>,
  cell: TPortalHeaderCell<T>,
  cellOrderIndex: number,
): TPortalHeaderRow<T> => {
  const sliceIndexByOrderIndex = headerRow.cells.map((cell) => cell.index === cellOrderIndex).lastIndexOf(true);
  const isCellsOrdered = headerRow.cells.every((cell) => cell.index === undefined);
  const sliceIndex = isCellsOrdered ? cellOrderIndex : sliceIndexByOrderIndex;

  return {
    ...headerRow,
    cells: replaceItemInArrayByIndex(cell, sliceIndex, headerRow.cells),
  };
};
