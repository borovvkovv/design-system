import { ref } from 'vue';
import type { ModalWithSwipeEmits } from '../utils/models';

export const useSwipeEvents = (
  swipeTimeoutMs: number,
  swipeThresholdPx: number,
  emit: ModalWithSwipeEmits,
  isPreventDefault?: boolean,
) => {
  const xDown = ref<number | undefined>(undefined);
  const yDown = ref<number | undefined>(undefined);
  const xDifference = ref(0);
  const yDifference = ref(0);
  const timeDown = ref(0);

  function preventEvent(e: Event) {
    e.preventDefault();
  }

  function handleMouseStart(e: MouseEvent) {
    timeDown.value = Date.now();
    xDown.value = e.clientX;
    yDown.value = e.clientY;
    xDifference.value = 0;
    yDifference.value = 0;

    emit('before-swipe', xDown.value, yDown.value);

    document.addEventListener('dragover', preventEvent);
    document.addEventListener('dragstart', preventEvent);
    document.addEventListener('dragenter', preventEvent);
  }

  function handleTouchStart(e: TouchEvent) {
    if (isPreventDefault) e.preventDefault();

    timeDown.value = Date.now();
    xDown.value = e.touches[0].clientX;
    yDown.value = e.touches[0].clientY;
    xDifference.value = 0;
    yDifference.value = 0;

    emit('before-swipe', xDown.value, yDown.value);
  }

  function handleMove(e: Event, xUp: number, yUp: number) {
    if (xDown.value === undefined || yDown.value === undefined) return;

    if (isPreventDefault) e.preventDefault();

    emit('swiping', xUp, yUp);

    xDifference.value = xDown.value - xUp;
    yDifference.value = yDown.value - yUp;

    emit('swiping:x', xDifference.value);
    if (xDifference.value > 0) {
      emit('swiping:left', xDifference.value);
    } else {
      emit('swiping:right', Math.abs(xDifference.value));
    }

    emit('swiping:y', yDifference.value);
    if (yDifference.value > 0) {
      emit('swiping:up', yDifference.value);
    } else {
      emit('swiping:down', Math.abs(yDifference.value));
    }
  }

  function handleTouchMove(e: TouchEvent) {
    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    handleMove(e, xUp, yUp);
  }

  function handleMouseMove(e: MouseEvent) {
    const xUp = e.clientX;
    const yUp = e.clientY;

    handleMove(e, xUp, yUp);
  }

  function handleTouchEnd() {
    const timeDifference = Date.now() - timeDown.value;
    if (timeDifference <= swipeTimeoutMs) {
      const isHorizontalSwipe = Math.abs(xDifference.value) > Math.abs(yDifference.value);
      if (isHorizontalSwipe && Math.abs(xDifference.value) > swipeThresholdPx) {
        if (xDifference.value > 0) {
          emit('swiped:left');
        } else {
          emit('swiped:right');
        }
      } else if (!isHorizontalSwipe && Math.abs(yDifference.value) > swipeThresholdPx) {
        if (yDifference.value > 0) {
          emit('swiped:up');
        } else {
          emit('swiped:down');
        }
      }
    }

    xDown.value = undefined;
    yDown.value = undefined;
    timeDown.value = 0;

    emit('swiped:end');

    document.removeEventListener('dragover', preventEvent);
    document.removeEventListener('dragstart', preventEvent);
    document.removeEventListener('dragenter', preventEvent);
  }

  return {
    handleTouchStart,
    handleMouseStart,
    handleTouchMove,
    handleMouseMove,
    handleTouchEnd,
  };
};
