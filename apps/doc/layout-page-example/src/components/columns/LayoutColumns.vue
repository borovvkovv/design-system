<template>
  <div
    v-for="(columnWidth, columnWidthIndex) in columnWidths"
    :key="columnWidthIndex"
    ref="cols"
    :class="[
      'bg-[#8cb6c0] text-center',
      `col-${columnWidth}`,
      'relative',
      'flex flex-col items-center justify-between',
      'max-h-40 min-h-40',
    ]"
  >
    <span
      v-if="showColumnWidth"
      class="justify-self-start text-[28px]"
    >
      {{ columnWidth }}
    </span>
    <br />
    <span class="w-full border-b">{{ `${columnWidthsPx[columnWidthIndex]}px` }}</span>
    <span
      v-if="columnWidthIndex === 0"
      class="absolute left-0 top-1/4 pl-1"
    >
      {{ layoutContainerMargin }}
      <div :class="['absolute left-0 top-1/2 h-px -translate-x-full bg-black', styles.width]"></div>
    </span>
    <span
      v-if="!isFirstColumnInRow(cols, columnWidthIndex)"
      class="absolute left-0 top-1/3 pl-1"
    >
      {{ gutter }}
      <div :class="['absolute left-0 top-1/2 h-px -translate-x-full bg-black', styles.gutter]"></div>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, useCssModule, watch } from 'vue';
import { getColumnWidth, getGutter, isFirstColumnInRow } from '@layout/utils';

withDefaults(
  defineProps<{
    columnWidths: Array<string>;
    layoutContainerMargin: string;
    showColumnWidth?: boolean;
  }>(),
  {
    showColumnWidth: true,
  },
);

const cols = ref<Array<HTMLElement>>([]);
const columnWidthsPx = ref<Array<number>>([]);
const gutter = ref('');
const styles = useCssModule();

const bodyResizeObserver = new ResizeObserver(() => {
  updateColumnWidthsPx();
  if (cols.value?.length) gutter.value = getGutter(cols.value[0]);
});

const updateColumnWidthsPx = () => {
  columnWidthsPx.value = cols.value.map((col) => getColumnWidth(col));
};

watch(
  () => cols.value.length,
  () => updateColumnWidthsPx(),
);

onMounted(() => bodyResizeObserver.observe(document.body));

onUnmounted(() => bodyResizeObserver.unobserve(document.body));
</script>

<style module lang="scss">
.width {
  width: v-bind('layoutContainerMargin');
}

.gutter {
  width: v-bind('gutter');
}
</style>
