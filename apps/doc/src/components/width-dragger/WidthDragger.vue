<template>
  <ModalWithSwipe
    :swipe-field="swipeField"
    :swipe-start-field="dragger"
    is-prevent-default
    @before-swipe="beforeSwipe"
    @swiping:x="(xDifference: number) => swipingXHandler(xDifference)"
    @swiped:end="() => emit('swiped:end')"
  >
    <div
      ref="dragger"
      class="border-grey-3 relative flex cursor-col-resize gap-x-2 border px-6 py-5"
    >
      <div class="bg-grey-3 h-full w-px" />
      <div class="bg-grey-3 h-full w-px" />
      <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-3">{{ `${width}px` }}</span>
    </div>
  </ModalWithSwipe>
</template>

<script setup lang="ts">
import { ModalWithSwipe } from '@libs/components/modals';
import { ref } from 'vue';

const props = defineProps<{
  width: number;
  headerCell: HTMLElement | undefined;
  swipeField: HTMLElement | undefined;
  minWidth: number | undefined;
}>();

const emit = defineEmits<{
  (eventName: 'update:width', newCell: number): void;
  (eventName: 'before:swipe'): void;
  (eventName: 'swiped:end'): void;
}>();

const dragger = ref();
const initialColumnWidth = ref(0);

const beforeSwipe = () => {
  if (props.headerCell) initialColumnWidth.value = props.headerCell.getBoundingClientRect().width;

  emit('before:swipe');
};

const swipingXHandler = (xDiffernece: number) => {
  const newWidth = Math.max(initialColumnWidth.value - xDiffernece, props.minWidth ?? 0);

  emit('update:width', Math.round(newWidth));
};
</script>
