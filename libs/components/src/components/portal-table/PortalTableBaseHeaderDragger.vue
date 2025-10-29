<template>
  <ModalWithSwipe
    :swipe-field="swipeField"
    :swipe-start-field="dragger"
    is-prevent-default
    @before-swipe="beforeSwipe"
    @swiping:x="(xDifference: number) => swipingXHandler(xDifference)"
  >
    <div
      ref="dragger"
      class="z-100 absolute bottom-0 right-0 top-0 w-4 translate-x-1/2 cursor-col-resize"
    />
  </ModalWithSwipe>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { useThrottle } from '@comp/utils/useThrottle';
import ModalWithSwipe from '@comp/components/modals/ModalWithSwipe.vue';
import {
  PORTAL_TABLE_COLUMN_THROTTLE_DRAGGING_MS,
  type TPortalHeaderCell,
} from '@comp/components/portal-table/utils/models';

const props = defineProps<{
  cell: TPortalHeaderCell<T>;
  headerCell: HTMLElement | undefined;
  swipeField: HTMLElement | undefined;
  minWidth: number | undefined;
}>();

const emit = defineEmits<{
  (eventName: 'update:cell', newCell: TPortalHeaderCell<T>): void;
}>();

const dragger = ref();
const initialColumnWidth = ref(0);

const beforeSwipe = () => {
  if (props.headerCell) initialColumnWidth.value = props.cell.width ?? props.headerCell.getBoundingClientRect().width;
};

const swipingXHandler = useThrottle(PORTAL_TABLE_COLUMN_THROTTLE_DRAGGING_MS, (xDiffernece: number) => {
  const newWidth = Math.max(initialColumnWidth.value - xDiffernece, props.minWidth ?? 0);
  emit('update:cell', {
    ...props.cell,
    width: newWidth,
  });
});
</script>
