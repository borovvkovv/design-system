<template>
  <ColumnFilterBase
    ref="filterBase"
    :icon="IconName.IconFilter"
    :is-active="isActive"
    :validator="unref(filterMultiSelectSwitch?.validator)"
    :table-container="tableContainer"
    @ok:click="onOkClickHandler"
    @cross:click="onCrossClickHandler"
  >
    <FilterMultiSelectSwitch
      ref="filterMultiSelectSwitch"
      :column-control="columnControl"
    />
  </ColumnFilterBase>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { IconName } from '@comp/components/icons/utils/models';
import type { IPortalTableFilterRef, TColumnControlFilterSwitchMultiSelect } from '../utils/models';
import ColumnFilterBase from './ColumnFilterBase.vue';
import FilterMultiSelectSwitch from '../filters/FilterMultiSelectSwitch.vue';
import { useFilterOptions } from '../utils';
import { getColumnControlOptionsForMultiSelect } from '../utils/filterMultiSelectUtils';
import { useQueryParam } from '../hooks/useQueryParam';

const props = defineProps<{
  columnControl: TColumnControlFilterSwitchMultiSelect;
  tableContainer?: HTMLElement;
}>();

const router = useRouter();
const filterBase = ref();
const filterMultiSelectSwitch = ref<IPortalTableFilterRef | undefined>();
const { options } = useFilterOptions(props.columnControl);
const { addNewQueryParamToUrl, queryParam } = useQueryParam(router, props.columnControl);
const isActive = computed<boolean>(
  () =>
    filterBase.value?.isDropDownShown ||
    (getColumnControlOptionsForMultiSelect(router, props.columnControl, options)?.length ?? 0) > 0,
);
const isDropDownShown = computed<boolean>(() => filterBase.value?.isDropDownShown);

const onOkClickHandler = () => addNewQueryParamToUrl(filterMultiSelectSwitch.value?.getQueryParam());
const onCrossClickHandler = () => {
  filterMultiSelectSwitch.value?.clear();
  onOkClickHandler();
};

defineExpose({
  isActive,
  type: props.columnControl.type,
  isDropDownShown,
  queryParam,
});
</script>
