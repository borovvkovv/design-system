import type {
  TAllClassNames,
  TPaddingClassNames,
  TTextClassNames,
  TBorderClassNames,
  TPositionClassNames,
} from '@comp/types/cssClasses';

export type Extends<T, U extends T> = U;
export type ModifierType =
  | 'text'
  | 'textColor'
  | 'textAlign'
  | 'verticalAlign'
  | 'padding'
  | 'width'
  | 'other'
  | 'border';

export type ModifierAbstract = {
  [key in ModifierType]?: TAllClassNames | TAllClassNames[];
};

export type TModifierText =
  | 'text-size-2'
  | 'text-size-3'
  | 'text-size-4'
  | 'text-size-5'
  | 'text-size-6'
  | 'text-size-7'
  | 'text-size-h4'
  | 'text-size-h5';

export type TModifierTextAlign = Extends<TAllClassNames, 'text-left' | 'text-right' | 'text-center'>;
export type TModifierTextColor = Extends<TAllClassNames, TTextClassNames>;
export type TModifierPadding = Extends<TAllClassNames, TPaddingClassNames>;
export type TModifierBorder = Extends<TAllClassNames, TBorderClassNames>;
export type TModifierWidth = TAllClassNames;
export type TModifierPosition = Extends<TAllClassNames, TPositionClassNames>;
