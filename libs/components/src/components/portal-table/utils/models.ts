import type { MaybeRef } from 'vue';
import type { LocationQueryValueRaw } from 'vue-router';
import type { SortOrderEnum } from '@comp/enums/sort-order';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { TAllClassNames, TBorderClassNames, TPaddingClassNames } from '@comp/types/cssClasses';
import type { IconName } from '@comp/components/icons/utils/models';
import type { IBaseDateInputProps } from '@comp/components/inputs/utils/models';
import type { Extends, ModifierAbstract, TModifierTextColor } from '@comp/components/modifiers';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import type {
  BaseAppTableProps,
  TCell,
  TRowModifier,
  TCellIcon,
  TCellText,
  TTableBase,
  TCellCheckBox,
} from '@comp/components/table/utils/models';

export const DEFAULT_MIN_WIDTH_PX = 40;
export const PORTAL_TABLE_COLUMN_THROTTLE_DRAGGING_MS = 5;

export type TPortalCell = TCell;

export type TPortalRowPopupModifier = Extends<
  ModifierAbstract,
  {
    textColor?: TModifierTextColor | TModifierTextColor[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TPortalRowPopup = {
  text: string;
  modifier?: TPortalRowPopupModifier;
};

export type TPortalRow<Model> = {
  cells: TPortalCell[];
  modifier?: TRowModifier;
  actionsSection?: TRowActionsSection<Model>;
  isDisabled?: boolean;
  popup?: TPortalRowPopup;
};

export type TRowActionsSection<Model> = {
  actions?: Array<TRowAction<Model>>;
  modifier?: TRowActionsModifier;
};

export type TRowActionsModifier = Extends<
  ModifierAbstract,
  {
    border?: TBorderClassNames | TBorderClassNames[];
    padding?: TPaddingClassNames | TPaddingClassNames[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TRowAction<Model> = {
  icon: IconName;
  title: string;
  onIconClick: (value: Model) => void;
  modifier?: TRowActionModifier;
};

export type TRowActionModifier = Extends<
  ModifierAbstract,
  {
    textColor?: TModifierTextColor | TModifierTextColor[];
    other?: TAllClassNames | TAllClassNames[];
  }
>;

export type TColumnControlFilterSingleCommon = {
  column: string;
  placeholder: string;
};

export type TColumnControlFilterRangeCommon = {
  minValueName: string;
  maxValueName: string;
};

export type ISelectedOption = {
  getColumnData: () => UseQueryReturnType<ISelectItem[], Error | null> | ISelectItem[];
};

export type TColumnControlFilterSwitchSelect = TColumnControlFilterSingleCommon &
  ISelectedOption & {
    type: 'filterSelectSwitch';
  };

export type TColumnControlFilterNumberRange = TColumnControlFilterRangeCommon & {
  type: 'filterNumberRange';
  measureIconName?: IconName;
};

export type TColumnControlFilterDateRange = TColumnControlFilterRangeCommon &
  IBaseDateInputProps & {
    type: 'filterDateRange';
    defaultMinValueDate?: Date;
    defaultMaxValueDate?: Date;
  };

export type TColumnControlFilterSelect = TColumnControlFilterSingleCommon &
  ISelectedOption & {
    type: 'filterSelect';
  };

export type TColumnControlFilterSwitchMultiSelect = TColumnControlFilterSingleCommon &
  ISelectedOption & {
    type: 'filterMultiSelectSwitch';
    selectedZeroText?: string;
    selectedAllText?: string;
    filterNotAppliedText?: string;
  };

export type TColumnControlFilterText = TColumnControlFilterSingleCommon & {
  type: 'filterText';
};

export type TColumnControlSort = {
  type: 'sort';
  sortOrder?: SortOrderEnum;
  sortCode: number;
  onChangeSortOrderHandler: () => void;
  column: string;
};

export type PortalTableFilter =
  | TColumnControlFilterSwitchSelect
  | TColumnControlFilterNumberRange
  | TColumnControlFilterSelect
  | TColumnControlFilterSwitchMultiSelect
  | TColumnControlFilterDateRange
  | TColumnControlFilterText;

export type TColumnControl = PortalTableFilter | TColumnControlSort;

export type TPortalHeaderCellCommon = BaseColumnSetting & {
  width?: number;
  minWidth?: number;
  isLastVisibleCell?: boolean;
};
export type TPortalHeaderCellText = TPortalHeaderCellCommon &
  TCellText & {
    controls?: Array<TColumnControl>;
    fullName?: string;
  };
export type TPortalHeaderCellIcon = TPortalHeaderCellCommon &
  TCellIcon & {
    stubText?: string;
    controls?: Array<TColumnControl>;
  };
export type TPortalHeaderCellCheckBox<Model> = TPortalHeaderCellCommon &
  TCellCheckBox & {
    stubText?: string;
    controls?: Array<TColumnControl>;
    onCheck: (isChecked: boolean | null, rows: TPortalRow<Model>[]) => TPortalRow<Model>[];
  };

export type TPortalHeaderCell<Model> = TPortalHeaderCellText | TPortalHeaderCellIcon | TPortalHeaderCellCheckBox<Model>;

export type TPortalHeaderRow<Model> = {
  cells: Array<TPortalHeaderCell<Model>>;
  modifier?: TRowModifier;
};

export type TPortalBase<Model> = Omit<TTableBase, 'header'> & {
  header: TPortalHeaderRow<Model> | TPortalHeaderRow<Model>[];
};

export type TPortalData<Model> = TPortalBase<Model> & {
  rows: TPortalRow<Model>[];
};

export interface BasePortalTableProps extends BaseAppTableProps {}

export interface PortalTableProps<Model> extends BasePortalTableProps {
  modelValue: TPortalData<Model>;
  tableContainer?: HTMLElement;
}

export type ColumnFilterSwitchSelectForm = {
  radio: ColumnFilterSelectSwitchState;
  selectedOption: ISelectItem | undefined;
};

export type ColumnFilterSwitchMultiSelectForm = {
  radio: ColumnFilterMultiSelectSwitchState;
  selectedOptions: ISelectItem[] | undefined;
};

export type ColumnFilterNumberRangeForm = {
  minValue: number | undefined;
  maxValue: number | undefined;
};

export type ColumnFilterDateRangeForm = {
  minValue: Date | undefined;
  maxValue: Date | undefined;
};

export type ColumnFilterSelectForm = {
  selectedOption: ISelectItem | undefined;
};

export type ColumnFilterTextForm = {
  text: string | undefined;
};

export type TColumnControlExpose = {
  isActive: boolean;
  type: string;
};

export type TColumnControlSortExpose = TColumnControlExpose;

export type TColumnControlFilterExpose = TColumnControlExpose & {
  isDropDownShown: boolean;
  queryParam: QueryParam[] | QueryParam | undefined;
};

export enum ColumnFilterSelectSwitchState {
  All = 'All',
  FromSelect = 'FromSelect',
}

export enum ColumnFilterMultiSelectSwitchState {
  NotApply = 'NotApply',
  SelectZero = 'SelectZero',
  FromSelect = 'FromSelect',
}

export type BaseColumnSetting = {
  isHidden?: boolean;
  isDisabled?: boolean;
  index?: number;
};

export type ColumnSetting = Required<BaseColumnSetting> & {
  title: string;
  isHidden: boolean;
  isHiddenInitially: boolean;
  isDisabled: boolean;
  index: number;
  initialIndex: number;
  columnIndexes: number | number[];
};

export type IPortalTableFilterRef = IColumnControlPosition & {
  type: string;
  reset: () => void;
  validator: MaybeRef<{
    $validate(): Promise<boolean>;
    $touch(): void;
    $reset(): void;
  }>;
  isError: MaybeRef<boolean>;
  getQueryParam: () => QueryParam | QueryParam[];
  clear: () => void;
};

export interface IColumnControlPosition {
  columnControlIndex?: number;
  headerCellIndex?: number;
}

export interface IPortalTableFilterProps<K extends PortalTableFilter> extends IColumnControlPosition {
  columnControl: K;
}

export interface PortalTableFilterInfo<K extends PortalTableFilter> extends IPortalTableFilterProps<K> {
  headerTitle: string;
}

export type QueryParam = {
  key: string;
  value: LocationQueryValueRaw | LocationQueryValueRaw[];
};

export type PortalTableBaseHeaderCellRef = {
  queryParams: QueryParam[];
};

export type PortalTableBaseHeaderRef = PortalTableBaseHeaderCellRef;

export type PortalTableDataRef = PortalTableBaseHeaderCellRef & {
  tableRef: HTMLTableElement | undefined;
};

export type PortalTableRef = PortalTableDataRef;
