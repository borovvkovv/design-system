import { ref, type MaybeRef, watch, unref } from 'vue';

/**
 * Определение функции по установке высоты заглушки хэдера таблицы и определение признака прилипания хэдера таблицы.
 *
 * @param tableRef Ссылка на таблицу с хэдером.
 * @param stickyHeaderStub Ссылка на заглушку с тенью хэдера таблицы.
 * @returns isHeaderSticky Признак прилипания хэдера.
 * @returns setStubHeight Функция установки высоты заглушки.
 */
export const useStickyTableHeader = (tableRef: MaybeRef<any>, stickyHeaderStub: MaybeRef<HTMLElement | undefined>) => {
  const isHeaderSticky = ref(false);

  const setStubHeight = () => {
    const unrefStickyHeaderStub = unref(stickyHeaderStub);
    if (unrefStickyHeaderStub) {
      const theadElement = tableRef.value?.getElementsByTagName('thead')[0];
      if (theadElement) {
        unrefStickyHeaderStub.style.height = `${theadElement.clientHeight}px`;
      }
    } else {
      isHeaderSticky.value = false;
    }
  };

  watch(() => unref(stickyHeaderStub), setStubHeight);

  const resizeObserver = new ResizeObserver(setStubHeight);
  watch(
    () => unref(tableRef),
    () => {
      if (unref(tableRef)) {
        resizeObserver.observe(unref(tableRef));

        return;
      }

      isHeaderSticky.value = false;
    },
  );

  return {
    isHeaderSticky,
    setStubHeight,
  };
};
