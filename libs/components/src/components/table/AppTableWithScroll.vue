<template>
  <TableState v-bind="props">
    <StickyTableHeaderStub
      v-if="isHeaderSticky && modelValue?.isHeaderSticky"
      ref="stickyHeaderStub"
      :container="stickyHeaderStubContainer"
      class="bg-white"
    />
    <AppTableWithScrollData
      v-if="model"
      ref="tableDataRef"
      v-model="model"
      v-bind="attrs"
      @change:header="(isSticky) => (isHeaderSticky = isSticky)"
    />
  </TableState>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, useAttrs } from 'vue';
import type { AppTableProps, TTableData } from '@comp/components/table/utils/models';
import TableState from '@comp/components/table/TableState.vue';
import AppTableWithScrollData from '@comp/components/table/AppTableWithScrollData.vue';
import { useStickyTableHeader } from '@comp/tables/hooks/useStickyTableHeader';
import StickyTableHeaderStub from '@comp/components/table/StickyTableHeaderStub.vue';

const props = withDefaults(defineProps<AppTableProps>(), {
  noDataStubTexts: () => ['Для выбранных настроек данные недоступны.', 'Выберите другие настройки в фильтре.'],
  stickyHeaderStubContainer: () => document.body,
});

const tableDataRef = ref();
const tableRef = computed(() => tableDataRef.value?.tableRef);
const attrs = useAttrs();

const stickyHeaderStub = ref();
const stubRef = computed(() => stickyHeaderStub.value?.stub);
const { isHeaderSticky, setStubHeight } = useStickyTableHeader(tableRef, stubRef);

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TTableData | null): void;
}>();

const model = computed({
  get(): TTableData | null {
    return props.modelValue;
  },
  set(newValue: TTableData | null): void {
    emit('update:modelValue', newValue);
  },
});

onMounted(() => nextTick(() => setTimeout(setStubHeight, 0)));
</script>
