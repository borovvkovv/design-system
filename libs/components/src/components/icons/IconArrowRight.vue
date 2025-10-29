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
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type IconBase } from '@comp/components/icons/utils/models';

const props = withDefaults(defineProps<IconBase>(), { size: 16 });

const svgProps = computed(() => {
  if (props.size <= 16) {
    return {
      viewBox: '0 0 16 16',
      path: 'M5 2L10 8L5 14',
    };
  } else if (props.size <= 20) {
    return {
      viewBox: '0 0 20 20',
      path: 'M7 3L14 10L7 17',
    };
  } else {
    return {
      viewBox: '0 0 32 32',
      path: 'M12 7L21 16L12 25',
    };
  }
});
</script>
