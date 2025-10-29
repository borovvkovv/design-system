<template>
  <tbody>
    <template
      v-for="(row, index) in modelValue"
      :key="`row_${index}`"
    >
      <AppTableBaseRow
        :model-value="row"
        :is-column-sticky
        :is-column-sticky-now
        @update:model-value="(newValue) => updateRow(modelValue, index, newValue)"
      />
    </template>
  </tbody>
</template>

<script setup lang="ts">
import type { TRow } from '@comp/components/table/utils/models';
import AppTableBaseRow from '@comp/components/table/AppTableBaseRow.vue';

defineProps<{
  modelValue: TRow[];
  isColumnSticky?: boolean;
  isColumnStickyNow?: boolean;
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TRow[]): void;
}>();

const updateRow = (rows: TRow[], index: number, newRowValue: TRow) => {
  const newRows = rows.slice();
  newRows[index] = newRowValue;
  emit('update:modelValue', newRows);
};
</script>
