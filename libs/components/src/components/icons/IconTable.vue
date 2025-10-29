<template>
  <svg
    id="tableIcon"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 69 69"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    stroke="currentColor"
  >
    <path
      :class="tableIconCoverStyle"
      d="M3.5,10c0-3.58985,2.91015-6.5,6.5-6.5h49c3.5898,0,6.5,2.91015,6.5,6.5v49c0,3.5898-2.9102,6.5-6.5,6.5h-49c-3.58985,0-6.5-2.9102-6.5-6.5c0,0,0-34.3,0-49"
      fill="none"
    />
    <path
      :class="tableIconTopStyle"
      d="M10,3.5h49c3.5898,0,6.5,2.91015,6.5,6.5v0h-62v0c0-3.58985,2.91015-6.5,6.5-6.5Z"
      fill="currentColor"
      stroke-width="7"
      stroke-opacity="0"
      stroke-dasharray="0"
    />
    <line
      :class="tableIconVerticalLineStyle"
      x1="27.6504"
      y1="3.44922"
      x2="27.6504"
      y2="66.6992"
      fill="none"
      stroke-width="7"
    />
    <line
      :class="tableIconHorizontalLineStyle"
      x1="66.7002"
      y1="42.4492"
      x2="4.60019"
      y2="42.4492"
      fill="none"
      stroke-width="7"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { IconWithAnimation } from './utils/models';

const props = withDefaults(defineProps<IconWithAnimation>(), { size: 69, animate: false, delay: 0 });

const style = useCssModule();
const animationDelay = computed(() => `${props.delay}s`);
const tableIconCoverStyle = computed(() => (props.animate ? style.tableIconCoverAnimated : style.tableIconCoverStatic));
const tableIconTopStyle = computed(() => (props.animate ? style.tableIconTopAnimated : style.tableIconTopStatic));
const tableIconVerticalLineStyle = computed(() =>
  props.animate ? style.tableIconVerticalLineAnimated : style.tableIconVerticalLineStatic,
);
const tableIconHorizontalLineStyle = computed(() =>
  props.animate ? style.tableIconHorizontalLineAnimated : style.tableIconHorizontalLineStatic,
);
</script>

<style lang="scss" module>
.tableIconCoverStatic {
  stroke-width: 7;
}

.tableIconCoverAnimated {
  animation-name: tableicon-u-cover_s_w, tableicon-u-cover_s_do;
  animation-duration: 1000ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 236.846389;
  stroke-dasharray: 236.846389;
}
@keyframes tableicon-u-cover_s_w {
  0% {
    stroke-width: 1;
  }
  60% {
    stroke-width: 7;
  }
  100% {
    stroke-width: 7;
  }
}
@keyframes tableicon-u-cover_s_do {
  0% {
    stroke-dashoffset: 236.846389;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.tableIconTopStatic {
  d: path('M10,3.5L59,3.5C62.5898,3.5,65.5,6.41015,65.5,10L65.5,19.5L3.5,19.5L3.5,10C3.5,6.41015,6.41015,3.5,10,3.5Z');
  fill-opacity: 1;
}
.tableIconTopAnimated {
  animation-name: tableicon-u-top__m, tableicon-u-top_f_o;
  animation-duration: 1000ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-delay: v-bind(animationDelay);
  fill-opacity: 0;
}
@keyframes tableicon-u-top__m {
  0% {
    d: path('M10,3.5L59,3.5C62.5898,3.5,65.5,6.41015,65.5,10L65.5,10L3.5,10L3.5,10C3.5,6.41015,6.41015,3.5,10,3.5Z');
  }
  50% {
    d: path('M10,3.5L59,3.5C62.5898,3.5,65.5,6.41015,65.5,10L65.5,10L3.5,10L3.5,10C3.5,6.41015,6.41015,3.5,10,3.5Z');
  }
  100% {
    d: path(
      'M10,3.5L59,3.5C62.5898,3.5,65.5,6.41015,65.5,10L65.5,19.5L3.5,19.5L3.5,10C3.5,6.41015,6.41015,3.5,10,3.5Z'
    );
  }
}
@keyframes tableicon-u-top_f_o {
  0% {
    fill-opacity: 0;
  }
  50% {
    fill-opacity: 0;
  }
  100% {
    fill-opacity: 1;
  }
}

.tableIconVerticalLineStatic {
}
.tableIconVerticalLineAnimated {
  animation: tableicon-u-wline_s_do 1000ms linear 1 normal forwards;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 63.3;
  stroke-dasharray: 63.3;
}
@keyframes tableicon-u-wline_s_do {
  0% {
    stroke-dashoffset: 63.3;
  }
  50% {
    stroke-dashoffset: 63.3;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.tableIconHorizontalLineStatic {
}
.tableIconHorizontalLineAnimated {
  animation: tableicon-u-hline_s_do 1000ms linear 1 normal forwards;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 62.2;
  stroke-dasharray: 62.2;
}
@keyframes tableicon-u-hline_s_do {
  0% {
    stroke-dashoffset: 62.2;
  }
  50% {
    stroke-dashoffset: 62.2;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
