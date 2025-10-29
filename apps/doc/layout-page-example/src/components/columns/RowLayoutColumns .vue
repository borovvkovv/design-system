<template>
  <div
    ref="row"
    class="row bg-[#f9cc9d]"
  >
    <LayoutColumns
      :column-widths="columnWidths"
      :layout-container-margin="layoutContainerMargin"
      :show-column-width
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getRowMargin, getRowWidth } from '@layout/utils';
import LayoutColumns from '@layout/components/columns/LayoutColumns.vue';

defineProps<{
  columnWidths: Array<string>;
  layoutContainerMargin: string;
  showColumnWidth?: boolean;
}>();

const row = ref<HTMLElement | undefined>();
const rowWidth = ref(0);
const rowMargin = ref(0);

const rowResizeObserver = new ResizeObserver(() => {
  if (row.value) {
    rowWidth.value = getRowWidth(row.value);
    rowMargin.value = getRowMargin(row.value);
  }
});

onMounted(() => {
  if (row.value) rowResizeObserver.observe(row.value);
});

onUnmounted(() => {
  if (row.value) rowResizeObserver.observe(row.value);
});

defineExpose({
  rowWidth,
  rowMargin,
});
</script>
