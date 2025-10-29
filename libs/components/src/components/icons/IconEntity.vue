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
      d="M17 3H3L3 13H17V3ZM3 1C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H9V16H7C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18H9H11H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H11V15H17C18.1046 15 19 14.1046 19 13V3C19 1.89543 18.1046 1 17 1H3Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
