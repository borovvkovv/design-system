import type { ISimpleSelectProps } from '@libs/components/inputs-types';
import {
  simpleSelectPropsNamesTypes,
  type BooleanKeys,
  type ISelectItemArrayKeys,
  type ISelectItemKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof ISimpleSelectProps<string>): propName is BooleanKeys =>
  simpleSelectPropsNamesTypes[propName] === 'boolean';

export const isSize = (propName: keyof ISimpleSelectProps<string>): propName is SizeKeys =>
  simpleSelectPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof ISimpleSelectProps<string>): propName is StringArrayKeys =>
  simpleSelectPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof ISimpleSelectProps<string>): propName is NumberKeys =>
  simpleSelectPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof ISimpleSelectProps<string>): propName is StringKeys =>
  simpleSelectPropsNamesTypes[propName] === 'string';

export const isISelectItemArray = (propName: keyof ISimpleSelectProps<string>): propName is ISelectItemArrayKeys =>
  simpleSelectPropsNamesTypes[propName] === 'ISelectItemArray';

export const isISelectItem = (propName: keyof ISimpleSelectProps<string>): propName is ISelectItemKeys =>
  simpleSelectPropsNamesTypes[propName] === 'ISelectItem';
