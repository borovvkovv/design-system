import type { ILinkProps } from '@comp/components/app-link/utils/models';
import type { TAllClassNames } from '@comp/types/cssClasses';
import type {
  Extends,
  ModifierAbstract,
  TModifierBorder,
  TModifierPadding,
  TModifierPosition,
  TModifierText,
  TModifierTextAlign,
  TModifierTextColor,
  TModifierWidth,
} from '@comp/components/modifiers';

type TItemModifier = Extends<
  ModifierAbstract,
  {
    text?: TModifierText;
    textColor?: TModifierTextColor;
    textAlign?: TModifierTextAlign;
    verticalAlign?: TAllClassNames;
    padding?: TModifierPadding | TModifierPadding[];
    border?: TModifierBorder[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

type TMenuModifier = Extends<
  ModifierAbstract,
  {
    text?: TModifierText;
    textColor?: TModifierTextColor;
    width?: TModifierWidth | TModifierWidth[];
    other?: TAllClassNames | TAllClassNames[];
    padding?: TModifierPadding | TModifierPadding[];
    position?: TModifierPosition;
  }
>;

type TItemCommon = {
  modifier?: TItemModifier;
};

type TItemLink = { type: 'link'; title: string; click?(): void } & ILinkProps & TItemCommon;
type TItemText = { type: 'text'; text: string; click?(): void } & TItemCommon;

export type TItem = TItemLink | TItemText;

export type IMenu = {
  items: TItem[];
  modifier?: TMenuModifier;
};
