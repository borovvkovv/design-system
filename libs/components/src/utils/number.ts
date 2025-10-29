/**
 * Преобразовать строку в число
 * @param str Строка
 * @returns Число. Undefined - если не удалось преобразовать строку в число
 */
export const stringToNumber = (str: string) => (str !== '' && !isNaN(Number(str)) ? Number(str) : undefined);
