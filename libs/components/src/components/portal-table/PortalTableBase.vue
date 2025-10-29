<template>
  <div
    class="scrollbar-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 w-full overflow-x-auto"
  >
    <table
      ref="tableRef"
      :class="[
        table.modifier?.text ?? 'text-size-5',
        table.modifier?.textColor ?? 'text-black-1',
        table.modifier?.width ?? 'w-full',
        table.modifier?.other,
        'relative',
      ]"
    >
      <slot name="header" />
      <slot v-if="!isLoading" />
    </table>
    <slot name="afterTable" />
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import type { TPortalBase } from '@comp/components/portal-table/utils/models';

defineProps<{
  table: TPortalBase<T>;
  isLoading?: boolean;
}>();

const tableRef = ref();

defineExpose({
  tableRef,
});
</script>
