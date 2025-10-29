import { computed, toValue, unref, type MaybeRef, type MaybeRefOrGetter } from 'vue';
import { shiftElementIntoContainer } from '@comp/components/popup/utils';
import type { BasePopupProps } from '@comp/components/popup/utils/models';

/**
 * Работа с попапом внутри контейнера. Функция перемещения попапа в контейнер
 * @param popupRef Попап
 * @param containerRef Контейнер
 * @param popupPosition Сдвиг попапа относительно курсора
 * @param mirrorX Отзеркалить попап по горизонтали для возвращения попапа в контейнер
 * @param mirrorY Отзеркалить попап по вертикали для возвращения попапа в контейнер
 * @returns Функция перемещения попапа в контейнер
 */
export const usePopupInsideContainer = (
  popupRef: MaybeRef<HTMLElement | undefined>,
  containerRef: MaybeRefOrGetter<HTMLElement | undefined>,
  popupPosition: BasePopupProps,
  mirrorX: boolean,
  mirrorY: boolean,
) => {
  const isPopupFixed = computed(() => unref(popupRef)?.classList.contains('fixed'));

  const shiftPopupIntoContainer = () => {
    const popupElement = unref(popupRef);
    if (!popupElement) return;

    const { shiftedPosition: newElement, container } = shiftElementIntoContainer(
      popupElement,
      toValue(containerRef),
      popupPosition,
      mirrorX,
      mirrorY,
    );

    /** Переход координат попапа на координаты контейнера. */
    if (!isNaN(newElement.left))
      popupElement.style.left = `${isPopupFixed.value ? newElement.left : newElement.left - container.left}px`;

    if (!isNaN(newElement.top))
      popupElement.style.top = `${isPopupFixed.value ? newElement.top : newElement.top - container.top}px`;
  };

  return { shiftPopupIntoContainer };
};
