import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { IAppTextAreaProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<IAppTextAreaProps>>['boolean'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<IAppTextAreaProps>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<IAppTextAreaProps>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<IAppTextAreaProps>>['string'];

export const appTextAreaPropsNamesTypes: KeyAndType<Required<IAppTextAreaProps>> = {
  modelValue: 'string',
  isError: 'boolean',
  errorList: 'StringArray',
  placeholder: 'string',
  isDisabled: 'boolean',
  rows: 'number',
  label: 'string',
  required: 'boolean',
};

export const appTextAreaPropsNames: { [K in keyof IAppTextAreaProps]: K } = {
  modelValue: 'modelValue',
  placeholder: 'placeholder',
  label: 'label',
  rows: 'rows',
  errorList: 'errorList',
  isError: 'isError',
  isDisabled: 'isDisabled',
  required: 'required',
};
