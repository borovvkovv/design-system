<template>
  <div
    v-if="isVisible"
    ref="popupRef"
    @mouseleave="() => emit('popup:mouseleave')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { getMidPointOfElement } from './utils';
import type { BasePopupProps } from './utils/models';

const props = withDefaults(defineProps<BasePopupProps>(), {
  toRightFromPointerPx: 0,
  toBottomFromPointerPx: 0,
});

const emit = defineEmits<{
  (eventName: 'popup:open'): void;
  (eventName: 'popup:mouseleave'): void;
}>();

const isVisible = ref(false);
const popupRef = ref<HTMLElement | undefined>();
const pointerLeft = ref(0);
const pointerTop = ref(0);

const throttledClosePopupAfter = (timeoutMs: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return () => {
    if (timer) return;

    if (isVisible.value) {
      timer = setTimeout(() => {
        closePopup();
        clearTimeout(timer);
        timer = undefined;
      }, timeoutMs);
    }
  };
};

const throttledOpenPopupAfter = (timeoutMs: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (left: number = 0, top: number = 0) => {
    if (timer) return;

    if (!isVisible.value) {
      timer = setTimeout(() => {
        showPopup(left, top);
        clearTimeout(timer);
        timer = undefined;
      }, timeoutMs);
    }
  };
};

const checkIsPointerOnPopup = (pointerX: number, pointerY: number): boolean => {
  const popup = popupRef.value?.getBoundingClientRect();

  return (
    popup !== undefined &&
    pointerX >= popup.left &&
    pointerX <= popup.right &&
    pointerY >= popup.top &&
    pointerY <= popup.bottom
  );
};

const showPopup = (left: number = 0, top: number = 0) => {
  pointerLeft.value = left;
  pointerTop.value = top;
  isVisible.value = true;
};

const showPopupElementEventHandler = (evt: MouseEvent, direction: 'top' | 'bottom' | 'left' | 'right') => {
  const targetRect = (evt.target as HTMLElement)?.getBoundingClientRect();
  const { left, top } = getMidPointOfElement(targetRect, direction);
  pointerLeft.value = left;
  pointerTop.value = top;
  isVisible.value = true;
};

const closePopup = () => {
  isVisible.value = false;
};

watch(
  () => popupRef.value,
  () => {
    if (!popupRef.value) return;

    const popupWidth = popupRef.value?.getBoundingClientRect().width;
    const popupHeight = popupRef.value?.getBoundingClientRect().height;

    const popupTranslateX = popupWidth * ((props.translateXPercent ?? 0) / 100);
    const popupTranslateY = popupHeight * ((props.translateYPercent ?? 0) / 100);

    const popupLeft =
      props.toLeftFromPointerPx !== undefined
        ? pointerLeft.value - popupWidth - props.toLeftFromPointerPx + popupTranslateX
        : pointerLeft.value + props.toRightFromPointerPx + popupTranslateX;

    const popupTop =
      props.toTopFromPointerPx !== undefined
        ? pointerTop.value - popupHeight - props.toTopFromPointerPx + popupTranslateY
        : pointerTop.value + props.toBottomFromPointerPx + popupTranslateY;

    popupRef.value.style.left = `${popupLeft}px`;
    popupRef.value.style.top = `${popupTop}px`;

    emit('popup:open');
  },
);

defineExpose({
  showPopup,
  showPopupElementEventHandler,
  closePopup,
  throttledOpenPopupAfter,
  throttledClosePopupAfter,
  popup: popupRef,
  checkIsPointerOnPopup,
  isShown: isVisible,
});

onMounted(() => {
  window.addEventListener('scroll', closePopup);
});

onUnmounted(() => {
  window.removeEventListener('scroll', closePopup);
});
</script>
