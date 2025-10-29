import type { ISmartInputProps } from '@libs/components/inputs-types';
import {
  smartInputPropsNamesTypes,
  type BooleanKeys,
  type IconNameKeys,
  type ISelectItemArrayKeys,
  type ISelectItemKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof ISmartInputProps<string>): propName is BooleanKeys =>
  smartInputPropsNamesTypes[propName] === 'boolean';

export const isIconName = (propName: keyof ISmartInputProps<string>): propName is IconNameKeys =>
  smartInputPropsNamesTypes[propName] === 'IconName';

export const isSize = (propName: keyof ISmartInputProps<string>): propName is SizeKeys =>
  smartInputPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof ISmartInputProps<string>): propName is StringArrayKeys =>
  smartInputPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof ISmartInputProps<string>): propName is NumberKeys =>
  smartInputPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof ISmartInputProps<string>): propName is StringKeys =>
  smartInputPropsNamesTypes[propName] === 'string';

export const isISelectItemArray = (propName: keyof ISmartInputProps<string>): propName is ISelectItemArrayKeys =>
  smartInputPropsNamesTypes[propName] === 'ISelectItemArray';

export const isISelectItem = (propName: keyof ISmartInputProps<string>): propName is ISelectItemKeys =>
  smartInputPropsNamesTypes[propName] === 'ISelectItem';
