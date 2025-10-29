import type { SortType } from '@comp/utils/compare';
import { sortISelectItems } from '@comp/utils/string';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import { TextColorType, type IColorText } from '@comp/components/selects/utils/models';

/**
 * Получить массив, где элемент массива - объект с обычным текстом и признаком совпадения данного текста с запросом
 * @param str Текст
 * @param query Запрос
 * @param colorType Тип подсветки текста при совпадении с запросом
 * @param splitToChars Разделить параметр text каждого элемента результирующего массива на символы
 * @returns Массив IColorText
 */
export function getColoredSearchResult(
  str: string,
  query: string,
  colorType: TextColorType,
  splitToChars?: boolean,
): IColorText[] {
  const result: IColorText[] = [];

  if (str.length && !query.length) {
    return getColorText(
      {
        text: str,
        isColored: false,
      },
      splitToChars,
    );
  }

  if (!str.length || !query.length) {
    return result;
  }

  let startIndex = 0;
  let queryIndex = str.toLowerCase().indexOf(query.toLowerCase());

  while (queryIndex !== -1) {
    if (startIndex !== queryIndex)
      result.push(
        ...getColorText(
          {
            text: str.slice(startIndex, queryIndex),
            isColored: false,
          },
          splitToChars,
        ),
      );

    result.push(
      ...getColorText(
        {
          text: str.slice(queryIndex, queryIndex + query.length),
          isColored: true,
          colorType,
        },
        splitToChars,
      ),
    );
    startIndex = queryIndex + query.length;
    queryIndex = str.toLowerCase().indexOf(query.toLowerCase(), startIndex);
  }

  if (startIndex < str.length)
    result.push(
      ...getColorText(
        {
          text: str.slice(startIndex),
          isColored: false,
        },
        splitToChars,
      ),
    );

  return result;
}

export function getTextColor(result: IColorText) {
  if (result.isColored) {
    if (result.colorType === TextColorType.Text) {
      return 'text-blue-2';
    }
    return 'bg-green-4';
  }
}

export const filterOptions = (query: string, options: Array<ISelectItem>) =>
  query === ''
    ? options
    : options.filter((option) => {
        return option.title.toLowerCase().includes(query.toLowerCase());
      });

/**
 * Разделить параметр text объекта colorText на символы. Пример: {text: 'abc', isColored: true} => [ {text: 'a', isColored: true}, {text: 'b', isColored: true},  {text: 'c', isColored: true} ]
 * @param colorText Объект IColorText
 * @returns Массив, где каждый элемент - это объект colorText, но его параметр text - один символ
 */
const splitColorTextToColorChars = (colorText: IColorText): IColorText[] =>
  colorText.text.split('').map((char) => ({
    text: char,
    isColored: colorText.isColored,
    colorType: colorText.colorType,
  }));

/**
 * Получить массив объектов IColorText из одного объекта.
 * Пример: {text: 'abc', isColored: true} => [ {text: 'a', isColored: true}, {text: 'b', isColored: true},  {text: 'c', isColored: true} ]
 * или {text: 'abc', isColored: true} => [ { text: 'abc', isColored: true } ]
 * @param colorText Объект IColorText
 * @param splitToChars Флаг для разделения параметра text переданного colorText на символы
 * @returns Массив объектов IColorText.
 * Если флаг splitToChars = true, то возвращает массив, где каждый элемент - объект colorText, но его параметр text - один симвоо.
 * Иначе возвращает массив с одним объектом colorText
 */
const getColorText = (colorText: IColorText, splitToChars?: boolean): IColorText[] => {
  if (splitToChars) return splitColorTextToColorChars(colorText);

  return [colorText];
};

/**
 * Оставить в массиве ISelectItem элементы с уникальными значениями свойства title, после выполнить сортировку элементов по свойству title
 * @param array Массив ISelectItem
 * @param sort Тип сортировки
 * @returns Отсортированный массив ISelectItem с уникальными значениями свойства title. Если сортировка не задана, то массив не сортируется
 */
export const getSelectItemsWithUniqueTitles = (array?: ISelectItem[], sort?: SortType) => {
  const uniqueOptions = Array<ISelectItem>();

  array?.forEach((option) => {
    if (uniqueOptions.every((uniqueOption) => uniqueOption.title !== option.title)) {
      uniqueOptions.push(option);
    }
  });

  if (sort) {
    return sortISelectItems(uniqueOptions, sort);
  }

  return uniqueOptions;
};
