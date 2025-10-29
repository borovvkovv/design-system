<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.66667 13V11.6667H9.33333V13H6.66667ZM4 8.66667V7.33333H12V8.66667H4ZM2 4.33333V3H14V4.33333H2Z"
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
