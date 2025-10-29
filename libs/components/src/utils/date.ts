import formatRaw from 'date-fns/format';
import ru from 'date-fns/locale/ru';
import rawParse from 'date-fns/parse';
import getStartOfDay from 'date-fns/startOfDay';
import getStartOfMonth from 'date-fns/startOfMonth';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import getEndOfMonth from 'date-fns/endOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDaysInYear from 'date-fns/getDaysInYear';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';
import subYears from 'date-fns/subYears';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addYears from 'date-fns/addYears';
import compareAsc from 'date-fns/compareAsc';
import getQuarter from 'date-fns/getQuarter';
import getStartOfYear from 'date-fns/startOfYear';
import getEndOfYear from 'date-fns/endOfYear';
import startOfWeek from 'date-fns/startOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isSameYear from 'date-fns/isSameYear';
import isSameMonth from 'date-fns/isSameMonth';
import isWeekend from 'date-fns/isWeekend';
import { getDay as dateFnsGetWeekDay } from 'date-fns';

/**
 * Получение строки заданного формата из даты
 * @param date Дата
 * @param fmt Шаблон
 * @returns Строка, форматированная согласно шаблону.
 * Пустая строка, если задан некорректный шаблон или дата
 */
export const format = (date: Date, fmt: string): string => {
  try {
    return formatRaw(date, fmt, { locale: ru });
  } catch (e) {
    return '';
  }
};

/**
 * Преобразование строки в дату
 * @param raw Строка
 * @param fmt Шаблон, применяемый в строке
 * @param date Дата, части которой будут использоваться, если в строке не указан день/месяц/год
 * @returns Дата
 */
export const parse = (raw: string, fmt: string, date: Date = new Date()): Date => rawParse(raw, fmt, date);

/**
 * Получить день недели по дате
 * @param date Дата
 * @returns Число. 1 - Пн, ..., 7 - Вс
 */
const getWeekDay = (date: Date | number): number => dateFnsGetWeekDay(date) || 7;

export {
  ru,
  addMonths,
  addYears,
  compareAsc,
  getWeekDay,
  getQuarter,
  getStartOfDay,
  endOfDay as endofDay,
  getStartOfMonth,
  getEndOfMonth,
  startOfDay,
  endOfDay,
  startOfMonth,
  startOfYear,
  getDaysInMonth,
  getDaysInYear,
  subMonths,
  subYears,
  subDays,
  addDays,
  getStartOfYear,
  getEndOfYear,
  startOfWeek,
  isSameDay,
  isSameYear,
  isSameMonth,
  isWeekend,
};

/**
 * Получение даты из строки стандарта ISO
 * @param date Строка стандарта ISO
 * @returns Дата, преобразованная из строки без учета часового пояса
 */
export const parseMsDate = (date: string): Date => {
  const prepared = date.replace(/\.[0-9]+Z?/, '');

  return parse(prepared, "yyyy-MM-dd'T'HH:mm:ss", new Date());
};

/**
 * Получение строки стандарта ISO из даты
 * @param date Дата
 * @returns Строка формата ISO, с обнуленными миллисекундами, в UTC.
 * Пустая строка, если дата некорректна
 */
export const makeMsDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.000'Z");

/**
 * Получить часть даты в виде строки
 * @param date Дата
 * @param datePart Часть даты: число, месяц (номер месяца, не индекс), год
 * @returns Часть даты в виде строки
 */
export const getDatePartAsString = (date: Date, datePart: 'day' | 'month' | 'year'): string => {
  switch (datePart) {
    case 'day':
      return date.getDate().toString();
    case 'month':
      return (date.getMonth() + 1).toString();
    case 'year':
      return date.getFullYear().toString();
  }
};
