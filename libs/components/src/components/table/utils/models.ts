import type { TAllClassNames } from '@comp/types/cssClasses';
import type {
  Extends,
  ModifierAbstract,
  TModifierBorder,
  TModifierPadding,
  TModifierText,
  TModifierTextAlign,
  TModifierTextColor,
  TModifierWidth,
} from '@comp/components/modifiers';
import type { TTabBase } from '@comp/components/tab-data/utils/models';
import type { ITextButtonProps } from '@comp/components/buttons/utils/models';
import type { IBaseInputProps } from '@comp/components/inputs/utils/models';
import type { IBaseTagProps } from '@comp/components/tags/utils/models';
import type { LineSkeletonProps } from '@comp/components/skeletons/utils/models';
import type { IconName } from '@comp/components/icons/utils/models';
import type { VNode } from 'vue';
import type { LinksStyles } from '@comp/components/app-link/utils/models';

export type TCellModifier = Extends<
  ModifierAbstract,
  {
    text?: TModifierText;
    textColor?: TModifierTextColor;
    textAlign?: TModifierTextAlign;
    verticalAlign?: TAllClassNames;
    padding?: TModifierPadding | TModifierPadding[];
    border?: TModifierBorder[];
    width?: TModifierWidth | TModifierWidth[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TRowModifier = Extends<
  ModifierAbstract,
  {
    text?: TModifierText;
    textColor?: TModifierTextColor;
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TTableModifier = Extends<
  ModifierAbstract,
  {
    text?: TModifierText;
    textColor?: TModifierTextColor;
    width?: TModifierWidth | TModifierWidth[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TCellButton = ITextButtonProps & {
  click(): void;
};

export type TCellSpanText = { type: 'text'; text?: string; modifier?: TCellModifier; value?: string };
export type TCellSpanLink = { type: 'link'; title: string; href: string; click?(): void; modifier?: TCellModifier };
export type TCellSpan = TCellSpanText | TCellSpanLink;

export type TCellCommon = {
  modifier?: TCellModifier;
  rowspan?: number;
  colspan?: number;
};

export type TCellOverflowText = {
  maxLines?: number;
};

export type TCellSearch = {
  pattern: string;
};

export type TCellLink = {
  type: 'link';
  title: string;
  href: string;
  linkStyle?: LinksStyles;
  isDisabled?: boolean;
  click?(): void;
} & TCellCommon &
  TCellOverflowText &
  Partial<TCellSearch>;

export type TCellText = { type: 'text'; text: string; value?: string } & TCellCommon &
  TCellOverflowText &
  Partial<TCellSearch>;

export type TCellTexts = { type: 'texts'; spans: TCellSpan[] } & TCellCommon;
export type TCellButtons = { type: 'buttons'; buttons: TCellButton[] } & TCellCommon;
export type TCellInput = { type: 'input'; input: IBaseInputProps } & TCellCommon;
export type TCellSearchSpan = { type: 'search'; text: string } & TCellCommon & TCellOverflowText & TCellSearch;
export type TCellTag = { type: 'tag'; tag: IBaseTagProps } & TCellCommon;
export type TCellIcon = { type: 'icon'; icon: IconName; size?: number } & TCellCommon;
export type TCellCustomRender = { type: 'render'; nodeRender: VNode } & TCellCommon;
export type TCellCheckBox = {
  type: 'checkBox';
  isChecked: boolean | null;
} & TCellCommon;
export type THeaderCell = { text: string } & TCellCommon;

export type TCell =
  | TCellLink
  | TCellText
  | TCellButtons
  | TCellSearchSpan
  | TCellInput
  | TCellTag
  | TCellTexts
  | TCellIcon
  | TCellCustomRender
  | TCellCheckBox;
export type TCellSorted = TCell & { sortingIndex: number; beforeSortIndex: number };

export type TRow = {
  cells: TCell[];
  modifier?: TRowModifier;
};

export type THeaderRow = {
  cells: THeaderCell[];
  modifier?: TRowModifier;
};

export type TTableBase = {
  header: THeaderRow | THeaderRow[];
  modifier?: TTableModifier;
  isHeaderSticky?: boolean;
  isColumnSticky?: boolean;
};

export type TTableData = TTableBase & {
  rows: TRow[];
};

export type TTableModelRows<Model extends unknown> = {
  rowFactory: (modelItem: Model, rowIndex?: number) => TRow;
  model: Model[];
  modelChanges: (row: TRow) => Model;
};

export type TTableModel<Model extends unknown> = TTableBase & {
  rows: TTableModelRows<Model>;
};

export type TTabTable = TTabBase<TTableData>;

export interface BaseAppTableProps {
  isLoading: boolean;
  loadingConfig?: LineSkeletonProps;
  showNoDataStub?: boolean;
  noDataStubTexts?: string[];
  noDataStubHeight?: number;
  stickyHeaderStubContainer?: HTMLElement;
}

export interface AppTableProps extends BaseAppTableProps {
  modelValue: TTableData | null;
}

export interface AppTableModelProps<Model> extends BaseAppTableProps {
  modelValue: TTableModel<Model>;
}
