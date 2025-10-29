import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { ICalendarSelectProps } from '@libs/components/inputs-types';

export type DateKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['Date'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['string'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['Size'];
export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['boolean'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['number'];
export type PredicateKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['Predicate'];
export type CalendarTypeKeys = ValueTypeWithKeysWithValueType<Required<ICalendarSelectProps>>['CalendarType'];

export const calendarSelectPropsNamesTypes: KeyAndType<Required<ICalendarSelectProps>> = {
  modelValue: 'Date',
  placeholder: 'string',
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
};

export const calendarselectPropsNames: { [K in keyof ICalendarSelectProps]: K } = {
  modelValue: 'modelValue',
  placeholder: 'placeholder',
  label: 'label',
  inactiveErrorText: 'inactiveErrorText',
  size: 'size',
  calendarType: 'calendarType',
  isInactiveRule: 'isInactiveRule',
  disabled: 'disabled',
  required: 'required',
  showError: 'showError',
};
