<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  ></svg>
</template>

<script setup lang="ts">
import type { IconBase } from './utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
