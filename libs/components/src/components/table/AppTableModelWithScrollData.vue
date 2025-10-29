<template>
  <div>
    <AppTableWithScrollHeader
      ref="appTableWithScrollHeader"
      v-model:is-column-sticky-now="isColumnStickyNow"
      :table-data="modelValue"
      :header="modelValue.header"
      :table-with-content="contentTable"
      :is-header-sticky="modelValue.isHeaderSticky"
      :is-column-sticky="modelValue.isColumnSticky"
      @change:header="(isSticky) => emit('change:header', isSticky)"
    />
    <div
      ref="contentTableWrapper"
      :class="'scrollbar-none overflow-x-auto overflow-y-hidden'"
    >
      <AppTableBase
        ref="contentTableRef"
        :table="modelValue"
        class="border-separate border-spacing-0"
      >
        <template #header>
          <AppTableBaseHeader
            :header="modelValue.header"
            class="collapse"
          />
        </template>
        <template #default>
          <AppTableModelBody
            v-model="modelRows"
            :is-column-sticky="modelValue.isColumnSticky"
            :is-column-sticky-now="isColumnStickyNow"
            @change:row="onRowChanged"
          />
        </template>
      </AppTableBase>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { TTableModel, TTableModelRows } from '@comp/components/table/utils/models';
import AppTableModelBody from '@comp/components/table/AppTableModelBody.vue';
import { computed, ref, watch } from 'vue';
import AppTableBase from '@comp/components/table/AppTableBase.vue';
import AppTableBaseHeader from '@comp/components/table/AppTableBaseHeader.vue';
import AppTableWithScrollHeader from '@comp/components/table/AppTableWithScrollHeader.vue';
import { useSynchronousTablesScroll } from '@comp/tables/hooks/useSynchronousTablesScroll';

const props = defineProps<{
  modelValue: TTableModel<T>;
}>();

const emit = defineEmits<{
  (eventName: 'change:row', changedRowIndex: number, newModel: TTableModel<T>): void;
  (eventName: 'update:modelValue', newValue: TTableModel<T>): void;
  (eventName: 'change:header', isSticky: boolean): void;
}>();

const isColumnStickyNow = ref(false);
const appTableWithScrollHeader = ref();
const headerTableWrapper = computed(() => appTableWithScrollHeader.value?.headerTableWrapper);
const headerTable = computed(() => appTableWithScrollHeader.value?.headerTable ?? contentTableRef.value?.tableRef);
const contentTableWrapper = ref();
const contentTableRef = ref();
const contentTable = computed<HTMLTableElement | undefined>(() => contentTableRef.value?.tableRef);

const modelRows = computed<TTableModelRows<T>>({
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
const { onScrollContentTableHandler, onScrollHeaderTableHandler } = useSynchronousTablesScroll(
  headerTableWrapper,
  contentTableWrapper,
);

const onRowChanged = (changedRowIndex: number, newModelRows: TTableModelRows<T>) => {
  emit('change:row', changedRowIndex, {
    ...props.modelValue,
    rows: newModelRows,
  });
};

watch(
  [() => headerTableWrapper.value, () => contentTableWrapper.value],
  () => {
    if (headerTableWrapper.value && contentTableWrapper.value) {
      headerTableWrapper.value.addEventListener('scroll', onScrollHeaderTableHandler);
      contentTableWrapper.value.addEventListener('scroll', onScrollContentTableHandler);
    }
  },
  { immediate: true },
);

defineExpose({
  tableRef: headerTable,
});
</script>
