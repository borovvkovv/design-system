import {
  type IDay,
  type IMonth,
  YEARS_IN_CALENDAR,
  type IMonthCalendarRange,
  type IDayRange,
  type IYearCalendarRange,
  type IMonthRange,
  type IYearsCalendarRange,
  type IYearRange,
  type IMonthCalendar,
  type IYearCalendar,
  type IYearsCalendar,
  type IYear,
} from '@comp/components/calendars/utils/models';
import { uppercaseFirst } from '@comp/utils/string';
import {
  subYears,
  format,
  getWeekDay,
  subMonths,
  getDaysInMonth,
  getStartOfMonth,
  getEndOfMonth,
  addMonths,
  startOfDay,
  subDays,
  startOfMonth,
  addDays,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWeekend,
} from '@comp/utils/date';

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря по месяцу
 *
 * @param display дата отражающая диапазон календаря (год.месяц)
 * @param current текущая выбранная дата
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateMonthCalendar = (
  display: Date,
  current: Date,
  isInactiveRule?: (date: Date) => boolean,
): IMonthCalendar => {
  const prevMonthLength = getDaysInMonth(subMonths(display, 1));
  const length = getDaysInMonth(display);
  const startWeekDay = getWeekDay(getStartOfMonth(display));

  const daysPrevMonth: IDay[] =
    startWeekDay === 1
      ? []
      : new Array(startWeekDay - 1)
          .fill(null)
          .map((empty, index) => {
            const checkDay = new Date(display.getFullYear(), display.getMonth() - 1, prevMonthLength - index);
            return {
              value: prevMonthLength - index,
              active: isSameDay(checkDay, current),
              inactive: isInactiveRule && isInactiveRule(checkDay),
              weekend: isWeekend(checkDay),
              prevMonth: true,
            };
          })
          .reverse();

  const daysThisMonth: IDay[] = new Array(length).fill(null).map((empty, index) => {
    const checkDay = new Date(display.getFullYear(), display.getMonth(), index + 1);

    return {
      value: index + 1,
      active: isSameDay(checkDay, current),
      inactive: isInactiveRule && isInactiveRule(checkDay),
      weekend: isWeekend(checkDay),
    };
  });

  const daysNextMonth: IDay[] = new Array(7 - (getWeekDay(getEndOfMonth(display)) || 7))
    .fill(null)
    .map((empty, index) => {
      const checkDay = new Date(display.getFullYear(), display.getMonth() + 1, index + 1);

      return {
        value: index + 1,
        active: isSameDay(checkDay, current),
        inactive: isInactiveRule && isInactiveRule(checkDay),
        weekend: isWeekend(checkDay),
        nextMonth: true,
      };
    });

  const days: IDay[] = [...daysPrevMonth, ...daysThisMonth, ...daysNextMonth];

  return {
    days,
    year: display.getFullYear(),
    month: {
      name: uppercaseFirst(format(display, 'LLLL')),
      index: display.getMonth() + 1,
    },
  };
};

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря по году
 *
 * @param display дата отражающая диапазон календаря (год)
 * @param current текущая выбранная дата
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateYearCalendar = (
  display: Date,
  current: Date,
  isInactiveRule?: (date: Date) => boolean,
): IYearCalendar => {
  const now = new Date();

  const months = Array.from({ length: 12 }, (empty, i) => {
    const currentMonth = new Date(now.getFullYear(), i).toLocaleDateString('ru', { month: 'long' });

    return uppercaseFirst(currentMonth);
  });

  const monthsThisYear: IMonth[] = new Array(months.length).fill(null).map((empty, index) => {
    const checkMonth = new Date(display.getFullYear(), index);

    return {
      value: index,
      active: isSameMonth(checkMonth, current),
      inactive: isInactiveRule && isInactiveRule(checkMonth),
      index,
      name: months[index],
    };
  });

  return {
    year: display.getFullYear(),
    months: monthsThisYear,
  };
};

