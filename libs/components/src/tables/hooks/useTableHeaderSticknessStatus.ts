import { ref, type MaybeRef, type Ref, unref } from 'vue';

/**
 * Определяет функцию проверки и изменения статуса прилипания хэдера.
 *
 * @param headerRef Ссылка на хэдер.
 * @param onHeaderSticknessStatusChange Функция, которая вызывается при изменении статуса прилипания хэдера.
 * @returns setHeaderSticknessStatusListeners Функция устанавливающая на события прокрутки и изменения размера окна проверку и изменение статуса прилипания хэдера.
 */
export const useTableHeaderSticknessStatus = (
  headerRef: MaybeRef<Element | undefined>,
  onHeaderSticknessStatusChange: (isSticky: boolean) => void,
) => {
  const checkHeaderStickness = (callOnce: Ref<boolean>) => {
    const header = unref(headerRef);

    if (header) {
      const stickyTop = parseInt(window.getComputedStyle(header).top);
      const currentTop = header.getBoundingClientRect().top;
      if (currentTop === stickyTop && !callOnce.value) {
        setHeaderSticknessStatus(true, callOnce);
      } else if (currentTop !== stickyTop && callOnce.value) {
        setHeaderSticknessStatus(false, callOnce);
      }
    } else {
      setHeaderSticknessStatus(false, callOnce);
    }
  };

  const setHeaderSticknessStatusListeners = () => {
    const callOnce = ref(false);
    ['scroll', 'resize'].forEach((eventName) => {
      window.addEventListener(eventName, () => {
        checkHeaderStickness(callOnce);
      });
    });
    checkHeaderStickness(callOnce);
  };

  function setHeaderSticknessStatus(isSticky: boolean, callOnce: Ref<boolean>) {
    onHeaderSticknessStatusChange(isSticky);
    callOnce.value = isSticky;
  }

  return {
    setHeaderSticknessStatusListeners,
  };
};
