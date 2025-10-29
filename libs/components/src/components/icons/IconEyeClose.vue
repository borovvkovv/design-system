<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 7C18 7 15.0667 12.3333 10 12.3333C4.93333 12.3333 2 7 2 7"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.7773 12.3334L12.6662 14.1112"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.333 10.5555L17.1108 12.3333"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.2219 12.3334L7.33301 14.1112"
      stroke="currentColor"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.66656 10.5555L2.88879 12.3333"
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
