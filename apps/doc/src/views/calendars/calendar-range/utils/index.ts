import type { ICalendarRangeSelectProps } from '@libs/components/inputs-types';
import {
  type StringKeys,
  type SizeKeys,
  type BooleanKeys,
  type NumberKeys,
  calendarRangePropsNamesTypes,
  type StringArrayKeys,
  type CalendarTypeKeys,
  type PredicateKeys,
  type DateKeys,
} from './models';

export const isDate = (propName: keyof ICalendarRangeSelectProps): propName is DateKeys =>
  calendarRangePropsNamesTypes[propName] === 'Date';

export const isString = (propName: keyof ICalendarRangeSelectProps): propName is StringKeys =>
  calendarRangePropsNamesTypes[propName] === 'string';

export const isSize = (propName: keyof ICalendarRangeSelectProps): propName is SizeKeys =>
  calendarRangePropsNamesTypes[propName] === 'Size';

export const isBoolean = (propName: keyof ICalendarRangeSelectProps): propName is BooleanKeys =>
  calendarRangePropsNamesTypes[propName] === 'boolean';

export const isNumber = (propName: keyof ICalendarRangeSelectProps): propName is NumberKeys =>
  calendarRangePropsNamesTypes[propName] === 'number';

export const isPredicate = (propName: keyof ICalendarRangeSelectProps): propName is PredicateKeys =>
  calendarRangePropsNamesTypes[propName] === 'Predicate';

export const isCalendarTypeKeysArray = (propName: keyof ICalendarRangeSelectProps): propName is CalendarTypeKeys =>
  calendarRangePropsNamesTypes[propName] === 'CalendarType';

export const isStringArrayKeys = (propName: keyof ICalendarRangeSelectProps): propName is StringArrayKeys =>
  calendarRangePropsNamesTypes[propName] === 'CalendarType';
