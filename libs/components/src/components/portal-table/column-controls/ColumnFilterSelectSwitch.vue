<template>
  <ColumnFilterBase
    ref="filterBase"
    :icon="IconName.IconFilter"
    :is-active="isActive"
    :validator="unref(filterSelectSwitch?.validator)"
    :table-container="tableContainer"
    @ok:click="onOkClickHandler"
    @cross:click="onCrossClickHandler"
  >
    <FilterSelectSwitch
      ref="filterSelectSwitch"
      :column-control="columnControl"
    />
  </ColumnFilterBase>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { IconName } from '@comp/components/icons/utils/models';
import ColumnFilterBase from './ColumnFilterBase.vue';
import FilterSelectSwitch from '../filters/FilterSelectSwitch.vue';
import { getColumnControlOption, useFilterOptions } from '../utils';
import type { TColumnControlFilterSwitchSelect, IPortalTableFilterRef } from '../utils/models';
import { useQueryParam } from '../hooks/useQueryParam';

const props = defineProps<{
  columnControl: TColumnControlFilterSwitchSelect;
  tableContainer?: HTMLElement;
}>();

const router = useRouter();
const filterBase = ref();
const filterSelectSwitch = ref<IPortalTableFilterRef | undefined>();
const { addNewQueryParamToUrl, queryParam } = useQueryParam(router, props.columnControl);
const { options } = useFilterOptions(props.columnControl);
const isActive = computed<boolean>(
  () => filterBase.value?.isDropDownShown || !!getColumnControlOption(router, props.columnControl, options),
);
const isDropDownShown = computed<boolean>(() => filterBase.value?.isDropDownShown);

const onOkClickHandler = () => addNewQueryParamToUrl(filterSelectSwitch.value?.getQueryParam());
const onCrossClickHandler = () => {
  filterSelectSwitch.value?.clear();
  onOkClickHandler();
};

defineExpose({
  isActive,
  type: props.columnControl.type,
  isDropDownShown,
  queryParam,
});
</script>
