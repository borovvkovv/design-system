import type { TCell, TCellSpan, TCellSpanText, TCellText } from '@comp/components/table/utils/models';
import { parse } from '@comp/utils/date';

export const getCellValue = (cell: TCell | TCellSpan, isText: boolean = false): string => {
  switch (cell.type) {
    case 'text':
      return isText ? (cell.text ?? '') : (cell.value ?? cell.text ?? '');
    case 'texts':
      return JSON.stringify(cell.spans);
    case 'link':
      return cell.title;
    case 'buttons':
      return '';
    case 'input':
      return cell.input.modelValue;
    case 'search':
      return cell.text;
    case 'tag':
      return cell.tag.text;
    case 'icon':
      return cell.icon;
    case 'render':
      return '';
    case 'checkBox':
      return cell.isChecked ? 'true' : '';
  }
};

export const getDateFromCell = (cell?: TCellText | TCellSpanText) =>
  cell?.text !== undefined && cell.text !== '-' ? parse(cell.text, 'dd.MM.yyyy').toISOString() : undefined;

export const getNumberFromCell = (cell: TCell | TCellSpanText | undefined) => {
  if (!cell) return undefined;

  return getCellValue(cell) !== '-' ? Number(getCellValue(cell)) : undefined;
};

export const getDisabledFromInputCell = (cell: TCell | undefined): boolean | undefined => {
  if (!cell || cell.type != 'input') return undefined;

  return cell.input.disabled;
};
