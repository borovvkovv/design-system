import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { ISimpleInputProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['boolean'];
export type IconNameKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['IconName'];
export type InputTypeKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['InputType'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<ISimpleInputProps>>['string'];

export const baseSimpleInputPropsNamesTypes: KeyAndType<Required<ISimpleInputProps>> = {
  type: 'InputType',
  iconLeft: 'IconName',
  isCorrect: 'boolean',
  placeholder: 'string',
  size: 'Size',
  label: 'string',
  disabled: 'boolean',
  minWidth: 'number',
  isNotPreventDefaultEnter: 'boolean',
  required: 'boolean',
  modelValue: 'string',
  isError: 'boolean',
  errorList: 'StringArray',
};

export const baseSimpleInputPropsNames: { [K in keyof ISimpleInputProps]: K } = {
  modelValue: 'modelValue',
  label: 'label',
  placeholder: 'placeholder',
  iconLeft: 'iconLeft',
  type: 'type',
  size: 'size',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  isError: 'isError',
  isCorrect: 'isCorrect',
};
