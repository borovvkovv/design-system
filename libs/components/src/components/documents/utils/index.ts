import type { FileSkeletonProps } from '@comp/components/skeletons/utils/models';
import type { IEDocFile } from '@comp/components/documents/utils/models';

export function getLoadingConfig(files: IEDocFile[]): FileSkeletonProps {
  const rowsCount = files.length;
  const isWithSize = files.some((file) => file.size !== null);

  return { rowsCount, isWithSize };
}
