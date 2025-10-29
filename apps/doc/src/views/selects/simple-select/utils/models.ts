import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { ISimpleSelectProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['boolean'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['string'];
export type ISelectItemArrayKeys = ValueTypeWithKeysWithValueType<
  Required<ISimpleSelectProps<string>>
>['ISelectItemArray'];
export type ISelectItemKeys = ValueTypeWithKeysWithValueType<Required<ISimpleSelectProps<string>>>['ISelectItem'];

export const simpleSelectPropsNamesTypes: KeyAndType<Required<ISimpleSelectProps<string>>> = {
  modelValue: 'ISelectItem',
  options: 'ISelectItemArray',
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
};

export const simpleSelectPropsNames: { [K in keyof ISimpleSelectProps<string>]: K } = {
  modelValue: 'modelValue',
  options: 'options',
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
