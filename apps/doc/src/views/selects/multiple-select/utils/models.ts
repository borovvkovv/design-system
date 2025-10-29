import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { IMultipleSelectProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['boolean'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['string'];
export type ISelectItemKeys = ValueTypeWithKeysWithValueType<Required<IMultipleSelectProps>>['ISelectItemArray'];

export const multipleSelectPropsNamesTypes: KeyAndType<Required<IMultipleSelectProps>> = {
  placeholder: 'string',
  size: 'Size',
  label: 'string',
  disabled: 'boolean',
  minWidth: 'number',
  isNotPreventDefaultEnter: 'boolean',
  required: 'boolean',
  isLoading: 'boolean',
  isErrorLoading: 'boolean',
  isError: 'boolean',
  errorList: 'StringArray',
  options: 'ISelectItemArray',
  selectedOptions: 'ISelectItemArray',
};

export const multipleSelectPropsNames: { [K in keyof IMultipleSelectProps]: K } = {
  options: 'options',
  selectedOptions: 'selectedOptions',
  placeholder: 'placeholder',
  size: 'size',
  label: 'label',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  isLoading: 'isLoading',
  isErrorLoading: 'isErrorLoading',
  isError: 'isError',
};
