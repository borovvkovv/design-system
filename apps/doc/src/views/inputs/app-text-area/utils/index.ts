import type { IAppTextAreaProps } from '@libs/components/inputs-types';
import {
  appTextAreaPropsNamesTypes,
  type BooleanKeys,
  type NumberKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof IAppTextAreaProps): propName is BooleanKeys =>
  appTextAreaPropsNamesTypes[propName] === 'boolean';

export const isStringArray = (propName: keyof IAppTextAreaProps): propName is StringArrayKeys =>
  appTextAreaPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof IAppTextAreaProps): propName is NumberKeys =>
  appTextAreaPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof IAppTextAreaProps): propName is StringKeys =>
  appTextAreaPropsNamesTypes[propName] === 'string';
