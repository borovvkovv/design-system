export enum SortType {
  Asc = 'Asc',
  Desc = 'Desc',
}

/**
 * Функция сравнения двух переменных
 * @param current Вторая переменная
 * @param previous Первая переменная
 * @param sortType Тип сортировки, по умолчанию сортировка по возрастанию
 * @returns Для сортировки по возрастанию:
 * - Если переменные одинаковы, то 0.
 * - Если первая переменная меньше второй, то 1, иначе -1
 */
export const compare = <T>(current: T, previous: T, sortType: SortType = SortType.Asc) => {
  if (current > previous) {
    return sortType === SortType.Asc ? 1 : -1;
  }

  if (current < previous) {
    return sortType === SortType.Asc ? -1 : 1;
  }

  return 0;
};

export type ComparableKey<T> = {
  [K in keyof T]: T[K] extends number | string ? K : never;
}[keyof T];

/**
 * Функция сравнения двух объектов по заданному свойству
 * @param key Ключ свойства объектов, значения которых необходимо сравнивать
 * @param sortType Тип сортировки, по умолчанию сортировка по возрастанию
 * @returns compareObjectsFn(current, previous).
 * Функция сравнения двух объектов по конкретному ключу и определенного типа сортировки
 *   @param current Второй объект
 *   @param previous Первый объект
 *  Для сортировки по возрастанию:
 * - Если значения одинаковы, то 0.
 * - Если первое значение меньше второго, то 1, иначе -1
 */
export const compareByKey =
  <T extends object>(key: ComparableKey<T>, sortType: SortType = SortType.Asc) =>
  (current: T, previous: T) =>
    compare(current[key], previous[key], sortType);

export type ComparableStringKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

/**
 * Функция сравнения двух объектов по заданному строковому свойству. Нечувствителен к регистру
 * @param key Ключ только строкового свойства объектов, значения которых необходимо сравнивать
 * @param sortType Тип сортировки, по умолчанию сортировка по возрастанию
 * @returns compareObjectsFn(current, previous).
 * Функция сравнения двух объектов по конкретному ключу и определенного типа сортировки
 *   @param current Второй объект
 *   @param previous Первый объект
 *  Для сортировки по возрастанию:
 * - Если строки одинаковы, то 0.
 * - Если первая строка меньше второй, то 1, иначе -1
 */
export const compareByStringKey =
  <T extends object>(key: ComparableStringKey<T>, sortType: SortType = SortType.Asc) =>
  (current: T, previous: T) => {
    const currentValue = current[key] as string;
    const previousValue = previous[key] as string;

    return compare(currentValue.toUpperCase(), previousValue.toUpperCase(), sortType);
  };

/**
 * Проверка, являются ли объекты одинаковыми.
 * Если свойства - объекты или массивы, то они сравниваются по ссылке.
 * @param object1 Объект 1
 * @param object2 Объект 2
 * @returns True - если свойства объектов равны. Иначе - false
 */
export function isObjectsEqual<T extends Object>(object1: T, object2: T): boolean {
  const keys1 = Object.keys(object1) as (keyof T)[];
  const keys2 = Object.keys(object2) as (keyof T)[];

  return keys1.length === keys2.length && keys1.every((key) => object1[key] === object2[key]);
}
