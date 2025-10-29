<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="svgProps.viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="svgProps.path"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type IconBase } from '@comp/components/icons/utils/models';

const props = withDefaults(defineProps<IconBase>(), { size: 8 });

const svgProps = computed(() => {
  if (props.size <= 8) {
    return {
      viewBox: '0 0 8 8',
      path: 'M8 2L1 2L4.49978 7L8 2Z',
    };
  } else {
    return {
      viewBox: '0 0 16 16',
      path: 'M13 5L3 5L7.99968 12L13 5Z',
    };
  }
});
</script>
