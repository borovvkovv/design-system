<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0571 15L3 15V15C3 16.6569 4.34315 18 6 18L14 18"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M12.4643 14L12.4559 16.2212C12.4522 17.2025 13.2466 18 14.2279 18V18C15.2066 18 16 17.2066 16 16.2279L16 2L12.7579 2L5 2L5 14.8485"
      stroke="currentColor"
      stroke-width="2"
    />
    <line
      x1="8"
      y1="6"
      x2="13"
      y2="6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
