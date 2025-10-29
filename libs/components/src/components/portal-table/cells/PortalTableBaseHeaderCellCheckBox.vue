<template>
  <AppTableCellCheckBox
    :model-value="headerCellCheckBox"
    @update:model-value="updateCheckBoxesOnRows"
  />
</template>

<script setup lang="ts" generic="T">
import { computed, watch } from 'vue';
import type { TPortalHeaderCellCheckBox, TPortalRow } from '@comp/components/portal-table/utils/models';
import AppTableCellCheckBox from '@comp/components/table/cells/AppTableCellCheckBox.vue';
import type { TCellCheckBox } from '@comp/components/table/utils/models';
import { checkAnyCheckBoxesOnRowsChecked, isAllCheckBoxesOnRowsChecked } from '../utils/checkBoxCellUtils';

const headerCellCheckBox = defineModel<TPortalHeaderCellCheckBox<T>>('headerCellCheckBox', { required: true });
const rows = defineModel<TPortalRow<T>[]>('rows', { required: true });

const updateCheckBoxesOnRows = (newCheckBox: TCellCheckBox) => {
  rows.value = headerCellCheckBox.value.onCheck(newCheckBox.isChecked, rows.value);
};

const checkedSomeRows = computed<boolean>(() => checkAnyCheckBoxesOnRowsChecked(rows.value));
const checkedAllRows = computed<boolean>(() => isAllCheckBoxesOnRowsChecked(rows.value));

watch([checkedSomeRows, checkedAllRows], () => {
  headerCellCheckBox.value = {
    ...headerCellCheckBox.value,
    isChecked: checkedAllRows.value ? true : checkedSomeRows.value ? null : false,
  };
});
</script>
