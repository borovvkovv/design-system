import type { ISimpleInputProps } from '@libs/components/inputs-types';
import {
  baseSimpleInputPropsNamesTypes,
  type BooleanKeys,
  type IconNameKeys,
  type InputTypeKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof ISimpleInputProps): propName is BooleanKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'boolean';

export const isIconName = (propName: keyof ISimpleInputProps): propName is IconNameKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'IconName';

export const isInputType = (propName: keyof ISimpleInputProps): propName is InputTypeKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'InputType';

export const isSize = (propName: keyof ISimpleInputProps): propName is SizeKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof ISimpleInputProps): propName is StringArrayKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof ISimpleInputProps): propName is NumberKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof ISimpleInputProps): propName is StringKeys =>
  baseSimpleInputPropsNamesTypes[propName] === 'string';
