<template>
  <div class="mb-10 w-full border-0 px-4 text-center md:px-6">
    <span class="text-size-4 mb-8 block">{{ xAxisLabel }}</span>
    <span class="text-size-6 text-grey-1 mb-2 block">{{ tooltipTitle }}</span>
    <div class="mx-auto flex w-fit flex-col gap-y-3">
      <div
        v-for="(value, valueIndex) in values"
        :key="valueIndex"
        class="flex gap-x-3"
      >
        <div
          v-if="values.length > 1"
          class="h-8 w-8"
          :style="{ 'background-color': value.color }"
          data-test="datasetColor"
        />
        <h1>{{ value.text }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChartTooltipModalBodyProps } from '@comp/components/charts/tooltips/models';

defineProps<IChartTooltipModalBodyProps>();
</script>
