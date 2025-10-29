<template>
  <TableModelState v-bind="props">
    <StickyTableHeaderStub
      v-if="isHeaderSticky && modelValue?.isHeaderSticky"
      ref="stickyHeaderStub"
      :container="stickyHeaderStubContainer"
      class="bg-white"
    />
    <AppTableModelWithScrollData
      ref="tableDataRef"
      v-model="model"
      v-bind="attrs"
      @change:header="(isSticky) => (isHeaderSticky = isSticky)"
      @change:row="(changedRowIndex, newModel) => emit('change:row', changedRowIndex, newModel)"
    />
  </TableModelState>
</template>

<script setup lang="ts" generic="T">
import type { AppTableModelProps, TTableModel } from '@comp/components/table/utils/models';
import { computed, onMounted, ref, useAttrs, nextTick } from 'vue';
import TableModelState from '@comp/components/table/TableModelState.vue';
import AppTableModelWithScrollData from '@comp/components/table/AppTableModelWithScrollData.vue';
import StickyTableHeaderStub from '@comp/components/table/StickyTableHeaderStub.vue';
import { useStickyTableHeader } from '@comp/tables/hooks/useStickyTableHeader';

const props = withDefaults(defineProps<AppTableModelProps<T>>(), {
  stickyHeaderStubContainer: () => document.body,
});

const tableDataRef = ref();
const tableRef = computed(() => tableDataRef.value?.tableRef);
const attrs = useAttrs();

const stickyHeaderStub = ref();
const stubRef = computed(() => stickyHeaderStub.value?.stub);
const { isHeaderSticky, setStubHeight } = useStickyTableHeader(tableRef, stubRef);

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TTableModel<T>): void;
  (eventName: 'change:row', changedRowIndex: number, newModel: TTableModel<T>): void;
}>();

const model = computed<TTableModel<T>>({
  get() {
    return props.modelValue;
  },
  set(newValue): void {
    emit('update:modelValue', newValue);
  },
});

onMounted(() => nextTick(() => setTimeout(setStubHeight, 0)));
</script>
