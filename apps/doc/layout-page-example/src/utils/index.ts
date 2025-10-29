export const getColumnWidth = (columnElRef: HTMLElement): number =>
  Math.round(columnElRef?.getBoundingClientRect().width ?? 0);

export const getColumnLeft = (columnElRef: HTMLElement): number =>
  Math.round(columnElRef?.getBoundingClientRect().left ?? 0);

export const getGutter = (columnElRef: HTMLElement): string =>
  `${Math.round(Number(window.getComputedStyle(columnElRef).marginLeft.slice(0, -2)) * 2)}px`;

export const getRowWidth = (rowElRef: HTMLElement): number => Math.round(rowElRef?.getBoundingClientRect().width ?? 0);

export const getRowMargin = (rowElRef: HTMLElement): number =>
  Math.round(Number(window.getComputedStyle(rowElRef).marginLeft.slice(0, -2)));

export const getWindowWidth = (): number => window.innerWidth;

export const getWindowWidthMode = (): string => {
  const windowWidth = getWindowWidth();

  if (windowWidth < 744) return '375-743px';
  if (windowWidth < 1140) return '744-1139px';
  if (windowWidth < 1360) return '1140-1359px';
  if (windowWidth < 1520) return '1360-1519px';

  return '1520>';
};

export const getLayoutContainerMargin = (windowWidth: number, layoutContainer?: HTMLElement): string => {
  if (windowWidth < 744) return '16px';
  else if (windowWidth < 1140) return '24px';
  else if (windowWidth < 1360) return '40px';
  else
    return layoutContainer
      ? `${Math.round(Number(window.getComputedStyle(layoutContainer).marginLeft.slice(0, -2)))}px`
      : 'auto';
};

export const isFirstColumnInRow = (columns: Array<HTMLElement>, columnIndex: number) => {
  if (getColumnLeft(columns[columnIndex]) === getColumnLeft(columns[0])) return true;

  return false;
};
