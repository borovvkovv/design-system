<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 16H10H18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 4H18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 10H18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 4C8 5.10369 7.10466 6 5.99824 6C4.89358 6 4 5.10369 4 4C4 2.89455 4.89358 2 5.99824 2C7.10466 2 8 2.89455 8 4Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 16C8 17.1037 7.10466 18 5.99824 18C4.89358 18 4 17.1037 4 16C4 14.8946 4.89358 14 5.99824 14C7.10466 14 8 14.8946 8 16Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 10C16 11.1037 15.1047 12 13.9982 12C12.8936 12 12 11.1037 12 10C12 8.89455 12.8936 8 13.9982 8C15.1047 8 16 8.89455 16 10Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconParameters',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
