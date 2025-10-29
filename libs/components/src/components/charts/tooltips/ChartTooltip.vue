<template>
  <TooltipBase
    ref="tooltipBase"
    :container="container"
  >
    <span class="text-size-6 block">{{ xAxisLabel }}</span>
    <div class="mx-auto mt-2 flex w-fit flex-col gap-y-2">
      <div
        v-for="(value, valueIndex) in values"
        :key="valueIndex"
        class="flex gap-x-3"
      >
        <div
          v-if="values.length > 1"
          class="h-5 w-5"
          :style="{ 'background-color': value.color }"
          data-test="datasetColor"
        />
        <span class="text-size-6 block">{{ value.text }}</span>
      </div>
    </div>
  </TooltipBase>
</template>

<script setup lang="ts">
import TooltipBase from '@comp/components/charts/tooltips/TooltipBase.vue';
import { ref } from 'vue';
import type { IChartTooltipProps } from '@comp/components/charts/tooltips/models';

defineProps<IChartTooltipProps>();

const tooltipBase = ref();

defineExpose({
  open: (left: number = 0, top: number = 0) => tooltipBase.value?.open(left, top),
  close: () => tooltipBase.value?.close(),
});
</script>
