<template>
  <LinesSkeleton
    v-if="isLoading"
    v-bind="{ ...calculatedLoading, ...attrs }"
  />
  <IconTextStub
    v-else-if="showNoDataStub && isNoData"
    :icon="IconName.IconEmptyGraph"
    :texts="noDataStubTexts"
    v-bind="attrs"
  />
  <slot
    v-else-if="!isNoData"
    v-bind="attrs"
  />
</template>

<script setup lang="ts" generic="T">
import LinesSkeleton from '@comp/components/skeletons/LinesSkeleton.vue';
import type { LineSkeletonProps } from '@comp/components/skeletons/utils/models';
import type { AppTableModelProps } from '@comp/components/table/utils/models';
import { computed, useAttrs, watch, ref } from 'vue';
import { getTableModelLoadingConfig } from '@comp/components/table/utils/loading';
import IconTextStub from '@comp/components/stubs/IconTextStub.vue';
import { IconName } from '@comp/components/icons/utils/models';
import type { PortalTableModelProps } from '@comp/components/portal-table-model/utils/models';

const props = withDefaults(defineProps<AppTableModelProps<T> | PortalTableModelProps<T>>(), {
  loadingConfig: undefined,
  showNoDataStub: false,
  noDataStubTexts: () => ['Для выбранных настроек данные недоступны.', 'Выберите другие настройки в фильтре.'],
});

const attrs = useAttrs();
const calculatedLoading = ref<LineSkeletonProps | undefined>(props.loadingConfig);
const isNoData = computed(() => (props.modelValue?.rows?.model.length ?? 0) === 0);

watch(
  () => props.modelValue,
  () => {
    if (!props.loadingConfig && props.modelValue) {
      calculatedLoading.value = getTableModelLoadingConfig(props.modelValue.rows);
    }
  },
  {
    immediate: true,
  },
);
</script>
