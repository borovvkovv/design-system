import type { BasePopupProps, PositionInsideContainer, PositionsInsideContainer } from './models';

/**
 * Получение зеркального значения позиции элемента по вертикали/горизонтали
 * @param elementSize Длина/ширина элемента
 * @param isElementToPointerOnOverflowSide Находится ли элемент слева/сверху курсора
 * @param translateElement Сдвиг элемента, в процентах
 * @param elementToPointerPx Сдвиг элемента от курсора, в пикселях
 * @returns Зеркальное значение позиции top/left элемента
 */
export const mirrorShiftByAxis = (
  elementSize: number,
  isElementToPointerOnOverflowSide: boolean,
  translateElement?: number,
  elementToPointerPx?: number,
) => {
  const popupTranslate = elementSize * (Math.abs(translateElement ?? 0) / 100);
  return 2 * popupTranslate + 2 * (elementToPointerPx ?? 0) + (isElementToPointerOnOverflowSide ? elementSize : 0);
};

/**
 * Получение новых значений top и left элемента, если он выходит за пределы контейнера. Top и left относительно вьюпорта
 * @param element Элемент
 * @param container Контейнер
 * @param elementPosition Объект BasePopupProps, со значениями сдвига элемента относительно курсора, самого элемента
 * @param mirrorX Выполнить отзеркаливание позиции элемента по горизонтали, если он вышел за пределы контейнера по оси X
 * @param mirrorY Выполнить отзеркаливание позиции элемента по вертикали, если он вышел за пределы контейнера по оси Y
 * @returns Объект. oldElement - координаты top, left до сдвига элемента.
 *
 * newElement - координаты top, left после сдвига элемента.
 *
 * container - координаты контейнера.
 *
 * Если значение top, left = NaN, значит сдвиг объекта по вертикали/горизонтали не требуется.
 */
export const shiftElementIntoContainer = (
  element: HTMLElement,
  container: HTMLElement | undefined,
  elementPosition: BasePopupProps,
  mirrorX: boolean,
  mirrorY: boolean,
): PositionsInsideContainer => {
  const { clientWidth: viewportWidth, clientHeight: viewportHeight } = document.documentElement;
  const elementRect = element.getBoundingClientRect();
  const containerRect = container?.getBoundingClientRect();

  const containerLeft = containerRect?.left ?? 0;
  const containerRight = containerRect?.right ?? viewportWidth;
  const containerTop = containerRect?.top ?? 0;
  const containerBottom = containerRect?.bottom ?? viewportHeight;

  const shiftedLeft = getShiftedLeft({
    elementLeft: elementRect.left,
    elementRight: elementRect.right,
    containerLeft: containerLeft,
    containerRight: containerRight,
    mirrorX: mirrorX,
    elementWidth: elementRect.width,
    elementPosition: elementPosition,
  });

  const shiftedTop = getShiftedTop({
    elementTop: elementRect.top,
    elementBottom: elementRect.bottom,
    containerTop: containerTop,
    containerBottom: containerBottom,
    mirrorY: mirrorY,
    elementHeight: elementRect.height,
    elementPosition: elementPosition,
  });

  return {
    originalPosition: { top: elementRect.top, left: elementRect.left },
    shiftedPosition: { top: shiftedTop, left: shiftedLeft },
    container: { top: containerTop, left: containerLeft },
  };
};

/**
 * Получение нового значения left элемента, если он выходит за пределы контейнера
 * @param param Параметры
 * @param param.elementLeft Текущее значение left элемента
 * @param param.elementRight Текущее значение left элемента
 * @param param.containerLeft Текущее значение left контейнера
 * @param param.containerRight Текущее значение right контейнера
 * @param param.mirrorX Выполнить отзеркаливание позиции элемента по оси X, если он вышел за пределы контейнера
 * @param param.elementWidth Ширина элемента
 * @param param.elementPosition Объект BasePopupProps, со значениями сдвига элемента относительно курсора, самого элемента
 * @returns координата left после сдвига элемента. NaN - если сдвиг не потребовался
 */
