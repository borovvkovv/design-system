import type { IconName } from '@comp/components/icons/utils/models';

export type SelectKeyType = number | string;

export interface ISelectItem<T extends SelectKeyType = string> {
  value: T;
  title: string;
}

export interface ISearchResultSpanText {
  usualText?: string;
  coloredText?: string;
  restText?: string;
}

export interface IListItem<T extends string = string> extends ISelectItem<T> {
  displayValue?: string;
  isColored?: boolean;
}

export interface IBaseSimpleDropDownProps {
  isDisabled?: boolean;
}

export interface ISimpleDropDown extends IBaseSimpleDropDownProps {
  text: string;
  isFirstInList?: boolean;
  isLastInList?: boolean;
  showBorder?: boolean;
}

export interface IAccordionProps<Model> extends IBaseSimpleDropDownProps {
  actions?: Array<IAccordionAction<Model>>;
  activeArrowOnTitleHover?: boolean;
}

export interface IAccordionAction<Model> {
  icon: IconName;
  title: string;
  onIconClick: (value: Model) => void;
  isActive?: boolean;
  isAlwaysVisible?: boolean;
}

export interface IAccordionWithInputProps<Model> extends IAccordionProps<Model> {
  orderValue: string;
  isInputError: boolean;
  title: string;
  pattern: string;
  textBeforeInput?: string;
}

export enum TextColorType {
  Text,
  BackGround,
}

export interface IColorText {
  text: string;
  isColored: boolean;
  colorType?: TextColorType;
}
