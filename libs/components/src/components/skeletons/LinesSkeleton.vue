<template>
  <div class="flex flex-col">
    <LineSkeleton
      v-for="(_, i) in new Array(rowsCount)"
      :key="i"
      :class="[styles.line]"
    />
  </div>
</template>

<script setup lang="ts">
import { useCssModule, computed } from 'vue';
import type { LineSkeletonProps } from '@comp/components/skeletons/utils/models';
import LineSkeleton from '@comp/components/skeletons/LineSkeleton.vue';

const props = withDefaults(defineProps<LineSkeletonProps>(), {
  rowsCount: 12,
  rowHeight: 22,
  rowsGap: 25,
});

const styles = useCssModule();

const lineHeightPx = computed(() => `${props.rowHeight}px`);
const paddingYPx = computed(() => `${Math.round(props.rowsGap / 2)}px`);
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.line {
  padding: v-bind(paddingYPx) 0;
  height: v-bind(lineHeightPx);
}
</style>
