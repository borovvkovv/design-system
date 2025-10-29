<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="10"
      fill="currentColor"
    />
    <path
      d="M6.53592 8L13.4641 12"
      stroke="#EFF3F5"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 13.4642L12 6.53601"
      stroke="#EFF3F5"
      stroke-width="2"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconPlusFillRotate',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
