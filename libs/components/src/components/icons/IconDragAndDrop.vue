<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6.90039"
      y="6.90002"
      width="24.6"
      height="24.6"
      rx="2.5"
      stroke="#0079C2"
      stroke-dasharray="2 2"
    />
    <rect
      width="25.6"
      height="25.6"
      rx="3"
      fill="#0079C2"
    />
    <path
      d="M9.12132 9.12129L13.364 17.6066L14.467 14.467L17.6066 13.3639L9.12132 9.12129Z"
      fill="white"
      stroke="white"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconDragAndDrop',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 32 });
</script>
