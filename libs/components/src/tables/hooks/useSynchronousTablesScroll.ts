import { ref, type MaybeRef, unref } from 'vue';

/**
 * Определяет функции синхронизации скроллинга хэдера и тела таблицы.
 *
 * @param headerRef Ссылка на таблицу-хэдер.
 * @param headerRef Ссылка на таблицу с данными.
 * @returns onScrollHeaderTableHandler Функция устанавливающая на событие прокрутки таблицы-хэдера прокрутку таблицы с данными.
 * onScrollContentTableHandler Функция устанавливающая на событие прокрутки таблицы с данными прокрутку таблицы-хэдера.
 */
export const useSynchronousTablesScroll = (
  headerTableRef: MaybeRef<HTMLElement | undefined>,
  contentTableRef: MaybeRef<HTMLElement | undefined>,
) => {
  const preventHeaderTableScrollEvent = ref(false);
  const preventContentTableScrollEvent = ref(false);

  const onScrollHeaderTableHandler = () => {
    const headerTable = unref(headerTableRef);
    const contentTable = unref(contentTableRef);

    if (!preventHeaderTableScrollEvent.value) {
      preventContentTableScrollEvent.value = true;
      contentTable!.scrollLeft = headerTable!.scrollLeft;
    } else {
      preventHeaderTableScrollEvent.value = false;
    }
  };

  const onScrollContentTableHandler = () => {
    const headerTable = unref(headerTableRef);
    const contentTable = unref(contentTableRef);

    if (!preventContentTableScrollEvent.value) {
      preventHeaderTableScrollEvent.value = true;
      headerTable!.scrollLeft = contentTable!.scrollLeft;
    } else {
      preventContentTableScrollEvent.value = false;
    }
  };

  return {
    onScrollHeaderTableHandler,
    onScrollContentTableHandler,
  };
};
