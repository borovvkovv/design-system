<template>
  <ColumnFilterBase
    ref="filterBase"
    :icon="IconName.IconFilter"
    :is-active="isActive"
    :validator="unref(filterSelect?.validator)"
    :table-container="tableContainer"
    @ok:click="onOkClickHandler"
    @cross:click="onCrossClickHandler"
  >
    <FilterSelect
      ref="filterSelect"
      :column-control="columnControl"
    />
  </ColumnFilterBase>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { IconName } from '@comp/components/icons/utils/models';
import type { TColumnControlFilterSelect, IPortalTableFilterRef } from '../utils/models';
import ColumnFilterBase from './ColumnFilterBase.vue';
import FilterSelect from '../filters/FilterSelect.vue';
import { getColumnControlOption, useFilterOptions } from '../utils';
import { useQueryParam } from '../hooks/useQueryParam';

const props = defineProps<{
  columnControl: TColumnControlFilterSelect;
  tableContainer?: HTMLElement;
}>();

const router = useRouter();
const filterBase = ref();
const filterSelect = ref<IPortalTableFilterRef | undefined>();
const { addNewQueryParamToUrl, queryParam } = useQueryParam(router, props.columnControl);
const { options } = useFilterOptions(props.columnControl);
const isActive = computed<boolean>(
  () => filterBase.value?.isDropDownShown || !!getColumnControlOption(router, props.columnControl, options),
);
const isDropDownShown = computed<boolean>(() => filterBase.value?.isDropDownShown);

const onOkClickHandler = () => addNewQueryParamToUrl(filterSelect.value?.getQueryParam());
const onCrossClickHandler = () => {
  filterSelect.value?.clear();
  onOkClickHandler();
};

defineExpose({
  isActive,
  type: props.columnControl.type,
  isDropDownShown,
  queryParam,
});
</script>
