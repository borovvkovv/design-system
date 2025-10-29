export interface BasePopupProps {
  toLeftFromPointerPx?: number;
  toTopFromPointerPx?: number;
  toRightFromPointerPx?: number;
  toBottomFromPointerPx?: number;
  translateXPercent?: number;
  translateYPercent?: number;
}

export interface PopupInsideContainerProps extends BasePopupProps {
  container?: HTMLElement;
}

export type BasePopupRef = {
  popup: HTMLElement | undefined;
  isShown: boolean;
  showPopup: (left?: number, top?: number) => void;
  throttledOpenPopupAfter: (timeoutMs: number) => (left?: number, top?: number) => void;
  throttledClosePopupAfter: (timeoutMs: number) => () => void;
  closePopup: () => void;
  checkIsPointerOnPopup: (pointerX: number, pointerY: number) => boolean;
};

export interface PositionInsideContainer {
  top: number;
  left: number;
}

export interface PositionsInsideContainer {
  originalPosition: PositionInsideContainer;
  shiftedPosition: PositionInsideContainer;
  container: PositionInsideContainer;
}
