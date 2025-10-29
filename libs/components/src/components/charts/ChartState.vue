<template>
  <BaseStub
    v-if="isLoading"
    class="border-blueGrey-4 rounded-md border"
  >
    <AppLoading />
  </BaseStub>
  <IconTextStub
    v-else-if="isNoData"
    :icon="IconName.IconEmptyGraph"
    :texts="texts"
  />
  <slot v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppLoading from '@comp/components/AppLoading.vue';
import type { AppChartProps } from '@comp/components/charts/utils/models';
import { IconName } from '@comp/components/icons/utils/models';
import BaseStub from '@comp/components/stubs/BaseStub.vue';
import IconTextStub from '@comp/components/stubs/IconTextStub.vue';
import { isNoDataForGraph } from '@comp/components/charts/utils';

const props = withDefaults(
  defineProps<{
    chartData: AppChartProps | null;
    isLoading: boolean;
    texts?: string[];
  }>(),
  {
    texts: () => [],
  },
);

const isNoData = computed(() => isNoDataForGraph(props.chartData));
</script>