const getShiftedLeft = ({
  elementLeft,
  elementRight,
  containerLeft,
  containerRight,
  mirrorX,
  elementWidth,
  elementPosition,
}: {
  elementLeft: number;
  elementRight: number;
  containerLeft: number;
  containerRight: number;
  mirrorX: boolean;
  elementWidth: number;
  elementPosition: BasePopupProps;
}): number => {
  if (elementLeft < containerLeft) {
    return mirrorX
      ? elementLeft +
          mirrorShiftByAxis(
            elementWidth,
            elementPosition.toLeftFromPointerPx !== undefined,
            elementPosition.translateXPercent,
            elementPosition.toLeftFromPointerPx,
          )
      : containerLeft;
  }

  if (elementRight > containerRight) {
    return mirrorX
      ? elementLeft -
          mirrorShiftByAxis(
            elementWidth,
            elementPosition.toLeftFromPointerPx === undefined,
            elementPosition.translateXPercent,
            elementPosition.toRightFromPointerPx,
          )
      : elementLeft - elementRight + containerRight;
  }

  return NaN;
};

/**
 * Получение нового значения left элемента, если он выходит за пределы контейнера
 * @param param Параметры
 * @param param.elementLeft Текущее значение left элемента
 * @param param.elementRight Текущее значение left элемента
 * @param param.containerLeft Текущее значение left контейнера
 * @param param.containerRight Текущее значение right контейнера
 * @param param.mirrorX Выполнить отзеркаливание позиции элемента по оси Y, если он вышел за пределы контейнера
 * @param param.elementWidth Длина элемента
 * @param param.elementPosition Объект BasePopupProps, со значениями сдвига элемента относительно курсора, самого элемента
 * @returns координата top после сдвига элемента. NaN - если сдвиг не потребовался
 */
const getShiftedTop = ({
  elementTop,
  elementBottom,
  containerTop,
  containerBottom,
  mirrorY,
  elementHeight,
  elementPosition,
}: {
  elementTop: number;
  elementBottom: number;
  containerTop: number;
  containerBottom: number;
  mirrorY: boolean;
  elementHeight: number;
  elementPosition: BasePopupProps;
}): number => {
  if (elementTop < containerTop) {
    return mirrorY
      ? elementTop +
          mirrorShiftByAxis(
            elementHeight,
            elementPosition.toTopFromPointerPx !== undefined,
            elementPosition.translateYPercent,
            elementPosition.toTopFromPointerPx,
          )
      : containerTop;
  }

  if (elementBottom > containerBottom) {
    return mirrorY
      ? elementTop -
          mirrorShiftByAxis(
            elementHeight,
            elementPosition.toTopFromPointerPx === undefined,
            elementPosition.translateYPercent,
            elementPosition.toBottomFromPointerPx,
          )
      : elementTop - elementBottom + containerBottom;
  }

  return NaN;
};

/**
 * Получить координаты отцентрованной на элементе точки
 * @param elementRect Элемент
 * @param pointPosition Позиция точки:
 *
 * top - сверху по горизонтали, в середине по вертикали
 *
 * bottom - снизу по горизонтали, в середине по вертикали
 *
 * left - слева по вертикали, в середине по горизонтали
 *
 * right - справа по вертикали, в середине по горизонтали
 * @returns
 */
export const getMidPointOfElement = (
  elementRect: DOMRect,
  pointPosition: 'top' | 'bottom' | 'left' | 'right',
): PositionInsideContainer => {
  switch (pointPosition) {
    case 'left':
      return { left: elementRect.left, top: elementRect.bottom + elementRect.height / 2 };
    case 'right':
      return { left: elementRect.right, top: elementRect.bottom + elementRect.height / 2 };
    case 'top':
      return { left: elementRect.left + elementRect.width / 2, top: elementRect.top };
    case 'bottom':
      return { left: elementRect.left + elementRect.width / 2, top: elementRect.bottom };
  }
};
