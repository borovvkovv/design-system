<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="3.99988"
      cy="4"
      r="2"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconMarker',
});
</script>

<script setup lang="ts">
withDefaults(defineProps<IconBase>(), { size: 8 });
</script>
