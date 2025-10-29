import type { IPasswordInputProps } from '@libs/components/inputs-types';
import {
  basePasswordInputPropsNamesTypes,
  type BooleanKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof IPasswordInputProps): propName is BooleanKeys =>
  basePasswordInputPropsNamesTypes[propName] === 'boolean';

export const isSize = (propName: keyof IPasswordInputProps): propName is SizeKeys =>
  basePasswordInputPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof IPasswordInputProps): propName is StringArrayKeys =>
  basePasswordInputPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof IPasswordInputProps): propName is NumberKeys =>
  basePasswordInputPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof IPasswordInputProps): propName is StringKeys =>
  basePasswordInputPropsNamesTypes[propName] === 'string';
