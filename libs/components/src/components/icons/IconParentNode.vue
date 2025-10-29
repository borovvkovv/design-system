<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10"
      y="11"
      width="2"
      height="8"
      fill="currentColor"
    />
    <circle
      cx="11"
      cy="8"
      r="3"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17 17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19L5 19C4.44772 19 4 18.5523 4 18C4 17.4477 4.44772 17 5 17L17 17Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'IconParentNode',
});
</script>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    required: false,
    default: 24,
  },
});
</script>