export const changeMonth = (newDate: Date, inactiveRule?: (date: Date) => boolean) => {
  const now = new Date();
  const roundedNewDate = startOfDay(newDate);
  const newDateOfMonth = newDate.getDate();
  const daysInMonth = getDaysInMonth(newDate);
  for (let i = 0; i < newDateOfMonth; i++) {
    const currentDate = subDays(roundedNewDate, i);
    if (inactiveRule && !inactiveRule(currentDate)) {
      return currentDate === startOfDay(now) ? now : currentDate;
    }
  }
  for (let i = 1; i < daysInMonth - newDateOfMonth; i++) {
    const currentDate = addDays(roundedNewDate, i);
    if (inactiveRule && !inactiveRule(currentDate)) {
      return currentDate === startOfDay(now) ? now : currentDate;
    }
  }
  return newDate;
};

export const changeYear = (newDate: Date, inactiveRule?: (date: Date) => boolean) => {
  const now = new Date();
  const roundedNewDate = startOfMonth(newDate);
  const newMonthIndex = newDate.getMonth();
  for (let i = 0; i <= newMonthIndex; i++) {
    const currentDate = subMonths(roundedNewDate, i);
    if (inactiveRule && !inactiveRule(currentDate)) {
      return currentDate === startOfMonth(now) ? now : currentDate;
    }
  }
  for (let i = newMonthIndex + 1; i < 12; i++) {
    const currentDate = addMonths(roundedNewDate, i);
    if (inactiveRule && !inactiveRule(currentDate)) {
      return currentDate === startOfMonth(now) ? now : currentDate;
    }
  }
  return newDate;
};

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря по годам
 *
 * @param dozenOfYearIndex номер двенадцатилетия ( 1- [2012;2023], 2 - [2000;2011], ...)
 * @param current текущая выбранная дата
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateYearsCalendar = (
  dozenOfYearIndex: number,
  current: Date,
  isInactiveRule?: (date: Date) => boolean,
): IYearsCalendar => {
  const now = new Date();

  const years = Array.from({ length: YEARS_IN_CALENDAR }, (empty, i) => {
    return subYears(now, dozenOfYearIndex * 12 - i - 1).getFullYear();
  });

  const dozenYears: IYear[] = new Array(years.length).fill(null).map((empty, index) => {
    const checkYear = new Date(years[index], 0);

    return {
      value: years[index],
      active: isSameYear(checkYear, current),
      inactive: isInactiveRule && isInactiveRule(checkYear),
    };
  });

  return {
    years: dozenYears,
  };
};

/**
 * Проверка дней месяца на неактивность
 *
 * @param date дата проверяемого месяца
 * @param isInactiveRule функция проверки неактивности. Возвращает true, если день неактивен, иначе - false
 * @returns True - если все дни месяца неактвны, иначе - false
 */
export const isMonthDisabled = (date: Date, isInactiveRule?: (date: Date) => boolean) => {
  const startMonthDate = getStartOfMonth(date);
  const daysInMonth = getDaysInMonth(startMonthDate);
  const dayIndexes = Array.from({ length: daysInMonth }).map((_, i) => i);

  return dayIndexes.every((day) => isInactiveRule && isInactiveRule(addDays(startMonthDate, day)));
};

/**
 * Проверка года на неактивность
 *
 * @param year проверяемый год
 * @param isInactiveRule функция проверки неактивности. Возвращает true, если месяц неактивен, иначе - false
 * @returns True - если все месяца неактвны, иначе - false
 */
export const isYearDisabled = (year: number, isInactiveRule?: (date: Date) => boolean) => {
  const monthIndexes = Array.from({ length: 12 }).map((_, i) => i);

  return monthIndexes.every((month) => isInactiveRule && isInactiveRule(new Date(year, month, 1)));
};

/**
 * Проверка дюжины лет на неактивность
 *
 * @param firstYearInDozen первый год в проверяемой дюжине
 * @param isInactiveRule функция проверки неактивности. Возвращает true, если год неактивен, иначе - false
 * @returns True - если все года неактвны, иначе - false
 */
