import { SortOrderEnum } from '@comp/enums/sort-order';

export const switchSortTypeToNext = (sortType: SortOrderEnum | undefined) => {
  switch (sortType) {
    case SortOrderEnum.Asc:
      return SortOrderEnum.Desc;
    case SortOrderEnum.Desc:
      return undefined;
    default:
      return SortOrderEnum.Asc;
  }
};
