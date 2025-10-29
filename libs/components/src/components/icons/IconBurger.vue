<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 5H24"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M0 12H24"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M0 19H24"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IconBase } from './utils/models';

withDefaults(defineProps<IconBase>(), { size: 24 });
</script>
