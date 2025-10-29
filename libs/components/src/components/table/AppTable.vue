<template>
  <TableState v-bind="props">
    <StickyTableHeaderStub
      v-if="isHeaderSticky && modelValue?.isHeaderSticky"
      ref="stickyHeaderStub"
      :container="stickyHeaderStubContainer"
      class="bg-white"
    />
    <AppTableData
      v-if="model"
      ref="tableDataRef"
      v-model="model"
      v-bind="attrs"
      @change:header="(isSticky) => (isHeaderSticky = isSticky)"
    />
  </TableState>
</template>

<script setup lang="ts">
import type { AppTableProps, TTableData } from '@comp/components/table/utils/models';
import AppTableData from '@comp/components/table/AppTableData.vue';
import { computed, onMounted, ref, useAttrs, nextTick } from 'vue';
import TableState from '@comp/components/table/TableState.vue';
import StickyTableHeaderStub from '@comp/components/table/StickyTableHeaderStub.vue';
import { useStickyTableHeader } from '@comp/tables/hooks/useStickyTableHeader';

const props = withDefaults(defineProps<AppTableProps>(), {
  stickyHeaderStubContainer: () => document.body,
});

const tableDataRef = ref();
const tableRef = computed(() => tableDataRef.value?.tableRef);
const attrs = useAttrs();

const stickyHeaderStub = ref();
const stubRef = computed(() => stickyHeaderStub.value?.stub);
const { isHeaderSticky, setStubHeight } = useStickyTableHeader(tableRef, stubRef);

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TTableData | null | undefined): void;
}>();

const model = computed<TTableData | null | undefined>({
  get() {
    return props.modelValue;
  },
  set(newValue): void {
    emit('update:modelValue', newValue);
  },
});

onMounted(() => nextTick(() => setTimeout(setStubHeight, 0)));

defineExpose({
  tableRef,
});
</script>
