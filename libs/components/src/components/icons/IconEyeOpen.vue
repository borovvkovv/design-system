<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 9.77778C2 9.77778 4.93333 4 10 4C15.0667 4 18 9.77778 18 9.77778C18 9.77778 15.0667 15.5556 10 15.5556C4.93333 15.5556 2 9.77778 2 9.77778Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99957 12C11.2269 12 12.2218 11.0051 12.2218 9.77776C12.2218 8.55046 11.2269 7.55554 9.99957 7.55554C8.77227 7.55554 7.77734 8.55046 7.77734 9.77776C7.77734 11.0051 8.77227 12 9.99957 12Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
