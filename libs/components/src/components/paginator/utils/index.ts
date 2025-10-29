/**
 * Получить первый диапазон номеров страниц
 * @param itemsPerPage Количество номеров страниц в диапазоне
 * @returns Первый диапазон
 */
export const getFirstRange = (itemsPerPage: number): number[] =>
  Array.from({ length: itemsPerPage }, (_, index) => index + 1);

/**
 * Получить последний диапазон номеров страниц
 * @param itemsPerPage Количество номеров страниц в диапазоне
 * @param maxPage Максимально возможный номер страницы
 * @returns Последний диапазон
 */
export const getLastRange = (itemsPerPage: number, maxPage: number): number[] =>
  Array.from({ length: itemsPerPage }, (_, index) => maxPage - index).reverse();

/**
 * Сдвиг диапазона страниц, например [1,2,3] -> [2,3,4]
 * @param range Текущие отображаемые номера страниц
 * @param offset Сдвинуть на offset страниц
 * @returns Сдвинутый диапазон страниц
 */
export const offsetRange = (range: number[], offset: number): number[] => {
  return range.map((item) => item + offset);
};

/**
 * Получить отображаемые номера страниц, в которых присутствует номер текущей страницы
 * @param range Текущие отображаемые номера страниц
 * @param page Текущая страница
 * @param minPage Минимально возможный номер страницы
 * @param maxPage Максимально возможный номер страницы
 * @param itemsPerPage Количество отображаемых страниц
 * @returns Отображаемые номера страниц, где текущая страница либо предпоследняя, либо вторая
 */
export const getRangeWithPage = (
  range: number[],
  page: number,
  minPage: number,
  maxPage: number,
  itemsPerPage: number,
): number[] => {
  let newRange = range;
  let firstItemInCurrentRange = newRange[0];
  let lastItemInCurrentRange = newRange[range.length - 1];

  while (page >= lastItemInCurrentRange && page < maxPage) {
    newRange = offsetRange(newRange, 1);
    lastItemInCurrentRange = newRange[range.length - 1];
  }

  while (page <= firstItemInCurrentRange && page > minPage) {
    newRange = offsetRange(newRange, -1);
    firstItemInCurrentRange = newRange[0];
  }

  if (page === minPage) newRange = getFirstRange(itemsPerPage);

  if (page === maxPage) newRange = getLastRange(itemsPerPage, maxPage);

  return newRange;
};
