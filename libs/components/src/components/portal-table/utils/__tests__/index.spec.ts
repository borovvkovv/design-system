import { describe, expect, test } from 'vitest';
import { getColumnIndexByHeaderCellIndex } from '@comp/components/portal-table/utils';
import type { TPortalHeaderCell } from '@comp/components/portal-table/utils/models';

describe('Функции PortalTable', () => {
  test.each([
    [mockHeaderCells, 0, 0],
    [mockHeaderCells, 1, [1, 2]],
    [mockHeaderCells, 2, [3, 4]],
  ])('getColumnIndexByHeaderCellIndex test (%s => %s)', (headerCells, headerCellIndex, columnIndex) => {
    expect(getColumnIndexByHeaderCellIndex(headerCells, headerCellIndex)).toEqual(columnIndex);
  });
});

const mockHeaderCells: Array<TPortalHeaderCell<any>> = [
  {
    type: 'text',
    text: '',
    colspan: 1,
  },
  {
    type: 'text',
    text: '',
    colspan: 2,
  },
  {
    type: 'text',
    text: '',
    colspan: 2,
  },
];
