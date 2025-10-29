<template>
  <TooltipBase
    ref="tooltipBase"
    :container="container"
  >
    <span
      v-for="(text, index) in texts"
      :key="index"
    >
      {{ text }}
    </span>
  </TooltipBase>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TooltipBase from '@comp/components/charts/tooltips/TooltipBase.vue';

defineProps<{
  texts: Array<string>;
  container?: HTMLElement;
}>();

const tooltipBase = ref();

defineExpose({
  open: (left: number = 0, top: number = 0) => tooltipBase.value?.open(left, top),
  close: () => tooltipBase.value?.close(),
});
</script>
