<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10C4 9.44772 4.44772 9 5 9H43C43.5523 9 44 9.44772 44 10V36C44 37.6569 42.6569 39 41 39H7C5.34315 39 4 37.6569 4 36V10Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24 9L24 4.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M17 45L20 39"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M31 45L28 39"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M17.5 29.5L31 19"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle
      cx="24"
      cy="24"
      r="9"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 48 });
</script>
