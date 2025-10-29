export interface TransitionProps {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export interface AppModalBaseProps extends TransitionProps {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  withCloseCross?: boolean;
  withBackdrop?: boolean;
  openImmediately?: boolean;
}

export interface AppModalProps extends AppModalBaseProps {}

export interface ModalWithSwipeEmits {
  (eventName: 'before-swipe', x: number, y: number): void;
  (eventName: 'swiping', x: number, y: number): void;
  (eventName: 'swiping:x', difference: number): void;
  (eventName: 'swiping:left', difference: number): void;
  (eventName: 'swiping:right', difference: number): void;
  (eventName: 'swiping:y', difference: number): void;
  (eventName: 'swiping:up', difference: number): void;
  (eventName: 'swiping:down', difference: number): void;
  (eventName: 'swiped:left'): void;
  (eventName: 'swiped:right'): void;
  (eventName: 'swiped:up'): void;
  (eventName: 'swiped:down'): void;
  (eventName: 'swiped:end'): void;
}

export interface IBaseModalSliderProps {
  activatePrevPoint: () => void;
  activateNextPoint: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface IModalSliderProps extends IBaseModalSliderProps {
  transitionKey: string;
}

export interface IModalWithSwipeProps {
  swipeThresholdPx?: number;
  swipeTimeoutMs?: number;
  swipeField?: HTMLElement;
  swipeStartField?: HTMLElement;
  isPreventDefault?: boolean;
}
