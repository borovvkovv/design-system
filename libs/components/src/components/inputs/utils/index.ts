import { CalendarType } from '@comp/components/calendars/utils/models';
import {
  addMonths,
  addYears,
  format,
  subDays,
  subMonths,
  subYears,
  addDays,
  getDaysInYear,
  getDatePartAsString,
} from '@comp/utils/date';
import { IMask } from 'vue-imask';
import type { DateValue } from 'imask/esm/masked/date';
import { MAX_YEAR_IN_DATE_INPUT, MIN_YEAR_IN_DATE_INPUT, RANGE_IN_YEARS } from '@comp/components/inputs/utils/models';

export function getFormattedCalendarDate(date: Date | undefined, calendarType: CalendarType) {
  if (date === undefined) return '';

  switch (calendarType) {
    case CalendarType.month:
      return format(date, 'dd.MM.yyyy');
    case CalendarType.year:
      return format(date, 'MM.yyyy');
    case CalendarType.years:
      return format(date, 'yyyy');
    default:
      return format(date, 'dd.MM.yyyy');
  }
}

export function getValidDate(
  calendarType: CalendarType,
  day?: string,
  month?: string,
  year?: string,
  isInactiveRule?: (date: Date) => boolean,
  showError?: boolean,
): Date {
  const now = new Date();
  const validDay = !Number(day) ? now.getDate() : Number(day);
  const validMonth = !Number(month) ? now.getMonth() + 1 : Number(month);
  const validYear = !Number(year) ? now.getFullYear() : Number(year);
  const newDate = new Date(validYear, validMonth - 1, validDay);

  if (!isInactiveRule || !isInactiveRule(newDate) || showError) {
    return newDate;
  }

  switch (calendarType) {
    case CalendarType.month:
      return getNearestActiveDay(newDate, isInactiveRule);
    case CalendarType.year:
      return getNearestActiveMonth(newDate, isInactiveRule);
    case CalendarType.years:
      return getNearestActiveYear(newDate, isInactiveRule);
  }
}

export function getNearestActiveDay(newDate: Date, isInactiveRule: (date: Date) => boolean) {
  const newDateYear = newDate.getFullYear();
  const yearsToNewDate = Array.from({ length: RANGE_IN_YEARS }).map((_, i) => newDateYear - (i + 1));
  const yearsFromNewDate = Array.from({ length: RANGE_IN_YEARS }).map((_, i) => newDateYear + i + 1);
  const daysToNewDate = yearsToNewDate.reduce((totalDays, year) => totalDays + getDaysInYear(new Date(year, 0, 1)), 0);
  const daysFromNewDate = yearsFromNewDate.reduce(
    (totalDays, year) => totalDays + getDaysInYear(new Date(year, 0, 1)),
    0,
  );

  for (let i = 1; i <= daysToNewDate || i <= daysFromNewDate; i++) {
    const dayBeforeNewDate = subDays(newDate, i);
    if (
      i <= daysToNewDate &&
      dayBeforeNewDate.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      dayBeforeNewDate.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(dayBeforeNewDate)
    ) {
      return dayBeforeNewDate;
    }

    const dayAfterNewDate = addDays(newDate, i);
    if (
      i <= daysFromNewDate &&
      dayAfterNewDate.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      dayAfterNewDate.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(dayAfterNewDate)
    ) {
      return dayAfterNewDate;
    }
  }

  return new Date(NaN);
}

export function getNearestActiveMonth(newDate: Date, isInactiveRule: (date: Date) => boolean) {
  const allMonths = RANGE_IN_YEARS * 12;

  for (let i = 1; i <= allMonths; i++) {
    const monthInPast = subMonths(newDate, i);
    if (
      monthInPast.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      monthInPast.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(monthInPast)
    ) {
      return monthInPast;
    }

    const monthInFuture = addMonths(newDate, i);
    if (
      monthInFuture.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      monthInFuture.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(monthInFuture)
    ) {
      return monthInFuture;
    }
  }

  return new Date(NaN);
}

export function getNearestActiveYear(newDate: Date, isInactiveRule: (date: Date) => boolean) {
  for (let i = 1; i <= RANGE_IN_YEARS; i++) {
    const yearInPast = subYears(newDate, i);
    if (
      yearInPast.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      yearInPast.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(yearInPast)
    ) {
      return yearInPast;
    }

    const yearInFuture = addYears(newDate, i);
    if (
      yearInFuture.getFullYear() >= MIN_YEAR_IN_DATE_INPUT &&
      yearInFuture.getFullYear() <= MAX_YEAR_IN_DATE_INPUT &&
      !isInactiveRule(yearInFuture)
    ) {
      return yearInFuture;
    }
  }

  return new Date(NaN);
}

export function getCalendarTypePlaceholder(calendarType: CalendarType): string {
  switch (calendarType) {
    case CalendarType.month: {
      return 'ДД.ММ.ГГГГ';
    }
    case CalendarType.year: {
      return 'ММ.ГГГГ';
    }
    case CalendarType.years: {
      return 'ГГГГ';
    }
    default: {
      return 'ДД.ММ.ГГГГ';
    }
  }
}

