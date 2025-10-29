<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="svgProps.viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="svgProps.circle.c"
      :cy="svgProps.circle.c"
      :r="svgProps.circle.r"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      :d="svgProps.path"
      stroke="currentColor"
      stroke-width="2"
    />
    <rect
      :x="svgProps.rect.x"
      :y="svgProps.rect.y"
      width="2"
      height="2"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconBase } from './utils/models';

const props = withDefaults(defineProps<IconBase>(), { size: 20 });

const svgProps = computed(() => {
  if (props.size <= 16)
    return {
      viewBox: '0 0 16 16',
      circle: {
        c: 8,
        r: 7,
      },
      path: 'M8 7V12',
      rect: {
        x: 7,
        y: 4,
      },
    };
  else if (props.size <= 20)
    return {
      viewBox: '0 0 20 20',
      circle: {
        c: 10,
        r: 8,
      },
      path: 'M10 9V15',
      rect: {
        x: 9,
        y: 5,
      },
    };

  return {
    viewBox: '0 0 24 24',
    circle: {
      c: 12,
      r: 9,
    },
    path: 'M12 11V17',
    rect: {
      x: 11,
      y: 7,
    },
  };
});
</script>
