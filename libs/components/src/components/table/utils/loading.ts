import type { TPaddingClassNames } from '@comp/types/cssClasses';
import type { TCell, TRow, TTableData, TTableModelRows } from '@comp/components/table/utils/models';
import type { LineSkeletonProps } from '@comp/components/skeletons/utils/models';
import type { TModifierText } from '@comp/components/modifiers';
import type { TPortalData } from '@comp/components/portal-table/utils/models';
import type { TPortalTableModelRows } from '@comp/components/portal-table-model/utils/models';

const isPaddingY = (padding: TPaddingClassNames) => padding.startsWith('p-') || padding.startsWith('py-');

const getTextModifierLineHeight = (textModifier: TModifierText) => {
  switch (textModifier) {
    case 'text-size-2':
      return 28;
    case 'text-size-3':
      return 26;
    case 'text-size-4':
      return 24;
    case 'text-size-5':
      return 22;
    case 'text-size-6':
      return 20;
    case 'text-size-7':
      return 18;
    case 'text-size-h4':
      return 24;
    case 'text-size-h5':
      return 22;
  }
};

const tailwindSpacingUnitsToPixels = (value: number): number => value * 4;

const getMaxRowsGapPx = (rows: TRow[]): number => {
  const rowsGapInTailwindUnits = rows.reduce((previousValue, currentRow) => {
    const modifierPadding = currentRow.cells.reduce((previousValue: number | undefined, currentCell: TCell) => {
      const cellModifierPaddingY = getCellModifierPaddingY(currentCell);

      if (cellModifierPaddingY && !isNaN(cellModifierPaddingY))
        return previousValue
          ? previousValue < cellModifierPaddingY
            ? cellModifierPaddingY
            : previousValue
          : cellModifierPaddingY;

      return previousValue;
    }, undefined);

    if (modifierPadding && !isNaN(modifierPadding)) {
      const rowsGap = modifierPadding * 2;
      return rowsGap > previousValue ? rowsGap : previousValue;
    }

    return previousValue;
  }, 6);

  return tailwindSpacingUnitsToPixels(rowsGapInTailwindUnits);
};

const getMaxRowsHeightPx = (rows: TRow[]): number =>
  rows.reduce((previousValue, currentRow) => {
    const maxModifierText = currentRow.cells.reduce((previousValue: number, currentCell: TCell) => {
      const textModifier = currentCell.modifier?.text;
      if (textModifier) {
        const lineHeight = getTextModifierLineHeight(textModifier);
        return previousValue < lineHeight ? lineHeight : previousValue;
      }

      return previousValue;
    }, 18);

    return maxModifierText > previousValue ? maxModifierText : previousValue;
  }, 18);

const getCellModifierPaddingY = (cell: TCell): number | undefined => {
  const paddings = cell.modifier?.padding;
  if (paddings) {
    let paddingY;
    if (Array.isArray(paddings)) {
      paddingY = paddings.find((padding) => isPaddingY(padding));
    } else {
      paddingY = isPaddingY(paddings) ? paddings : undefined;
    }
    if (paddingY) {
      const numberCandidate = paddingY.replace('p-', '').replace('py-', '');

      return parseInt(numberCandidate);
    }

    return undefined;
  }

  return undefined;
};

export const getLoadingConfig = <T>(table: TTableData | TPortalData<T>): LineSkeletonProps => ({
  rowHeight: getMaxRowsHeightPx(table.rows),
  rowsCount: table.rows.length > 0 ? table.rows.length : 5,
  rowsGap: getMaxRowsGapPx(table.rows),
});

export function getTableModelLoadingConfig<Model>(
  tableRows: TTableModelRows<Model> | TPortalTableModelRows<Model>,
): LineSkeletonProps {
  const rows = tableRows.model.map((model) => tableRows.rowFactory(model));

  return {
    rowHeight: getMaxRowsHeightPx(rows),
    rowsCount: rows.length > 0 ? rows.length : 5,
    rowsGap: getMaxRowsGapPx(rows),
  };
}
