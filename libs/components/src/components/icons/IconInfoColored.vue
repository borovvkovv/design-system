<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="12"
      fill="#0079C2"
    />
    <path
      d="M12 11V18"
      stroke="white"
      stroke-width="2"
    />
    <rect
      x="11.5"
      y="6.5"
      width="1"
      height="1"
      fill="#A0B3BF"
      stroke="white"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconInfoColored',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 24 });
</script>
