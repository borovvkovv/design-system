<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="size / 2"
      :cy="size / 2"
      :r="size / 2"
      :fill="fill"
    />
    <text
      :class="style.text"
      :x="size / 2"
      :y="size / 2"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="currentColor"
    >
      {{ svgText }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { IconMarkerNumberProps } from './utils/models';

const style = useCssModule();
const props = withDefaults(defineProps<IconMarkerNumberProps>(), {
  size: 32,
  number: 10,
  fontSize: 'auto',
  fontWeight: 500,
  fill: '#eff3f5',
});

const svgText = computed(() => {
  if (props.number >= 100) {
    return '99+';
  }

  return props.number;
});
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.text {
  font-style: normal;
  font-weight: v-bind('fontWeight');
  font-size: v-bind('fontSize');
  line-height: v-bind('size') + 'px';
}
</style>
