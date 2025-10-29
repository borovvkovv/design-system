<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { useSwipeEvents } from './hooks/useSwipeEvents';
import type { IModalWithSwipeProps, ModalWithSwipeEmits } from './utils/models';

const props = withDefaults(defineProps<IModalWithSwipeProps>(), {
  swipeThresholdPx: 50,
  swipeTimeoutMs: 500,
  isPreventDefault: false,
  swipeField: undefined,
  swipeStartField: undefined,
});

const emit = defineEmits<ModalWithSwipeEmits>();

const { handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseMove, handleMouseStart } = useSwipeEvents(
  props.swipeTimeoutMs,
  props.swipeThresholdPx,
  emit,
  props.isPreventDefault,
);

onMounted(() => {
  props.swipeField?.addEventListener('touchmove', handleTouchMove, false);
  props.swipeField?.addEventListener('touchend', handleTouchEnd, false);

  props.swipeStartField?.addEventListener('mousedown', handleMouseStart, false);
  props.swipeField?.addEventListener('mousemove', handleMouseMove, false);
  props.swipeField?.addEventListener('mouseup', handleTouchEnd, false);
  props.swipeField?.addEventListener('mouseleave', handleTouchEnd, false);
});

onUnmounted(() => {
  props.swipeField?.removeEventListener('touchmove', handleTouchMove, false);
  props.swipeField?.removeEventListener('touchend', handleTouchEnd, false);

  props.swipeStartField?.removeEventListener('mousedown', handleMouseStart, false);
  props.swipeField?.removeEventListener('mousemove', handleMouseMove, false);
  props.swipeField?.removeEventListener('mouseup', handleTouchEnd, false);
  props.swipeField?.removeEventListener('mouseleave', handleTouchEnd, false);
});

watch(
  () => props.swipeField,
  () => {
    if (props.swipeField) {
      props.swipeField?.addEventListener('touchmove', handleTouchMove, false);
      props.swipeField?.addEventListener('touchend', handleTouchEnd, false);

      props.swipeField?.addEventListener('mousemove', handleMouseMove, false);
      props.swipeField?.addEventListener('mouseup', handleTouchEnd, false);
      props.swipeField?.addEventListener('mouseleave', handleTouchEnd, false);
    }
  },
);

watch(
  () => props.swipeStartField,
  () => {
    if (props.swipeStartField) {
      props.swipeStartField?.addEventListener('touchstart', handleTouchStart, false);
      props.swipeStartField?.addEventListener('mousedown', handleMouseStart, false);
    }
  },
);
</script>
