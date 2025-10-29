<template>
  <thead
    ref="headerRef"
    :class="[isHeaderSticky && 'sticky top-0 z-10']"
  >
    <tr
      v-for="(headerRow, headerRowIndex) in header instanceof Array ? header : [header]"
      :key="headerRowIndex"
      :class="[headerRow.modifier?.textColor ?? 'text-grey-2', headerRow.modifier?.other]"
      @dragstart.capture.prevent.stop=""
    >
      <template
        v-for="(cell, cellIndex) in orderHeaderRow(headerRow.cells)"
        :key="`${cellIndex}-${isLastVisibleCell(headerRow, cellIndex)}-${cell.index}-${headerRow.cells[cellIndex]?.index}`"
      >
        <th
          v-show="!cell.isHidden"
          ref="cells"
          :class="[
            'relative box-border',
            cell.modifier?.text ?? 'font-normal',
            cell.modifier?.textColor,
            cell.modifier?.textAlign ?? (cellIndex === 0 ? 'text-left' : 'text-right'),
            cell.modifier?.width ?? (cellIndex === 0 ? 'w-auto' : 'w-53'),
            cell.modifier?.padding ?? ['py-4', cellIndex === 0 ? 'pl-0' : 'pl-8 md:pl-16'],
            cell.modifier?.border,
            cell.modifier?.other,
            cell.modifier?.verticalAlign,
          ]"
          :rowspan="cell.rowspan"
          :colspan="cell.colspan"
          :style="{
            width: `${cell.isLastVisibleCell ? undefined : cell.width}px`,
            minWidth: `${cell.isLastVisibleCell ? undefined : cell.width}px`,
          }"
          @mouseenter="() => (headerCellIndex = cellIndex)"
          @mouseleave="() => (headerCellIndex = undefined)"
          @focusout="() => (headerCellIndex = undefined)"
        >
          <PortalTableBaseHeaderCell
            ref="portalTableBaseHeaderCells"
            v-model:rows="rows"
            :model-value="cell"
            :is-header-cell-hover="cellIndex === headerCellIndex"
            :table-container="tableContainer"
            @update:model-value="
              (newValue: TPortalHeaderCell<T>) => onUpdateCellHandler(newValue, headerRowIndex, cellIndex)
            "
            @before:sort="resetAllSortControls"
          />
          <PortalTableBaseHeaderDragger
            v-if="cellIndex < headerRow.cells.length - 1"
            :header-cell="cells?.[cellIndex]"
            :cell="cell"
            :swipe-field="tableRef"
            :min-width="cell.minWidth"
            @update:cell="(newValue: TPortalHeaderCell<T>) => onUpdateCellHandler(newValue, headerRowIndex, cellIndex)"
          />
        </th>
      </template>
    </tr>
  </thead>
</template>

<script setup lang="ts" generic="T">
import { computed, onMounted, ref } from 'vue';
import { replaceItemInArrayByIndex } from '@comp/utils/array';
import { useTableHeaderSticknessStatus } from '@comp/tables/hooks/useTableHeaderSticknessStatus';
import PortalTableBaseHeaderCell from './PortalTableBaseHeaderCell.vue';
import PortalTableBaseHeaderDragger from './PortalTableBaseHeaderDragger.vue';
import type {
  PortalTableBaseHeaderCellRef,
  QueryParam,
  TPortalHeaderCell,
  TPortalHeaderRow,
  TPortalRow,
} from './utils/models';
import {
  orderHeaderRow,
  resetHeaderCell,
  initializeHeaderRowCells,
  insertCellIntoPortalTableHeaderRow,
} from './utils/headerUtils';

const rows = defineModel<TPortalRow<T>[]>('rows', { required: true });

const props = withDefaults(
  defineProps<{
    header: TPortalHeaderRow<T> | TPortalHeaderRow<T>[];
    isHeaderSticky?: boolean;
    tableRef: HTMLElement | undefined;
    tableContainer?: HTMLElement;
  }>(),
  {
    isHeaderSticky: false,
    tableContainer: undefined,
  },
);

const emit = defineEmits<{
  (eventName: 'update:header', newValue: TPortalHeaderRow<T> | TPortalHeaderRow<T>[]): void;
  (eventName: 'change:header', isSticky: boolean): void;
}>();

const headerRef = ref<Element | undefined>();
const headerCellIndex = ref<number | undefined>();
const cells = ref<HTMLElement[] | undefined>();
const portalTableBaseHeaderCells = ref<Array<PortalTableBaseHeaderCellRef>>();

const queryParams = computed(() => {
  const allHeaderQueryParams: QueryParam[] = [];

  portalTableBaseHeaderCells.value?.forEach((headerCell) => {
    allHeaderQueryParams.push(...headerCell.queryParams);
  });

  return allHeaderQueryParams;
});

const { setHeaderSticknessStatusListeners } = useTableHeaderSticknessStatus(headerRef, (isSticky: boolean) =>
  emit('change:header', isSticky),
);

const onUpdateCellHandler = (cell: TPortalHeaderCell<T>, headerRowindex: number, cellOrderIndex: number): void => {
  const header: TPortalHeaderRow<T> | Array<TPortalHeaderRow<T>> = props.header;
  if (header instanceof Array) {
    let newHeaderRow = header[headerRowindex];
    if (newHeaderRow) {
      newHeaderRow = insertCellIntoPortalTableHeaderRow(newHeaderRow, cell, cellOrderIndex);
      emit('update:header', replaceItemInArrayByIndex(newHeaderRow, headerRowindex, header));
    }
  } else {
    emit('update:header', insertCellIntoPortalTableHeaderRow(header, cell, cellOrderIndex));
  }
};

const resetAllSortControls = () => {
  if (props.header instanceof Array) {
    emit(
      'update:header',
      props.header.map((headerRow) => ({
        ...headerRow,
        cells: headerRow.cells.map(resetHeaderCell),
      })),
    );
  } else {
    emit('update:header', {
      ...props.header,
      cells: props.header.cells.map(resetHeaderCell),
    });
  }
};

const isLastVisibleCell = (headerRow: TPortalHeaderRow<T>, cellOrderIndex: number) => {
  const orderedCellsByOrderIndex = orderHeaderRow(headerRow.cells);
  const lastVisibleCellOrderIndex = orderedCellsByOrderIndex.map((cell) => !cell.isHidden).lastIndexOf(true) ?? -1;

  return cellOrderIndex === lastVisibleCellOrderIndex;
};

onMounted(() => {
  if (props.isHeaderSticky) {
    setHeaderSticknessStatusListeners();
  }

  if (props.header instanceof Array) {
    const newHeader: TPortalHeaderRow<T>[] = props.header.map((headerRow) =>
      initializeHeaderRowCells(headerRow, cells.value),
    );

    emit('update:header', newHeader);
  } else {
    emit('update:header', initializeHeaderRowCells(props.header, cells.value));
  }
});

defineExpose({ queryParams });
</script>
