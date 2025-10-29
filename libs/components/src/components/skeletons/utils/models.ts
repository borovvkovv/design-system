import type { Size } from '@comp/enums';

export type LineSkeletonProps = {
  rowsCount?: number;
  rowHeight?: number;
  rowsGap?: number;
};

export type FileSkeletonProps = {
  rowsCount?: number;
  rowsGap?: number;
  isWithSize?: boolean;
};

export type AttachmentSkeletonProps = FileSkeletonProps & {
  isDisabled?: boolean;
  size?: Size;
};
