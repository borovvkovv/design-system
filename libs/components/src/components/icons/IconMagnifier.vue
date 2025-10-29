<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 16C5.13478 16 2 12.8662 2 9C2 5.13383 5.13478 2 9 2C12.8662 2 16 5.13383 16 9C16 12.8662 12.8662 16 9 16Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.5 14.5L17 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconMagnifier',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
