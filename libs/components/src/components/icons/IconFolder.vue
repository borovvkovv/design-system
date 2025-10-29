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
      d="M13.0317 4H17V16H3V5.77778H10H10.8212L11.4054 5.20075L12.329 4.28852L10.9236 2.86555L12.329 4.28851C12.5162 4.10366 12.7687 4 13.0317 4ZM13.0317 2C12.2425 2 11.4851 2.31098 10.9236 2.86555L10 3.77778H2C1.44772 3.77778 1 4.22549 1 4.77778V16C1 17.1046 1.89543 18 3 18H17C18.1046 18 19 17.1046 19 16V3C19 2.44772 18.5523 2 18 2H13.0317ZM6 12C5.44772 12 5 12.4477 5 13C5 13.5523 5.44772 14 6 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H6Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
