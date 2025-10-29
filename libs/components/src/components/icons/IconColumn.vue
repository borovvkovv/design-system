<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 2.25C5 2.11193 5.11193 2 5.25 2H8.75C8.88807 2 9 2.11193 9 2.25V5.75C9 5.88807 8.88807 6 8.75 6H5.25C5.11193 6 5 5.88807 5 5.75V2.25Z"
      fill="currentColor"
    />
    <path
      d="M11 2.25C11 2.11193 11.1119 2 11.25 2H14.75C14.8881 2 15 2.11193 15 2.25V5.75C15 5.88807 14.8881 6 14.75 6H11.25C11.1119 6 11 5.88807 11 5.75V2.25Z"
      fill="currentColor"
    />
    <path
      d="M5 8.25C5 8.11193 5.11193 8 5.25 8H8.75C8.88807 8 9 8.11193 9 8.25V11.75C9 11.8881 8.88807 12 8.75 12H5.25C5.11193 12 5 11.8881 5 11.75V8.25Z"
      fill="currentColor"
    />
    <path
      d="M11 8.25C11 8.11193 11.1119 8 11.25 8H14.75C14.8881 8 15 8.11193 15 8.25V11.75C15 11.8881 14.8881 12 14.75 12H11.25C11.1119 12 11 11.8881 11 11.75V8.25Z"
      fill="currentColor"
    />
    <path
      d="M5 14.25C5 14.1119 5.11193 14 5.25 14H8.75C8.88807 14 9 14.1119 9 14.25V17.75C9 17.8881 8.88807 18 8.75 18H5.25C5.11193 18 5 17.8881 5 17.75V14.25Z"
      fill="currentColor"
    />
    <path
      d="M11 14.25C11 14.1119 11.1119 14 11.25 14H14.75C14.8881 14 15 14.1119 15 14.25V17.75C15 17.8881 14.8881 18 14.75 18H11.25C11.1119 18 11 17.8881 11 17.75V14.25Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
