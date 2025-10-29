<template>
  <div class="flex flex-nowrap">
    <div class="grow overflow-hidden text-ellipsis">
      <AppTableCellText
        v-if="headerCell.type === 'text'"
        :cell="headerCell"
      />
      <AppTableCellIcon
        v-else-if="headerCell.type === 'icon'"
        :cell="headerCell"
      />
      <PortalTableBaseHeaderCellCheckBox
        v-else-if="headerCell.type === 'checkBox'"
        v-model:header-cell-check-box="headerCell"
        v-model:rows="rows"
      />
    </div>
    <div :class="[isHeaderCellHover || isAnyControlActive ? 'flex flex-nowrap' : 'hidden']">
      <div
        v-for="(columnControl, index) in headerCell.controls"
        :key="index"
        :class="[
          !isHeaderCellHover && isColumnControlFiltersDropDownClosed && isControlInactive(index) ? 'hidden' : 'block',
        ]"
      >
        <ColumnSort
          v-if="columnControl.type === 'sort'"
          ref="columnControls"
          :column-control="columnControl"
          @update:column-control="(newValue: TColumnControlSort) => onUpdateColumnControlHandler(newValue, index)"
          @before:sort="emit('before:sort')"
        />
        <ColumnFilterSelectSwitch
          v-else-if="columnControl.type === 'filterSelectSwitch'"
          ref="columnControls"
          :column-control="columnControl"
          :table-container="tableContainer"
          @update:column-control="
            (newValue: TColumnControlFilterSwitchSelect) => onUpdateColumnControlHandler(newValue, index)
          "
        />
        <ColumnFilterMultiSelectSwitch
          v-else-if="columnControl.type === 'filterMultiSelectSwitch'"
          ref="columnControls"
          :column-control="columnControl"
          :table-container="tableContainer"
          @update:column-control="
            (newValue: TColumnControlFilterSwitchMultiSelect) => onUpdateColumnControlHandler(newValue, index)
          "
        />
        <ColumnFilterNumberRange
          v-else-if="columnControl.type === 'filterNumberRange'"
          ref="columnControls"
          :column-control="columnControl"
          :table-container="tableContainer"
          @update:column-control="
            (newValue: TColumnControlFilterNumberRange) => onUpdateColumnControlHandler(newValue, index)
          "
        />
        <ColumnFilterDateRange
          v-else-if="columnControl.type === 'filterDateRange'"
          ref="columnControls"
          :column-control="columnControl"
          :table-container="tableContainer"
          @update:column-control="
            (newValue: TColumnControlFilterNumberRange) => onUpdateColumnControlHandler(newValue, index)
          "
        />
        <ColumnFilterSelect
          v-else-if="columnControl.type === 'filterSelect'"
          ref="columnControls"
          :column-control="columnControl"
          :table-container="tableContainer"
          @update:column-control="
            (newValue: TColumnControlFilterSelect) => onUpdateColumnControlHandler(newValue, index)
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';
import AppTableCellText from '@comp/components/table/cells/AppTableCellText.vue';
import AppTableCellIcon from '@comp/components/table/cells/AppTableCellIcon.vue';
import type {
  QueryParam,
  TColumnControl,
  TColumnControlFilterExpose,
  TColumnControlFilterNumberRange,
  TColumnControlFilterSelect,
  TColumnControlFilterSwitchMultiSelect,
  TColumnControlFilterSwitchSelect,
  TColumnControlSort,
  TColumnControlSortExpose,
  TPortalHeaderCell,
  TPortalRow,
} from '@comp/components/portal-table/utils/models';
import ColumnFilterSelectSwitch from '@comp/components/portal-table/column-controls/ColumnFilterSelectSwitch.vue';
import ColumnFilterNumberRange from '@comp/components/portal-table/column-controls/ColumnFilterNumberRange.vue';
import ColumnFilterSelect from '@comp/components/portal-table/column-controls/ColumnFilterSelect.vue';
import ColumnSort from '@comp/components/portal-table/column-controls/ColumnSort.vue';
import ColumnFilterDateRange from '@comp/components/portal-table/column-controls/ColumnFilterDateRange.vue';
import ColumnFilterMultiSelectSwitch from '@comp/components/portal-table/column-controls/ColumnFilterMultiSelectSwitch.vue';
import PortalTableBaseHeaderCellCheckBox from './cells/PortalTableBaseHeaderCellCheckBox.vue';

const headerCell = defineModel<TPortalHeaderCell<T>>({ required: true });
const rows = defineModel<TPortalRow<T>[]>('rows', { required: true });

defineProps<{
  isHeaderCellHover: boolean;
  tableContainer?: HTMLElement;
}>();

const emit = defineEmits<{
  (eventName: 'before:sort'): void;
}>();

const columnControls = ref<Array<TColumnControlSortExpose | TColumnControlFilterExpose>>();

const queryParams = computed<QueryParam[]>(() => {
  const allCellQueryParams: QueryParam[] = [];

  columnControls.value?.forEach((control) => {
    if ('isDropDownShown' in control && control.queryParam !== undefined) {
      const queryParam = control.queryParam;

      if (queryParam instanceof Array) allCellQueryParams.push(...queryParam.filter((queryParam) => queryParam));
      else allCellQueryParams.push(queryParam);
    }
  });
  return allCellQueryParams;
});

const isColumnControlFiltersDropDownClosed = computed<boolean>(
  () =>
    !!columnControls.value?.length &&
    columnControls.value.some((control) => 'isDropDownShown' in control && !control.isDropDownShown),
);

const isAnyControlActive = computed(
  () => columnControls.value?.length && columnControls.value?.some((control) => control.isActive),
);

const isControlInactive = (index: number): boolean => !columnControls.value?.[index]?.isActive;

const onUpdateColumnControlHandler = (control: TColumnControl, index: number) => {
  headerCell.value = {
    ...headerCell.value,
    controls: [
      ...(headerCell.value.controls?.slice(0, index) ?? []),
      control,
      ...(headerCell.value.controls?.slice(index + 1) ?? []),
    ],
  };
};

defineExpose({ queryParams });
</script>
