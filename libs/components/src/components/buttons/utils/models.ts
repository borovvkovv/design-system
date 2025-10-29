import type { AppColor, Size } from '@comp/enums';
import type { IconName } from '@comp/components/icons/utils/models';

export enum IconPosition {
  Left,
  Right,
}

export interface IBaseButtonProps {
  size?: Size.M | Size.S | Size.XS;
  color?: AppColor.DarkBlue | AppColor.Blue | AppColor.Grey | AppColor.Red;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

export interface ITextButtonProps extends IBaseButtonProps {
  text: string;
}

export interface IIconTextButtonProps extends ITextButtonProps {
  iconName: IconName;
  iconPosition?: IconPosition;
  for?: string;
}

export interface IIconButtonProps extends IBaseButtonProps {
  iconName: IconName;
  popupText?: string;
}

export type Switcher<T> = {
  left: {
    text: string;
    value: T;
  };
  right: {
    text: string;
    value: T;
  };
};

export interface ISwitcherButtonProps<T> {
  modelValue: T;
  switcher: Switcher<T>;
}
