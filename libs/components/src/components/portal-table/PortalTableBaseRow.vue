<template>
  <tr
    :class="['group', modelValue.modifier?.text, modelValue.modifier?.textColor, modelValue.modifier?.other]"
    @mouseenter="
      (evt: MouseEvent) => {
        popupRef?.showPopup(evt);
        if (tdRef) tdRef.style.height = `${(evt.target as HTMLElement).getBoundingClientRect().height}px`;
      }
    "
    @mouseleave="() => popupRef?.closePopup()"
  >
    <template
      v-for="(cell, cellIndex) in sortedRow"
      :key="`cell_${cellIndex}`"
    >
      <td
        v-if="isCellVisible(cell)"
        :rowspan="cell.rowspan"
        :colspan="cell.colspan"
        :class="[
          cell.modifier?.text,
          cell.modifier?.textColor,
          cell.modifier?.textAlign ?? (cellIndex === 0 ? 'text-left' : 'text-right'),
          cell.modifier?.verticalAlign ?? 'align-top',
          cell.modifier?.padding ?? ['py-3', cellIndex > 0 && 'pl-8 md:pl-16'],
          cell.modifier?.border ?? 'border-t-blueGrey-4 border-t',
          cell.modifier?.width,
          cell.modifier?.other,
        ]"
      >
        <AppTableBaseCell
          :key="cellIndex"
          :model-value="cell"
          @update:model-value="
            (newValue) => emit('update:modelValue', getTableRowWithNewCell(modelValue, cell.beforeSortIndex, newValue))
          "
        />
      </td>
    </template>
    <td
      ref="tdRef"
      class="absolute right-0 hidden group-hover:block"
    >
      <PortalTableBaseRowActions
        v-if="modelValue.actionsSection"
        :actions-section="modelValue.actionsSection"
        class="h-full"
      />
    </td>
  </tr>
  <PortalTableRowPopup
    v-if="modelValue.popup"
    ref="popupRef"
    :popup="modelValue.popup"
  />
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';
import { equalsOrIncludes } from '@comp/utils/array';
import { compareByKey } from '@comp/utils/compare';
import type { ColumnSetting, TPortalRow } from '@comp/components/portal-table/utils/models';
import PortalTableBaseRowActions from '@comp/components/portal-table/PortalTableBaseRowActions.vue';
import AppTableBaseCell from '@comp/components/table/AppTableBaseCell.vue';
import type { TCellSorted } from '@comp/components/table/utils/models';
import { getTableRowWithNewCell } from '@comp/components/table/utils';
import PortalTableRowPopup from '@comp/components/portal-table/PortalTableRowPopup.vue';
import { getColumnSettingIndexByColumnIndex } from './utils';

const props = defineProps<{
  modelValue: TPortalRow<T>;
  columnSettings: ColumnSetting[];
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TPortalRow<T>): void;
}>();

const popupRef = ref<InstanceType<typeof PortalTableRowPopup>>();
const tdRef = ref<HTMLElement | undefined>();
const sortedRow = computed<TCellSorted[]>(() => {
  const rowCellsWithColumnIndexes = props.modelValue.cells.map((cell, cellIndex) => ({
    ...cell,
    sortingIndex: getColumnSettingIndexByColumnIndex(props.columnSettings, cellIndex),
    beforeSortIndex: cellIndex,
  }));
  return rowCellsWithColumnIndexes.sort(compareByKey('sortingIndex'));
});

const isCellVisible = (cell: TCellSorted) =>
  !props.columnSettings.find((columnSetting) => equalsOrIncludes(columnSetting.columnIndexes, cell.beforeSortIndex))
    ?.isHidden;
</script>
