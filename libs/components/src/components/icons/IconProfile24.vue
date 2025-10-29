<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 22C20 18.5 16.4183 15 12 15C7.58172 15 4 18.5 4 22"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="12"
      cy="6"
      r="4"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 24 });
</script>
