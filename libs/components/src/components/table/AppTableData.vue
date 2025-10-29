<template>
  <AppTableBase
    ref="tableBaseRef"
    :table="modelValue"
  >
    <template #header>
      <AppTableBaseHeader
        :header="modelValue.header"
        :is-header-sticky="modelValue.isHeaderSticky"
        @change:header="(isSticky) => emit('change:header', isSticky)"
      />
    </template>
    <template #default>
      <AppTableDataBody v-model="modelRows" />
    </template>
  </AppTableBase>
</template>

<script setup lang="ts">
import type { TRow, TTableData } from '@comp/components/table/utils/models';
import AppTableDataBody from '@comp/components/table/AppTableDataBody.vue';
import { computed, ref } from 'vue';
import AppTableBase from '@comp/components/table/AppTableBase.vue';
import AppTableBaseHeader from '@comp/components/table/AppTableBaseHeader.vue';

const props = defineProps<{
  modelValue: TTableData;
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TTableData): void;
  (eventName: 'change:header', isSticky: boolean): void;
}>();

const tableBaseRef = ref();
const tableRef = computed(() => tableBaseRef.value?.tableRef);
const modelRows = computed({
  get(): TRow[] {
    return props.modelValue.rows;
  },
  set(newRows: TRow[]): void {
    emit('update:modelValue', {
      ...props.modelValue,
      rows: newRows,
    });
  },
});

defineExpose({
  tableRef,
});
</script>
