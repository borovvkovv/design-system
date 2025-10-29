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
      fill="#F0535C"
    />
    <path
      d="M16.4375 8L8 16.4375"
      stroke="white"
      stroke-width="2"
      stroke-linecap="square"
    />
    <path
      d="M8 8L16.4375 16.4375"
      stroke="white"
      stroke-width="2"
      stroke-linecap="square"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconFailure',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 24 });
</script>