export function getIMaskOptions(calendarType: CalendarType) {
  switch (calendarType) {
    case CalendarType.month: {
      return {
        mask: Date,
        pattern: 'd.m.Y',
        autofix: true,
        lazy: true,
        overwrite: true,
        blocks: {
          Y: {
            mask: IMask.MaskedRange,
            from: MIN_YEAR_IN_DATE_INPUT,
            to: MAX_YEAR_IN_DATE_INPUT,
          },
        },
      };
    }
    case CalendarType.year: {
      return {
        mask: Date,
        pattern: 'm.y',
        overwrite: true,
        blocks: {
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          y: {
            mask: IMask.MaskedRange,
            from: MIN_YEAR_IN_DATE_INPUT,
            to: MAX_YEAR_IN_DATE_INPUT,
          },
        },
        format: (date: DateValue): string => {
          if (date) {
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return [month, year].join('.');
          }
          return '';
        },
        parse: (str: string): Date => {
          const splitted = str.split('.');
          return new Date(Number(splitted[1]), Number(splitted[0]) - 1, 1);
        },
      };
    }
    case CalendarType.years: {
      return {
        mask: Date,
        pattern: 'y',
        autofix: true,
        lazy: true,
        overwrite: true,
        blocks: {
          y: {
            mask: IMask.MaskedRange,
            from: MIN_YEAR_IN_DATE_INPUT,
            to: MAX_YEAR_IN_DATE_INPUT,
          },
        },
        format: (date: DateValue): string => {
          if (date) {
            return date.getFullYear().toString();
          }
          return '';
        },
        parse: (str: string): Date => {
          return new Date(Number(str), 0, 1);
        },
      };
    }
    default: {
      return {};
    }
  }
}

export function getValidDateFromRange(
  calendarType: CalendarType,
  isMinDate: boolean,
  day?: string,
  month?: string,
  year?: string,
  isInactiveRule?: (date: Date) => boolean,
  showError?: boolean,
  otherDate?: Date,
): Date | undefined {
  const now = new Date();
  const validDay = !Number(day) ? now.getDate() : Number(day);
  const validMonth = !Number(month) ? now.getMonth() + 1 : Number(month);
  const validYear = !Number(year) ? now.getFullYear() : Number(year);
  const newDate = new Date(validYear, validMonth - 1, validDay);

  switch (calendarType) {
    case CalendarType.month: {
      if (!day && !month && !year) return undefined;

      if (!showError && otherDate && newDate && (isMinDate ? newDate > otherDate : newDate < otherDate)) {
        return new Date(otherDate);
      }

      if (!isInactiveRule || !isInactiveRule(newDate) || showError) {
        return newDate;
      }

      return getNearestActiveDay(newDate, isInactiveRule);
    }
    case CalendarType.year: {
      if (!month && !year) return undefined;

      if (!showError && otherDate && newDate && (isMinDate ? newDate > otherDate : newDate < otherDate))
        return new Date(otherDate);

      if (!isInactiveRule || !isInactiveRule(newDate) || showError) {
        return newDate;
      }

      return getNearestActiveMonth(newDate, isInactiveRule);
    }
    case CalendarType.years: {
      if (!year) return undefined;

      if (!showError && otherDate && newDate && (isMinDate ? newDate > otherDate : newDate < otherDate))
        return new Date(otherDate);

      if (!isInactiveRule || !isInactiveRule(newDate) || showError) {
        return newDate;
      }

      return getNearestActiveYear(newDate, isInactiveRule);
    }
  }
}

/**
 * Получить активную дату для календаря
 * @param date Дата
 * @param calendarType Тип календаря
 * @param isInactiveRule Функция для проверки даты на неактивность
 * @param showError
 * @returns Переданная в функцию дата, сдвинутая, при необходимости, до ближайшей возможной
 * даты функция на неактивность с которой возвращает false
 */
export const getValidDateForCalendar = (
  date: string | Date,
  calendarType: CalendarType,
  isInactiveRule?: (date: Date) => boolean,
  showError?: boolean,
) => {
  const regex = /[^\d]/g;

  switch (calendarType) {
    case CalendarType.month: {
      const [day, month, year] =
        date instanceof Date
          ? [getDatePartAsString(date, 'day'), getDatePartAsString(date, 'month'), getDatePartAsString(date, 'year')]
          : date.split(regex);

      return getValidDate(calendarType, day, month, year, isInactiveRule, showError);
    }
    case CalendarType.year: {
      const [month, year] =
        date instanceof Date
          ? [getDatePartAsString(date, 'month'), getDatePartAsString(date, 'year')]
          : date.split(regex);

      return getValidDate(calendarType, '1', month, year, isInactiveRule, showError);
    }
    case CalendarType.years: {
      const year = date instanceof Date ? getDatePartAsString(date, 'year') : date;

      return getValidDate(calendarType, '1', '1', year, isInactiveRule, showError);
    }
  }
};
