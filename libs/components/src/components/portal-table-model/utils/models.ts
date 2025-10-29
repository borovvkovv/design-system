import type { BasePortalTableProps, TPortalBase, TPortalRow } from '@comp/components/portal-table/utils/models';

export interface PortalTableModelProps<Model> extends BasePortalTableProps {
  modelValue: TPortalTableModel<Model>;
  tableContainer?: HTMLElement;
}

export type TPortalTableModel<Model> = TPortalBase<Model> & {
  rows: TPortalTableModelRows<Model>;
};

export type TPortalTableModelRows<Model> = {
  rowFactory: (modelItem: Model, rowIndex?: number) => TPortalRow<Model>;
  model: Model[];
  modelChanges: (row: TPortalRow<Model>, rowIndex: number) => Partial<Model>;
};
