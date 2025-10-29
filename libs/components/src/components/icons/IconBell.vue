<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="path"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 19.0053C15.1727 20.8557 13.6487 21.9947 12 21.9947C10.3513 21.9947 8.82728 20.8557 8 19.0053"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      v-if="indicated"
      cx="17"
      cy="5"
      r="4"
      fill="#F0535C"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconBellProps } from './utils/models';

const props = withDefaults(defineProps<IconBellProps>(), { size: 24, indicated: false });

const path = computed(() =>
  props.indicated
    ? 'M17.3333 9.6C17.3333 6.50721 14.9455 4 12 4C9.05448 4 6.66667 6.50721 6.66667 9.6C6.66667 16.1333 4 18 4 18H20C20 18 17.3333 16.1333 17.3333 9.6'
    : 'M18 8.4C18 4.86538 15.3137 2 12 2C8.68629 2 6 4.86538 6 8.4C6 15.8667 3 18 3 18H21C21 18 18 15.8667 18 8.4',
);
</script>
