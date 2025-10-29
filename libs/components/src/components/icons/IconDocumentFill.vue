<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 18H4V2H10.875H16V7.3L16 18Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <line
      x1="7"
      y1="6"
      x2="13"
      y2="6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="7"
      y1="10"
      x2="10"
      y2="10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="7"
      y1="14"
      x2="11"
      y2="14"
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
