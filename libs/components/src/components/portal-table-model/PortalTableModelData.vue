<template>
  <PortalTableBase
    ref="tableBaseRef"
    v-bind="attrs"
    :table="modelValue"
  >
    <template #header>
      <PortalTableBaseHeader
        v-model:header="modelHeader"
        v-model:rows="tableRows"
        :table-ref="tableRef"
        :table-container="tableContainer"
      />
    </template>
    <template #default>
      <PortalTableModelBody
        v-if="!isLoading"
        v-model="modelRows"
        :column-settings="columnSettings"
        @change:row="onRowChanged"
      />
    </template>
  </PortalTableBase>
  <TableModelState v-bind="props" />
</template>

<script setup lang="ts" generic="T">
import { computed, ref, useAttrs } from 'vue';
import PortalTableBase from '@comp/components/portal-table/PortalTableBase.vue';
import PortalTableBaseHeader from '@comp/components/portal-table/PortalTableBaseHeader.vue';
import TableModelState from '@comp/components/table/TableModelState.vue';
import PortalTableModelBody from '@comp/components/portal-table-model/PortalTableModelBody.vue';
import type {
  PortalTableModelProps,
  TPortalTableModel,
  TPortalTableModelRows,
} from '@comp/components/portal-table-model/utils/models';
import type { TPortalHeaderRow, TPortalRow } from '@comp/components/portal-table/utils/models';
import { getHeaderOrFirstHeaderRow } from '@comp/components/portal-table/utils/headerUtils';
import { headerCellsToColumnSettings } from '@comp/components/portal-table/utils';

const props = defineProps<PortalTableModelProps<T>>();
const attrs = useAttrs();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TPortalTableModel<T>): void;
  (eventName: 'change:row', changedRowIndex: number, newModel: TPortalTableModel<T>): void;
}>();

const tableBaseRef = ref();
const tableRef = computed(() => tableBaseRef.value?.tableRef);
const modelRows = computed<TPortalTableModelRows<T>>({
  get() {
    return props.modelValue.rows;
  },
  set(newRows): void {
    emit('update:modelValue', {
      ...props.modelValue,
      rows: newRows,
    });
  },
});

const tableRows = computed<TPortalRow<T>[]>({
  get() {
    return modelRows.value.model.map((modelItem, modelItemIndex) =>
      modelRows.value.rowFactory(modelItem, modelItemIndex),
    );
  },
  set(newRows) {
    const newModel: T[] = newRows.map((row, rowIndex) => ({
      ...props.modelValue.rows.model[rowIndex],
      ...props.modelValue.rows.modelChanges(row, rowIndex),
    }));

    const newModelRows: TPortalTableModelRows<T> = {
      ...props.modelValue.rows,
      model: newModel,
    };

    emit('update:modelValue', {
      ...props.modelValue,
      rows: newModelRows,
    });
  },
});

const onRowChanged = (changedRowIndex: number, newModelRows: TPortalTableModelRows<T>) => {
  emit('change:row', changedRowIndex, {
    ...props.modelValue,
    rows: newModelRows,
  });
};

const modelHeader = computed<TPortalHeaderRow<T> | TPortalHeaderRow<T>[]>({
  get() {
    return props.modelValue.header;
  },
  set(newValue): void {
    emit('update:modelValue', {
      ...props.modelValue,
      header: newValue,
    });
  },
});

const headerFirstRow = computed(() => getHeaderOrFirstHeaderRow(props.modelValue.header));
const columnSettings = computed(() => headerCellsToColumnSettings(headerFirstRow.value?.cells));
</script>
