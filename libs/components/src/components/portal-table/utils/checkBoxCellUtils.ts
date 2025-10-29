import { type TPortalRow } from '@comp/components/portal-table/utils/models';
import type { TCell, TCellCheckBox } from '@comp/components/table/utils/models';

/**
 * Получить все чекбокс-ячейки у строки
 * @param cells Строка
 * @returns Массив чекбокс-ячеек
 */
export const getCheckBoxesOnRow = (cells: TCell[]): TCellCheckBox[] =>
  cells.filter((cell) => cell.type === 'checkBox') as TCellCheckBox[];

/**
 * Получить строки, у которых есть чекбокс-ячейка и значение которого равно true
 * @param rows Строки таблицы
 * @returns Выбранные чекбокс-ячейки
 */
export const getCheckedRows = <T>(rows: TPortalRow<T>[]): TPortalRow<T>[] =>
  rows.filter((row) => getCheckBoxesOnRow(row.cells).filter((cell) => cell.isChecked).length > 0);

/**
 * Проверка на установку хотя бя одного чек-бокса таблицы в true
 * @param rows Строки таблицы
 * @returns True - установлен в true хотя бы один, иначе - false
 */
export const checkAnyCheckBoxesOnRowsChecked = <T>(rows: TPortalRow<T>[]) =>
  rows.some((row) => getCheckBoxesOnRow(row.cells).some((cell) => cell.isChecked));

/**
 * Проверка на установку всех чек-боксов таблицы в true
 * @param rows Строки таблицы
 * @returns True - установлены в true все чекбоксы, иначе - false
 */
export const isAllCheckBoxesOnRowsChecked = <T>(rows: TPortalRow<T>[]) =>
  rows.every((row) => getCheckBoxesOnRow(row.cells).every((cell) => cell.isChecked));

/**
 * Снять выделение с чекбокса-ячейки
 * @param cell Ячейка
 * @returns Если ячейка типа checkBox - ячейка со снятым выделением чек-бокса
 *
 * Иначе - ячейка без изменений
 */
export const uncheckCell = (cell: TCell): TCell => {
  if (cell.type === 'checkBox') return { ...cell, isChecked: false };

  return cell;
};

/**
 * Снять выделение с чекбокс-ячеек строки
 * @param row Строка
 * @returns Строка со снятыми выделениями чекбокс-ячеек
 */
export const uncheckRow = <T>(row: TPortalRow<T>) => ({ ...row, cells: row.cells.map((cell) => uncheckCell(cell)) });
