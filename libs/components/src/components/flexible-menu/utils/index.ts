import type { BaseFlexibleMenuRef, IMenuItemParams } from '@comp/components/flexible-menu/utils/models';

export function getMarginLeft(element: Element | null | undefined) {
  if (!element) return 0;

  const marginLeft = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left'), 10);
  return isNaN(marginLeft) ? 0 : marginLeft;
}

export function getMarginRight(element: Element | null | undefined) {
  if (!element) return 0;

  const marginRight = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right'), 10);
  return isNaN(marginRight) ? 0 : marginRight;
}

export function getElementWidthWithMarginX(element: Element | null | undefined) {
  if (!element) return 0;

  return getMarginLeft(element) + Math.round(element.getBoundingClientRect().width) + getMarginRight(element);
}

export function getLeftPosition(element: Element | null | undefined) {
  return element ? Math.round(element.getBoundingClientRect().left) : undefined;
}

export function getRightPosition(element: Element | null | undefined) {
  return element ? Math.round(element?.getBoundingClientRect().right) : undefined;
}

/**
 * Получить числовое значение вычисленного свойства CSS у элемента
 * @param item Элемент
 * @param property Свойство CSS
 * @returns Числовое значение свойства CSS
 */
function getNumberItemProperty(item: Element, property: string) {
  return parseInt(window.getComputedStyle(item).getPropertyValue(property), 10);
}

/**
 * Получить параметры элементов гибкоого меню
 * @param visibleMenuItems HTML-элементы гибкого меню
 * @returns Массив параметров гибкого меню
 */
export function getMenuItemsParams(visibleMenuItems: Element[]): IMenuItemParams[] {
  return visibleMenuItems.map((item) => ({
    width:
      getNumberItemProperty(item, 'margin-left') +
      item.getBoundingClientRect().width +
      getNumberItemProperty(item, 'margin-right'),
    element: item,
  }));
}

/**
 * Получить индекс элемента, не помещающегося в строку гибкого меню
 * @param rowMaxWidth Максимальная ширина строки гибкого меню
 * @param itemParams Массив параметров элементов, один из параметров содержит информацию о ширине его элемента
 * @param collapsedMenuWidth Ширина кнопки "Еще"
 * @returns Индекс
 */
export const getNotFittedItemIndexInFlexibleRow = (
  rowMaxWidth: number,
  itemParams: IMenuItemParams[],
  collapsedMenuWidth: number,
) => {
  let rowWidthWithItem = 0;
  const rowMaxWidthWithCollapsedMenu = rowMaxWidth + collapsedMenuWidth;
  let itemParamIndex = 0;

  while (itemParamIndex < itemParams.length && rowWidthWithItem <= rowMaxWidth) {
    rowWidthWithItem += itemParams[itemParamIndex].width;
    itemParamIndex += 1;
  }

  const isLastItemParam = itemParamIndex === itemParams.length;

  return isLastItemParam && rowWidthWithItem <= rowMaxWidthWithCollapsedMenu ? -1 : itemParamIndex - 1;
};

/**
 * Получить индекс элемента, не помещающегося в гибком меню
 * @param linesNumber Максимальное количество строк в гибком меню
 * @param baseFlexibleMenuRef Ссылка на базовый компонент гибкого меню
 * @param allItemsParams Массив всех параметров элементов
 * @returns
 */
export const getNotFittedItemIndex = (
  linesNumber: number,
  baseFlexibleMenuRef: BaseFlexibleMenuRef | undefined,
  allItemsParams: IMenuItemParams[],
) => {
  const visibleMenuWidth = baseFlexibleMenuRef?.getVisibleMenuWidth() ?? 0;
  const collapsedMenuWidth = baseFlexibleMenuRef?.getCollapsedMenuWidth() ?? 0;
  const rowsMaxWidths = Array.from({ length: linesNumber }).map(
    (_, lineIndex) => visibleMenuWidth - (lineIndex === linesNumber - 1 ? collapsedMenuWidth : 0),
  );
  let notFittedItemIndex = 0;
  let notFittedItemIndexInRow = 0;
  let rowIndex = 0;

  while (rowIndex < rowsMaxWidths.length && notFittedItemIndexInRow !== -1) {
    notFittedItemIndexInRow = getNotFittedItemIndexInFlexibleRow(
      rowsMaxWidths[rowIndex],
      allItemsParams.slice(notFittedItemIndex),
      collapsedMenuWidth,
    );
    notFittedItemIndex += notFittedItemIndexInRow;
    rowIndex++;
  }

  return notFittedItemIndexInRow === -1 ? -1 : notFittedItemIndex;
};
