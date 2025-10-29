import type { KeyAndType, ValueTypeWithKeysWithValueType } from '@/views/utils/models';
import type { IBaseInputProps } from '@libs/components/inputs-types';

export type BooleanKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['boolean'];
export type IClickableIconKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['IClickableIcon'];
export type IconNameKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['IconName'];
export type IconShowModeKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['IconShowMode'];
export type InputTypeKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['InputType'];
export type SizeKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['Size'];
export type StringArrayKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['StringArray'];
export type NumberKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['number'];
export type StringKeys = ValueTypeWithKeysWithValueType<Required<IBaseInputProps>>['string'];

export const baseInputPropsNamesTypes: KeyAndType<Required<IBaseInputProps>> = {
  iconRight: 'IClickableIcon',
  iconRightShowMode: 'IconShowMode',
  inputClass: 'StringArray',
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

export const baseInputPropsNames: { [K in keyof IBaseInputProps]: K } = {
  modelValue: 'modelValue',
  label: 'label',
  placeholder: 'placeholder',
  iconLeft: 'iconLeft',
  iconRight: 'iconRight',
  iconRightShowMode: 'iconRightShowMode',
  type: 'type',
  size: 'size',
  errorList: 'errorList',
  disabled: 'disabled',
  required: 'required',
  isError: 'isError',
  isCorrect: 'isCorrect',
};
