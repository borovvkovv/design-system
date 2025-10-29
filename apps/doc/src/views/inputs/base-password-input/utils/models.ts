import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { IPasswordInputProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<IPasswordInputProps>>['boolean'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<IPasswordInputProps>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<IPasswordInputProps>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<IPasswordInputProps>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<IPasswordInputProps>>['string'];

export const basePasswordInputPropsNamesTypes: KeyAndType<Required<IPasswordInputProps>> = {
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

export const basePasswordInputPropsNames: { [K in keyof IPasswordInputProps]: K } = {
  modelValue: 'modelValue',
  placeholder: 'placeholder',
  size: 'size',
  label: 'label',
  minWidth: 'minWidth',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  isError: 'isError',
  isCorrect: 'isCorrect',
};
