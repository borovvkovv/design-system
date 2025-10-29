<template>
  <ColumnFilterBase
    ref="filterBase"
    :icon="IconName.IconFilter"
    :is-active="isActive"
    :validator="unref(filterDateRange?.validator)"
    :table-container="tableContainer"
    @ok:click="onOkClickHandler"
    @cross:click="onCrossClickHandler"
  >
    <FilterDateRange
      ref="filterDateRange"
      :column-control="columnControl"
    />
  </ColumnFilterBase>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';
import { useRouter } from 'vue-router';
import { IconName } from '@comp/components/icons/utils/models';
import type { IPortalTableFilterRef, TColumnControlFilterDateRange } from '../utils/models';
import ColumnFilterBase from './ColumnFilterBase.vue';
import { getDateRangeFromQueryParams, getInitialQueryParams } from '../utils/filterDateRangeUtils';
import FilterDateRange from '../filters/FilterDateRange.vue';
import { useQueryParamRange } from '../hooks/useQueryParamRange';

const props = defineProps<{
  columnControl: TColumnControlFilterDateRange;
  tableContainer?: HTMLElement;
}>();

const router = useRouter();
const filterBase = ref();
const filterDateRange = ref<IPortalTableFilterRef | undefined>();
const { addNewQueryParamToUrl, queryParamMin, queryParamMax } = useQueryParamRange(router, props.columnControl);
const isActive = computed<boolean>(
  () =>
    filterBase.value?.isDropDownShown ||
    Object.values(getDateRangeFromQueryParams(queryParamMin.value, queryParamMax.value)).some(
      (value) => value !== undefined,
    ),
);
const isDropDownShown = computed<boolean>(() => filterBase.value?.isDropDownShown);
const queryParams = computed(() => [queryParamMin.value, queryParamMax.value]);

const onOkClickHandler = () => addNewQueryParamToUrl(filterDateRange.value?.getQueryParam());
const onCrossClickHandler = () => {
  filterDateRange.value?.clear();
  onOkClickHandler();
};

onMounted(() => {
  const initialQueryParams = getInitialQueryParams(props.columnControl, queryParamMin, queryParamMax);

  if (initialQueryParams) addNewQueryParamToUrl(initialQueryParams);
});

defineExpose({
  isActive,
  type: props.columnControl.type,
  isDropDownShown,
  queryParam: queryParams,
});
</script>
