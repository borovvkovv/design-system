import formatRaw from 'date-fns/format';
import ru from 'date-fns/locale/ru';
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

export {
  ru,
  addMonths,
  addYears,
  compareAsc,
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
