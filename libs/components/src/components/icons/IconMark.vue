<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 4L5.5 12.5L1.5 8.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconMark',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 16 });
</script>