export const isDozenOfYearsDisabled = (firstYearInDozen: number, isInactiveRule?: (date: Date) => boolean) => {
  const dozenOfYears = Array.from({ length: YEARS_IN_CALENDAR }).map((_, i) => firstYearInDozen + i);

  return dozenOfYears.every((year) => isInactiveRule && isInactiveRule(new Date(year, 0, 1)));
};

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря выбора диапазона дат по месяцу
 *
 * @param displayDate дата отражающая диапазон календаря (год.месяц)
 * @param minValue дата начала диапазона
 * @param maxValue дата конца диапазона
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateMonthRangeCalendar = (
  displayDate: Date,
  minValue?: Date,
  maxValue?: Date,
  isInactiveRule?: (date: Date) => boolean,
): IMonthCalendarRange => {
  const displayMonthLength = getDaysInMonth(displayDate);
  const startWeekDay = getWeekDay(getStartOfMonth(displayDate));
  const endWeekDay = getWeekDay(getEndOfMonth(displayDate));
  const prevMonthLength = getDaysInMonth(subMonths(displayDate, 1));

  const daysPrevMonth: IDayRange[] = new Array(startWeekDay - 1)
    .fill(null)
    .map((empty, index) => ({
      value: prevMonthLength - index,
      prevMonth: true,
    }))
    .reverse();

  const daysThisMonth: IDayRange[] = new Array(displayMonthLength).fill(null).map((empty, index) => {
    const checkDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), index + 1);

    return {
      value: index + 1,
      active: (minValue && isSameDay(checkDay, minValue)) || (maxValue && isSameDay(checkDay, maxValue)),
      inactive: isInactiveRule && isInactiveRule(checkDay),
      weekend: isWeekend(checkDay),
      isInRange: minValue && maxValue && checkDay > startOfDay(minValue) && checkDay < startOfDay(maxValue),
    };
  });

  const daysNextMonth: IDayRange[] = new Array(7 - endWeekDay).fill(null).map((empty, index) => ({
    value: index + 1,
    nextMonth: true,
  }));

  return {
    days: [...daysPrevMonth, ...daysThisMonth, ...daysNextMonth],
    year: displayDate.getFullYear(),
    month: {
      name: uppercaseFirst(format(displayDate, 'LLLL')),
      index: displayDate.getMonth() + 1,
    },
  };
};

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря выбора диапазона дат по году
 *
 * @param display дата отражающая диапазон календаря (год)
 * @param minValue дата начала диапазона
 * @param maxValue дата конца диапазона
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateYearRangeCalendar = (
  display: Date,
  minValue?: Date,
  maxValue?: Date,
  isInactiveRule?: (date: Date) => boolean,
): IYearCalendarRange => {
  const months = Array.from({ length: 12 }, (empty, i) => {
    const currentMonth = new Date(new Date().getFullYear(), i).toLocaleDateString('ru', { month: 'long' });

    return uppercaseFirst(currentMonth);
  });

  const monthsThisYear: IMonthRange[] = new Array(months.length).fill(null).map((empty, index) => {
    const checkMonth = new Date(display.getFullYear(), index);

    return {
      value: index,
      active: (minValue && isSameMonth(checkMonth, minValue)) || (maxValue && isSameMonth(checkMonth, maxValue)),
      inactive: isInactiveRule && isInactiveRule(checkMonth),
      index,
      name: months[index],
      isInRange: minValue && maxValue && checkMonth > startOfMonth(minValue) && checkMonth < startOfMonth(maxValue),
    };
  });

  return {
    year: display.getFullYear(),
    months: monthsThisYear,
  };
};

/**
 * Рассчитать все необходимые парамеры для отрисовки календаря выбора диапазона дат по годам
 *
 * @param dozenOfYearIndex номер двенадцатилетия ( 1- [2012;2023], 2 - [2000;2011], ...)
 * @param minValue дата начала диапазона
 * @param maxValue дата конца диапазона
 * @param isInactiveRule правило фильтрации дат
 */
export const calculateYearsRangeCalendar = (
  dozenOfYearIndex: number,
  minValue?: Date,
  maxValue?: Date,
  isInactiveRule?: (date: Date) => boolean,
): IYearsCalendarRange => {
  const years = Array.from({ length: YEARS_IN_CALENDAR }, (empty, i) =>
    subYears(new Date(), dozenOfYearIndex * 12 - i - 1).getFullYear(),
  );

  const dozenYears: IYearRange[] = new Array(years.length).fill(null).map((empty, index) => {
    const checkYear = new Date(years[index], 0);

    return {
      value: years[index],
      active: (minValue && isSameYear(checkYear, minValue)) || (maxValue && isSameYear(checkYear, maxValue)),
      inactive: isInactiveRule && isInactiveRule(checkYear),
      isInRange:
        minValue &&
        maxValue &&
        checkYear.getFullYear() > minValue.getFullYear() &&
        checkYear.getFullYear() < maxValue.getFullYear(),
    };
  });

  return {
    years: dozenYears,
  };
};
