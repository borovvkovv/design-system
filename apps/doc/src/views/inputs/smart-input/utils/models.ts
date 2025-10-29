import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { ISmartInputProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['boolean'];
export type IconNameKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['IconName'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['string'];
export type ISelectItemArrayKeys = ValueTypeWithKeysWithValueType<
  Required<ISmartInputProps<string>>
>['ISelectItemArray'];
export type ISelectItemKeys = ValueTypeWithKeysWithValueType<Required<ISmartInputProps<string>>>['ISelectItem'];

export const smartInputPropsNamesTypes: KeyAndType<Required<ISmartInputProps<string>>> = {
  iconLeft: 'IconName',
  title: 'string',
  count: 'number',
  placeholder: 'string',
  size: 'Size',
  label: 'string',
  disabled: 'boolean',
  minWidth: 'number',
  isNotPreventDefaultEnter: 'boolean',
  required: 'boolean',
  isError: 'boolean',
  errorList: 'StringArray',
  options: 'ISelectItemArray',
  modelValue: 'ISelectItem',
};

export const smartInputPropsNames: { [K in keyof ISmartInputProps<string>]: K } = {
  options: 'options',
  modelValue: 'modelValue',
  title: 'title',
  label: 'label',
  placeholder: 'placeholder',
  iconLeft: 'iconLeft',
  size: 'size',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  isError: 'isError',
};
