import { ref, type MaybeRef, unref } from 'vue';

/**
 * Определяет функцию проверки статуса прилипания столбца.
 *
 * @param headerTableWrapper Ссылка на обертку таблицы-хэдера содержимое которого прокручивается по горизонтали.
 * @param headerTable Ссылка на таблицу-хэдер.
 * @param onColumnSticknessStatusChange Функция, которая вызывается при изменении статуса прилипания столбца.
 * @returns checkColumnStickness Функция проверяющая столбец на прилипание и вызывающая функцию при прилипании/отлипании.
 */
export const useTableColumnSticknessStatus = (
  headerTableWrapper: MaybeRef<HTMLElement | undefined>,
  headerTable: MaybeRef<HTMLElement | undefined>,
  onHeaderSticknessStatusChange: (isSticky: boolean) => void,
) => {
  const callOnce = ref(false);

  const checkColumnStickness = () => {
    const header = unref(headerTableWrapper)?.querySelectorAll('th')[0];
    const table = unref(headerTable);

    if (header && table) {
      const currentStickyHeaderLeft = header.getBoundingClientRect().left;
      const currentTableHeaderLeft = table.getBoundingClientRect().left;
      if (currentTableHeaderLeft < currentStickyHeaderLeft && !callOnce.value) {
        setColumnSticknessStatus(true);
      } else if (currentTableHeaderLeft >= currentStickyHeaderLeft && callOnce.value) {
        setColumnSticknessStatus(false);
      }
    } else {
      setColumnSticknessStatus(false);
    }
  };

  const setColumnSticknessStatus = (isSticky: boolean) => {
    onHeaderSticknessStatusChange(isSticky);
    callOnce.value = isSticky;
  };

  return {
    checkColumnStickness,
  };
};
