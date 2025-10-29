<template>
  <div :class="['flex w-full flex-col', styles.fileSkeleton]">
    <div
      v-for="(_, i) in Array(rowsCount)"
      :key="i"
      class="flex gap-x-4"
    >
      <LinesSkeleton
        v-bind="{
          rowsGap: 0,
          rowsCount: 1,
          rowHeight: iconDocumentExtensionHeight,
        }"
        :class="['w-10 shrink-0 grow-0', i !== 0]"
      />
      <div :class="['flex grow flex-col', !isWithSize && 'justify-center']">
        <div class="py-1">
          <LinesSkeleton
            v-bind="{
              rowsGap: 0,
              rowsCount: 1,
              rowHeight: 14,
            }"
          />
        </div>
        <div
          v-if="isWithSize"
          class="py-1"
        >
          <LinesSkeleton
            v-bind="{
              rowsGap: 0,
              rowsCount: 1,
              rowHeight: 12,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { FileSkeletonProps } from '@comp/components/skeletons/utils/models';
import LinesSkeleton from '@comp/components/skeletons/LinesSkeleton.vue';

const props = withDefaults(defineProps<FileSkeletonProps>(), {
  rowsCount: 6,
  rowsGap: 20,
  isWithSize: true,
});

const iconDocumentExtensionHeight = computed(() => (props.isWithSize ? 48 : 40));

const styles = useCssModule();

const columnGapPx = computed(() => `${props.rowsGap}px`);
</script>

<style module lang="scss">
.fileSkeleton {
  row-gap: v-bind('columnGapPx');
}
</style>
