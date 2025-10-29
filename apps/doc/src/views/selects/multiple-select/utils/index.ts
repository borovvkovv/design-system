import type { IMultipleSelectProps } from '@libs/components/inputs-types';
import {
  multipleSelectPropsNamesTypes,
  type BooleanKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';
import type { ISelectItemArrayKeys } from '@/views/inputs/smart-input/utils/models';

export const isBoolean = (propName: keyof IMultipleSelectProps): propName is BooleanKeys =>
  multipleSelectPropsNamesTypes[propName] === 'boolean';

export const isSize = (propName: keyof IMultipleSelectProps): propName is SizeKeys =>
  multipleSelectPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof IMultipleSelectProps): propName is StringArrayKeys =>
  multipleSelectPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof IMultipleSelectProps): propName is NumberKeys =>
  multipleSelectPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof IMultipleSelectProps): propName is StringKeys =>
  multipleSelectPropsNamesTypes[propName] === 'string';

export const isISelectItemArray = (propName: keyof IMultipleSelectProps): propName is ISelectItemArrayKeys =>
  multipleSelectPropsNamesTypes[propName] === 'ISelectItemArray';
