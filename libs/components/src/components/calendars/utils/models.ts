export interface ICalendarItem {
  value: number;
  active?: boolean;
  inactive?: boolean;
}

export interface IDay extends ICalendarItem {
  prevMonth?: boolean;
  nextMonth?: boolean;
  weekend?: boolean;
}

export interface IDayRange extends IDay {
  isInRange?: boolean;
}

export interface IMonth extends ICalendarItem {
  index: number;
  name: string;
}

export interface IMonthRange extends IMonth {
  isInRange?: boolean;
}

export interface IYear extends ICalendarItem {}

export interface IYearRange extends IYear {
  isInRange?: boolean;
}

export interface IBaseCalendarProps {
  popupText: string;
  isIconArrowRightDisabled: boolean;
  isIconArrowLeftDisabled: boolean;
}

export interface ICalendarProps {
  modelValue: Date;
  isInactiveRule?: (date: Date) => boolean;
}

export interface ICalendarRangeProps {
  minValue: Date | undefined;
  maxValue: Date | undefined;
  isInactiveRule?: (date: Date) => boolean;
}

export enum CalendarType {
  month = 'CalendarMonth',
  year = 'CalendarYear',
  years = 'CalendarYears',
}

export const CalendarTypeForCalendarRange: Record<CalendarType, string> = {
  [CalendarType.month]: 'CalendarMonthRange',
  [CalendarType.year]: 'CalendarYearRange',
  [CalendarType.years]: 'CalendarYearsRange',
};

export const CalendarTypeName: Record<CalendarType, string> = {
  [CalendarType.month]: 'День',
  [CalendarType.year]: 'Месяц',
  [CalendarType.years]: 'Год',
};

export const YEARS_IN_CALENDAR = 12;

export interface IMonthCalendar {
  days: IDay[];
  year: number;
  month: {
    name: string;
    index: number;
  };
}

export interface IMonthCalendarRange extends Omit<IMonthCalendar, 'days'> {
  days: IDayRange[];
}

export interface IYearCalendar {
  year: number;
  months: IMonth[];
}

export interface IYearCalendarRange extends Omit<IYearCalendar, 'months'> {
  months: IMonthRange[];
}

export interface IYearsCalendar {
  years: IYear[];
}

export interface IYearsCalendarRange {
  years: IYearRange[];
}

export interface IAppCalendarProps {
  calendarType: CalendarType;
  modelValue: Date;
  isInactiveRule?: (date: Date) => boolean;
}
