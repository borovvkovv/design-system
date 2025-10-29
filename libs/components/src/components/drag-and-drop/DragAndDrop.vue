<template>
  <ModalWithSwipe
    :swipe-field="swipeField"
    :swipe-start-field="contentRef"
    is-prevent-default
    @before-swipe="(x: number, y: number) => onSwipeBeforeHandler(x, y)"
    @swiping="(x: number, y: number) => onSwipingHandler(x, y)"
    @swiped:end="onSwipeEndHandler"
  >
    <div
      ref="contentRef"
      :class="['cursor-pointer', isSwiping && 'absolute']"
    >
      <slot :is-swiping="isSwiping" />
    </div>
    <div
      v-if="isSwiping"
      ref="stub"
    >
      <slot name="stub" />
    </div>
  </ModalWithSwipe>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Point } from 'chart.js';
import { removePxMeasureFromValue } from '@comp/utils/string';
import ModalWithSwipe from '@comp/components/modals/ModalWithSwipe.vue';

const props = defineProps<{
  swipeField: HTMLElement | undefined;
}>();

const emit = defineEmits<{
  (eventName: 'swiping', topLeftContent: Point, rightBottomContent: Point): void;
  (eventName: 'swiped:end'): void;
}>();

const contentRef = ref<HTMLElement | undefined>();
const stub = ref<HTMLElement | undefined>();
const isSwiping = ref(false);
const cursorLocationInContent = ref<Point>({ x: 0, y: 0 });

const onSwipeBeforeHandler = (x: number, y: number) => {
  if (contentRef.value) {
    const content = contentRef.value.getBoundingClientRect();
    contentRef.value.style.width = `${content.width}px`;
    contentRef.value.style.height = `${content.height}px`;

    cursorLocationInContent.value.x = x - content.x;
    cursorLocationInContent.value.y = y - content.y;
  }
};

const onSwipingHandler = (x: number, y: number) => {
  if (!isSwiping.value) isSwiping.value = true;

  const swipeField = props.swipeField?.getBoundingClientRect();
  const leftContent = x - (cursorLocationInContent.value.x ?? 0) - (swipeField?.x ?? 0);
  const topContent = y - (cursorLocationInContent.value.y ?? 0) - (swipeField?.y ?? 0);

  if (contentRef.value) {
    contentRef.value.style.left = `${leftContent}px`;
    contentRef.value.style.top = `${topContent}px`;

    const rightContent = leftContent + removePxMeasureFromValue(contentRef.value.style.width);
    const bottomContent = topContent + removePxMeasureFromValue(contentRef.value.style.height);

    emit('swiping', { x: leftContent, y: topContent }, { x: rightContent, y: bottomContent });
  }
};

const onSwipeEndHandler = () => {
  if (!isSwiping.value) return;

  if (contentRef.value) {
    contentRef.value.style.left = '';
    contentRef.value.style.top = '';
  }

  isSwiping.value = false;

  emit('swiped:end');
};

watch(stub, () => {
  if (stub.value && contentRef.value) {
    const content = contentRef.value.getBoundingClientRect();

    stub.value.style.width = `${content.width}px`;
    stub.value.style.height = `${content.height}px`;
  }
});
</script>
