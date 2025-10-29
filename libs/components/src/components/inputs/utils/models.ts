import type { IconName } from '@comp/components/icons/utils/models';
import type { BaseValidation } from '@vuelidate/core';
import { type Component, defineAsyncComponent } from 'vue';
import type { Size } from '@comp/enums';
import type { CalendarType } from '@comp/components/calendars/utils/models';
import type { ISelectItem, SelectKeyType } from '@comp/components/selects/utils/models';

export const MIN_YEAR_IN_DATE_INPUT = 1900;

export const MAX_YEAR_IN_DATE_INPUT = new Date().getFullYear() + 100;

export const RANGE_IN_YEARS = MAX_YEAR_IN_DATE_INPUT - MIN_YEAR_IN_DATE_INPUT;

export enum InputType {
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Url = 'url',
}

export type IconShowMode = 'AllTime' | 'OnFocus';

export interface IClickableIcon {
  iconName: IconName;
  onIconClick?: () => void;
  size?: number;
}

export interface IBaseInputIconProps extends IClickableIcon {
  disabled?: boolean;
}

export interface IInput {
  modelValue: string;
}

export interface IError {
  isError?: boolean;
  errorList?: Array<string>;
}

export interface IBaseInput {
  size?: Size.XS | Size.S | Size.M;
  label?: string;
  disabled?: boolean;
  minWidth?: number;
  isNotPreventDefaultEnter?: boolean;
  required?: boolean;
}

export interface IBaseSearchInput extends IBaseInput {
  placeholder?: string;
}

export interface IBaseSearchInputProps extends IBaseSearchInput, IInput {}

export interface IPasswordInputProps extends IBaseSearchInputProps, IError {
  isCorrect?: boolean;
}

export interface ISimpleInputProps extends IPasswordInputProps {
  type?: InputType;
  iconLeft?: IconName;
}

export interface IBaseInputProps extends ISimpleInputProps {
  iconRight?: IClickableIcon;
  iconRightShowMode?: IconShowMode;
  inputClass?: Array<string>;
}

export interface IAppValidatableInputProps {
  inputType?: InputType;
  label?: string;
  placeholder?: string;
  modelValue: BaseValidation<string>;
  isDisabled?: boolean;
}

export interface IBaseDateInputProps {
  calendarType: CalendarType;
  isInactiveRule?: (date: Date) => boolean;
  showError?: boolean;
  inactiveErrorText?: string;
}

export interface IDateInputProps extends IBaseSearchInput, IBaseDateInputProps {
  modelValue: Date;
}

export interface IDateRangeInputProps extends IBaseInput, IBaseDateInputProps, IError {
  minValue: Date | undefined;
  maxValue: Date | undefined;
  placeholderForMinValue?: string;
  placeholderForMaxValue?: string;
}

export interface ICalendarSelectProps extends IDateInputProps {}

export interface ICalendarRangeSelectProps extends IDateRangeInputProps {}

export interface ISelectError extends IError {
  isLoading?: boolean;
  isErrorLoading?: boolean;
}

export interface IBaseSimpleSelectProps extends IBaseSearchInput, ISelectError {
  query: string;
  isEmpty?: boolean;
  isFullWidthDropDown?: boolean;
}

export interface ISimpleSelectBase extends IBaseSearchInput, ISelectError {}

export interface ISimpleSelectProps<TKey extends SelectKeyType> extends ISimpleSelectBase, ISelect<TKey> {}

export interface ISmartInputProps<TKey extends SelectKeyType> extends IBaseSearchInput, IError, ISelect<TKey> {
  iconLeft?: IconName;
  title?: string;
  count?: number;
}

export interface ISelect<TKey extends SelectKeyType> {
  options: Array<ISelectItem<TKey>>;
  modelValue: ISelectItem<TKey> | undefined;
}

export interface IMultiSelect {
  options: Array<ISelectItem>;
  selectedOptions: Array<ISelectItem>;
}

export const InputComponents: { [key: string]: Component } = {
  BasePasswordInput: defineAsyncComponent(() => import('@comp/components/inputs/BasePasswordInput.vue')),
  BaseSimpleInput: defineAsyncComponent(() => import('@comp/components/inputs/BaseSimpleInput.vue')),
};

export interface IMultipleSelectProps extends IBaseSearchInput, ISelectError, IMultiSelect {}

export interface IAppTextAreaPropsBase {
  placeholder?: string;
  isDisabled?: boolean;
  rows?: number;
  label?: string;
  required?: boolean;
}

export interface IAppTextAreaProps extends IAppTextAreaPropsBase {
  modelValue: string;
  isError?: boolean;
  errorList?: string[];
}

export interface IAppValidatableTextAreaProps extends IAppTextAreaPropsBase {
  modelValue: BaseValidation<string>;
}

export interface IAppCheckboxProps {
  modelValue: boolean | null;
  label?: string;
  isDisabled?: boolean;
  isError?: boolean;
  fieldId?: string;
  tabindex?: number | string;
  inverseColor?: boolean;
}

export interface IAppRadiobuttonProps {
  modelValue: string;
  value: string;
  groupName: string;
  label?: string;
  isDisabled?: boolean;
  isError?: boolean;
  fieldId?: string;
}

export interface IAppSwitcherProps {
  modelValue: boolean;
  isDisabled?: boolean;
  tabIndex?: number | string;
}
