import { isObjectsEqual } from './compare';

/**
 * Заменяет найденный по индексу элемент массива на предоставляемый
 * @param item Новый элемент массива
 * @param index Индекс элемента массива, который нужно заменить
 * @param array Массив
 * @returns Копия массива с новым элементом
 */
export const replaceItemInArrayByIndex = <T>(item: T, index: number, array: T[]): Array<T> => [
  ...array.slice(Math.min(0, index), index),
  item,
  ...array.slice(index + 1),
];

/**
 * Переместить элемент массива на новое место
 * @param sourceIndex Индекс перемещаемого элемента массива до перемещения.
 * @param indexBeforeNewPlace Индекс элемента массива после которого будет стоять перемещаемый элемент (-1, если необходимо переместить элемент в начало массива).
 * @param array Массив с перемещенным элементом.
 */
export const replaceItemInArray = <T>(sourceIndex: number, indexBeforeNewPlace: number, array: T[]) => {
  if (sourceIndex < 0 || sourceIndex >= array.length) return array;

  if (sourceIndex > indexBeforeNewPlace) {
    return [
      ...array.slice(0, indexBeforeNewPlace + 1),
      ...[array[sourceIndex]],
      ...array.slice(indexBeforeNewPlace + 1, sourceIndex),
      ...array.slice(sourceIndex + 1),
    ];
  } else if (sourceIndex < indexBeforeNewPlace) {
    return [
      ...array.slice(0, sourceIndex),
      ...array.slice(sourceIndex + 1, indexBeforeNewPlace + 1),
      ...[array[sourceIndex]],
      ...array.slice(indexBeforeNewPlace + 1),
    ];
  }

  return array;
};

export const isArrayIncludesObject = <T extends Object>(object: T, array: Array<T>): boolean =>
  array.some((item) => isObjectsEqual(object, item));

/**
 * Функция, сравнивающая два массива объектов
 * @param array1
 * @param array2
 * @param isEqualFunction - функция сравнения объектов, по умолчанию isObjectsEqual
 */
export const isArrayEquals = <T extends Object>(
  array1: Array<T>,
  array2: Array<T>,
  isEqualFunction: (object1: T, object2: T) => boolean = isObjectsEqual<T>,
): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((item, index) => isEqualFunction(item, array2[index]));
};

export const removeItemFromArray = <T>(array: Array<T>, index: number): Array<T> => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const getIndexByItem = <T extends Object>(item: T, array: Array<T>) =>
  array.findIndex((option) => isObjectsEqual(option, item));

/**
 * Удалить из массива элемент-объект свойство 'key' которого равно 'value'
 * @param array Массив
 * @param key Имя свойства объекта
 * @param value Значение свойства 'key' объекта
 * @returns Массив без элемента, либо исходный массив, если элемент не найден
 */
export const removeItemFromArrayByModel = <T extends Object>(
  array: Array<T>,
  key: keyof T,
  value: T[typeof key],
): Array<T> => {
  const index = array.findIndex((item) => item[key] === value);

  if (index !== -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }

  return array;
};

/**
 * Получить первый элемент массива, если передан массив
 * @param arrayOrItem Массив или элемент
 * @returns Первый элемерт масства или элемент
 */
export const getFirst = <T>(arrayOrItem: T | T[]): T | undefined =>
  arrayOrItem instanceof Array ? arrayOrItem[0] : arrayOrItem;

/**
 * Сравнение двух аргументов
 * @param arrayOrItem Массив чисел/строк или число/строка
 * @param item Число/строка
 * @returns Если первый аргумент - массив, то проверяется включение второго аргумента в массив.
 * Если первый аргумент - число/строка, то сравнивается со вторым аргументом.
 */
export const equalsOrIncludes = <T extends string | number>(arrayOrItem: Array<T> | T, item: T): boolean => {
  if (arrayOrItem instanceof Array) {
    return arrayOrItem.includes(item);
  }

  return arrayOrItem === item;
};
