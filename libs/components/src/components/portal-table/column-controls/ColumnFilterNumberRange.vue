<template>
  <ColumnFilterBase
    ref="filterBase"
    :icon="IconName.IconFilter"
    :is-active="isActive"
    :validator="unref(filterNumberRange?.validator)"
    :table-container="tableContainer"
    @ok:click="onOkClickHandler"
    @cross:click="onCrossClickHandler"
  >
    <FilterNumberRange
      ref="filterNumberRange"
      :column-control="columnControl"
    />
  </ColumnFilterBase>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { IconName } from '@comp/components/icons/utils/models';
import type { IPortalTableFilterRef, TColumnControlFilterNumberRange } from '../utils/models';
import ColumnFilterBase from './ColumnFilterBase.vue';
import FilterNumberRange from '../filters/FilterNumberRange.vue';
import { getNumberRangeFromUrl } from '../utils/filterNumberRangeUtils';
import { useQueryParamRange } from '../hooks/useQueryParamRange';

const props = defineProps<{
  columnControl: TColumnControlFilterNumberRange;
  tableContainer?: HTMLElement;
}>();

const router = useRouter();
const filterBase = ref();
const filterNumberRange = ref<IPortalTableFilterRef | undefined>();
const { addNewQueryParamToUrl, queryParamMin, queryParamMax } = useQueryParamRange(router, props.columnControl);
const isActive = computed<boolean>(
  () =>
    filterBase.value?.isDropDownShown ||
    Object.values(getNumberRangeFromUrl(router, props.columnControl)).some((value) => value !== undefined),
);
const isDropDownShown = computed<boolean>(() => filterBase.value?.isDropDownShown);
const queryParams = computed(() => [queryParamMin.value, queryParamMax.value]);

const onOkClickHandler = () => addNewQueryParamToUrl(filterNumberRange.value?.getQueryParam());
const onCrossClickHandler = () => {
  filterNumberRange.value?.clear();
  onOkClickHandler();
};

defineExpose({
  isActive,
  type: props.columnControl.type,
  isDropDownShown,
  queryParam: queryParams,
});
</script>
