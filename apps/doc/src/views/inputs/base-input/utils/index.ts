import type { IBaseInputProps } from '@libs/components/inputs-types';
import {
  baseInputPropsNamesTypes,
  type BooleanKeys,
  type IClickableIconKeys,
  type IconNameKeys,
  type IconShowModeKeys,
  type InputTypeKeys,
  type NumberKeys,
  type SizeKeys,
  type StringArrayKeys,
  type StringKeys,
} from './models';

export const isBoolean = (propName: keyof IBaseInputProps): propName is BooleanKeys =>
  baseInputPropsNamesTypes[propName] === 'boolean';

export const isIClickableIcon = (propName: keyof IBaseInputProps): propName is IClickableIconKeys =>
  baseInputPropsNamesTypes[propName] === 'IClickableIcon';

export const isIconName = (propName: keyof IBaseInputProps): propName is IconNameKeys =>
  baseInputPropsNamesTypes[propName] === 'IconName';

export const isIconShowMode = (propName: keyof IBaseInputProps): propName is IconShowModeKeys =>
  baseInputPropsNamesTypes[propName] === 'IconShowMode';

export const isInputType = (propName: keyof IBaseInputProps): propName is InputTypeKeys =>
  baseInputPropsNamesTypes[propName] === 'InputType';

export const isSize = (propName: keyof IBaseInputProps): propName is SizeKeys =>
  baseInputPropsNamesTypes[propName] === 'Size';

export const isStringArray = (propName: keyof IBaseInputProps): propName is StringArrayKeys =>
  baseInputPropsNamesTypes[propName] === 'StringArray';

export const isNumber = (propName: keyof IBaseInputProps): propName is NumberKeys =>
  baseInputPropsNamesTypes[propName] === 'number';

export const isString = (propName: keyof IBaseInputProps): propName is StringKeys =>
  baseInputPropsNamesTypes[propName] === 'string';
