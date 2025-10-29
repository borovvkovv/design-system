<template>
  <tbody>
    <template
      v-for="(modelRow, index) in modelValue.model"
      :key="`row_${index}`"
    >
      <PortalTableBaseRow
        :model-value="modelValue.rowFactory(modelRow, index)"
        :column-settings="columnSettings"
        @update:model-value="(newValue) => updateRow(modelValue.model, index, newValue)"
      />
    </template>
  </tbody>
</template>

<script setup lang="ts" generic="T">
import { replaceItemInArrayByIndex } from '@comp/utils/array';
import PortalTableBaseRow from '@comp/components/portal-table/PortalTableBaseRow.vue';
import type { TPortalTableModelRows } from '@comp/components/portal-table-model/utils/models';
import type { ColumnSetting, TPortalRow } from '@comp/components/portal-table/utils/models';

const props = defineProps<{
  modelValue: TPortalTableModelRows<T>;
  columnSettings: ColumnSetting[];
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TPortalTableModelRows<T>): void;
  (eventName: 'change:row', changedRowIndex: number, newModelRows: TPortalTableModelRows<T>): void;
}>();

const updateRow = (rows: T[], index: number, newRowValue: TPortalRow<T>) => {
  const newModel = replaceItemInArrayByIndex(
    {
      ...rows[index],
      ...props.modelValue.modelChanges(newRowValue, index),
    },
    index,
    rows,
  );

  const newModelRows = {
    ...props.modelValue,
    model: newModel,
  };

  emit('update:modelValue', newModelRows);
  emit('change:row', index, newModelRows);
};
</script>
