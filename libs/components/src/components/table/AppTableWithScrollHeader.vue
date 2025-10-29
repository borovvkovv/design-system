<template>
  <div
    ref="headerTableWrapper"
    :class="[
      tableData.isHeaderSticky && 'sticky top-0 z-10',
      'overflow-x-auto',
      'scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3',
    ]"
  >
    <AppTableBase
      ref="headerTableRef"
      :table="tableData"
      class="border-separate border-spacing-0"
    >
      <template #header>
        <AppTableBaseHeader
          ref="headerRef"
          :header="tableData.header"
          :is-header-sticky="tableData.isHeaderSticky"
          :is-column-sticky="tableData.isColumnSticky"
          :is-column-sticky-now
          @change:header="(isSticky) => emit('change:header', isSticky)"
        />
      </template>
    </AppTableBase>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed } from 'vue';
import type { TTableBase } from '@comp/components/table/utils/models';
import AppTableBase from '@comp/components/table/AppTableBase.vue';
import AppTableBaseHeader from '@comp/components/table/AppTableBaseHeader.vue';
import { useTableColumnSticknessStatus } from '@comp/tables/hooks/useTableColumnSticknessStatus';

const isColumnStickyNow = defineModel<boolean>('isColumnStickyNow');
const props = defineProps<{
  tableData: TTableBase;
  tableWithContent?: HTMLTableElement;
}>();

const emit = defineEmits<{
  (eventName: 'change:header', isSticky: boolean): void;
}>();

const headerTableWrapper = ref();
const headerTableRef = ref();
const headerRef = ref();
const headerTable = computed(() => headerTableRef.value?.tableRef);
const header = computed<Element | undefined>(() => headerRef.value?.$el);

const tableRows = ref<NodeListOf<HTMLTableRowElement>>();
const { checkColumnStickness } = useTableColumnSticknessStatus(
  headerTableWrapper,
  headerTable,
  (isSticky) => (isColumnStickyNow.value = isSticky),
);
const setHeaderColumnsWidth = () => {
  tableRows.value = props.tableWithContent?.parentNode?.querySelector('tbody')?.querySelectorAll('tr');
  tableRows.value?.forEach((row) => {
    const columnsOfRow = row.querySelectorAll('td');
    if (
      columnsOfRow.length ===
      (props.tableData.header instanceof Array
        ? (props.tableData.header?.[0].cells.length ?? 0)
        : props.tableData.header.cells.length)
    ) {
      const columnsWidth: Array<number> = [];
      columnsOfRow.forEach((column) => columnsWidth.push(column.getBoundingClientRect().width));

      if (header.value) {
        const headerRows = header.value.querySelectorAll('tr');
        headerRows.forEach((headerRow) => {
          const headerRowColumns = headerRow.querySelectorAll('th');
          headerRowColumns.forEach((headerRowColumn, index) => {
            headerRowColumn.style.width = `${columnsWidth[index] ?? 0}px`;
            headerRowColumn.style.minWidth = `${columnsWidth[index] ?? 0}px`;
          });
        });
      }

      return;
    }
  });
};

watch(
  () => props.tableWithContent,
  () => {
    window.removeEventListener('resize', setHeaderColumnsWidth);
    window.addEventListener('resize', setHeaderColumnsWidth);
    nextTick(() => setTimeout(setHeaderColumnsWidth, 0));
  },
);

watch(
  () => headerTableWrapper.value,
  () => {
    if (headerTableWrapper.value && props.tableData.isColumnSticky) {
      headerTableWrapper.value.addEventListener('scroll', checkColumnStickness);
      headerTableWrapper.value.addEventListener('resize', checkColumnStickness);
    }
  },
);

defineExpose({
  headerTableWrapper,
  headerTable,
});
</script>
