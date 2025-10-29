<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 13 V11.6667 H14 V13 H2Z M4 8.66667 V7.33333 H12 V8.66667 H4Z M6.66667 4.33333 V3 H9.33333 V4.33333 H6.66667Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IconBase } from './utils/models';

withDefaults(defineProps<IconBase>(), {
  size: 16,
});
</script>
