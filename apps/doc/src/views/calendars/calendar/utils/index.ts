import type { ICalendarSelectProps } from '@libs/components/inputs-types';
import {
  calendarSelectPropsNamesTypes,
  type DateKeys,
  type PredicateKeys,
  type CalendarTypeKeys,
  type StringKeys,
  type SizeKeys,
  type BooleanKeys,
  type NumberKeys,
} from './models';

export const isDate = (propName: keyof ICalendarSelectProps): propName is DateKeys =>
  calendarSelectPropsNamesTypes[propName] === 'Date';

export const isString = (propName: keyof ICalendarSelectProps): propName is StringKeys =>
  calendarSelectPropsNamesTypes[propName] === 'string';

export const isSize = (propName: keyof ICalendarSelectProps): propName is SizeKeys =>
  calendarSelectPropsNamesTypes[propName] === 'Size';

export const isBoolean = (propName: keyof ICalendarSelectProps): propName is BooleanKeys =>
  calendarSelectPropsNamesTypes[propName] === 'boolean';

export const isNumber = (propName: keyof ICalendarSelectProps): propName is NumberKeys =>
  calendarSelectPropsNamesTypes[propName] === 'number';

export const isPredicate = (propName: keyof ICalendarSelectProps): propName is PredicateKeys =>
  calendarSelectPropsNamesTypes[propName] === 'Predicate';

export const isCalendarTypeKeysArray = (propName: keyof ICalendarSelectProps): propName is CalendarTypeKeys =>
  calendarSelectPropsNamesTypes[propName] === 'CalendarType';
