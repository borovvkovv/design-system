<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.55556 15C2.12778 15 1.76157 14.8477 1.45694 14.5431C1.15231 14.2384 1 13.8722 1 13.4444V2.55556C1 2.12778 1.15231 1.76157 1.45694 1.45694C1.76157 1.15231 2.12778 1 2.55556 1H8V2.55556H2.55556V13.4444H8V15H2.55556ZM11.1111 11.8889L10.0417 10.7611L12.025 8.77778H5.66667V7.22222H12.025L10.0417 5.23889L11.1111 4.11111L15 8L11.1111 11.8889Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 16 });
</script>
