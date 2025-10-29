<template>
  <FilterSelectSwitch
    v-if="columnControl.type === 'filterSelectSwitch'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
  <FilterMultiSelectSwitch
    v-else-if="columnControl.type === 'filterMultiSelectSwitch'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
  <FilterNumberRange
    v-else-if="columnControl.type === 'filterNumberRange'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
  <FilterDateRange
    v-else-if="columnControl.type === 'filterDateRange'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
  <FilterSelect
    v-else-if="columnControl.type === 'filterSelect'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
  <FilterText
    v-else-if="columnControl.type === 'filterText'"
    ref="filterRef"
    :column-control="columnControl"
    :column-control-index="columnControlIndex"
    :header-cell-index="headerCellIndex"
  />
</template>

<script setup lang="ts">
import type {
  IPortalTableFilterProps,
  IPortalTableFilterRef,
  PortalTableFilter,
} from '@comp/components/portal-table/utils/models';
import { computed, ref, unref } from 'vue';
import FilterNumberRange from '@comp/components/portal-table/filters/FilterNumberRange.vue';
import FilterSelect from '@comp/components/portal-table/filters/FilterSelect.vue';
import FilterSelectSwitch from '@comp/components/portal-table/filters/FilterSelectSwitch.vue';
import FilterDateRange from '@comp/components/portal-table/filters/FilterDateRange.vue';
import FilterMultiSelectSwitch from '@comp/components/portal-table/filters/FilterMultiSelectSwitch.vue';
import FilterText from '@comp/components/portal-table/filters/FilterText.vue';

defineProps<IPortalTableFilterProps<PortalTableFilter>>();

const filterRef = ref<IPortalTableFilterRef>();
const typeExposed = computed(() => filterRef.value?.type);
const resetExposed = computed(() => filterRef.value?.reset);
const clearExposed = computed(() => filterRef.value?.clear);
const validatorExposed = computed(() => unref(filterRef.value?.validator));
const columnControlIndexExposed = computed(() => filterRef.value?.columnControlIndex);
const headerCellIndexExposed = computed(() => filterRef.value?.headerCellIndex);
const isErrorExposed = computed(() => unref(filterRef.value?.isError));
const getQueryParamExposed = computed(() => filterRef.value?.getQueryParam);

defineExpose({
  type: typeExposed,
  reset: resetExposed,
  clear: clearExposed,
  validator: validatorExposed,
  columnControlIndex: columnControlIndexExposed,
  headerCellIndex: headerCellIndexExposed,
  isError: isErrorExposed,
  getQueryParam: getQueryParamExposed,
});
</script>
