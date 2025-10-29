import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { ICalendarRangeSelectProps } from '@libs/components/inputs-types';

export type DateKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['Date'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['string'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['Size'];
export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['boolean'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['number'];
export type PredicateKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['Predicate'];
export type CalendarTypeKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['CalendarType'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<ICalendarRangeSelectProps>>['StringArray'];

export const calendarRangePropsNamesTypes: KeyAndType<Required<ICalendarRangeSelectProps>> = {
  minValue: 'Date',
  maxValue: 'Date',
  placeholderForMinValue: 'string',
  placeholderForMaxValue: 'string',
  size: 'Size',
  label: 'string',
  disabled: 'boolean',
  minWidth: 'number',
  isNotPreventDefaultEnter: 'boolean',
  required: 'boolean',
  calendarType: 'CalendarType',
  isInactiveRule: 'Predicate',
  showError: 'boolean',
  inactiveErrorText: 'string',
  isError: 'boolean',
  errorList: 'StringArray',
};

export const calendarRangePropsNames: { [K in keyof ICalendarRangeSelectProps]: K } = {
  minValue: 'minValue',
  maxValue: 'maxValue',
  placeholderForMinValue: 'placeholderForMinValue',
  placeholderForMaxValue: 'placeholderForMaxValue',
  inactiveErrorText: 'inactiveErrorText',
  calendarType: 'calendarType',
  size: 'size',
  label: 'label',
  isInactiveRule: 'isInactiveRule',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  showError: 'showError',
  isError: 'isError',
};
