<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
  >
    <line
      :class="horizontalLine1Style"
      x1="-7"
      y1="0"
      x2="7"
      y2="0"
      transform="translate(9.951045 4)"
    />
    <line
      :class="horizontalLine2Style"
      x1="-7"
      y1="0"
      x2="7"
      y2="0"
      transform="translate(9.951049 8)"
    />
    <line
      :class="verticalLine1Style"
      x1="0"
      y1="-6.5"
      x2="0"
      y2="6.5"
      transform="translate(17.040469 10.5)"
    />
    <line
      :class="horizontalLine3Style"
      x1="7"
      y1="-0"
      x2="-7"
      y2="-0"
      transform="translate(10 17.07409)"
    />
    <line
      :class="verticalLine2Style"
      x1="0"
      y1="6.5"
      x2="0"
      y2="-6.5"
      transform="translate(3 10.500001)"
    />
    <line
      :class="smallLineStyle"
      x1="0"
      y1="1"
      x2="0"
      y2="-1"
      transform="translate(6 3)"
    />
    <line
      :class="smallLineStyle"
      x1="0"
      y1="1"
      x2="0"
      y2="-1"
      transform="translate(14 3)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { IconWithAnimation } from './utils/models';

const props = withDefaults(defineProps<IconWithAnimation>(), { size: 20, animate: false, delay: 0 });

const style = useCssModule();
const animationDelay = computed(() => `${props.delay}s`);
const horizontalLine1Style = computed(() =>
  props.animate ? [style.horizontalLineAnimated, style.horizontalLineAnimated1] : [],
);
const horizontalLine2Style = computed(() =>
  props.animate ? [style.horizontalLineAnimated, style.horizontalLineAnimated2] : [],
);
const horizontalLine3Style = computed(() =>
  props.animate ? [style.horizontalLineAnimated, style.horizontalLineAnimated3] : [],
);
const verticalLine1Style = computed(() =>
  props.animate ? [style.verticalLineAnimated, style.verticalLineAnimated1] : [],
);
const verticalLine2Style = computed(() =>
  props.animate ? [style.verticalLineAnimated, style.verticalLineAnimated2] : [],
);
const smallLineStyle = computed(() => (props.animate ? style.smallLineAnimated : []));
</script>

<style module lang="scss">
@mixin animation {
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-delay: v-bind(animationDelay);
}

.horizontalLineAnimated {
  stroke-dashoffset: 14;
  stroke-dasharray: 14;
  @include animation;

  &1 {
    animation-name: calendar-1-s-line1_s_do;
  }

  &2 {
    animation-name: calendar-1-s-line2_s_do;
  }

  &3 {
    animation-name: calendar-1-s-line4_s_do;
  }
}

@keyframes calendar-1-s-line1_s_do {
  0% {
    stroke-dashoffset: 14;
  }
  20% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes calendar-1-s-line2_s_do {
  0% {
    stroke-dashoffset: 14;
  }
  50% {
    stroke-dashoffset: 14;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes calendar-1-s-line4_s_do {
  0% {
    stroke-dashoffset: 14;
  }
  50% {
    stroke-dashoffset: 14;
  }
  70% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.verticalLineAnimated {
  stroke-dashoffset: 13;
  stroke-dasharray: 13;
  @include animation;

  &1 {
    animation-name: calendar-1-s-line3_s_do;
  }

  &2 {
    animation-name: calendar-1-s-line5_s_do;
  }
}

@keyframes calendar-1-s-line3_s_do {
  0% {
    stroke-dashoffset: 13;
  }
  20% {
    stroke-dashoffset: 13;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes calendar-1-s-line5_s_do {
  0% {
    stroke-dashoffset: 13;
  }
  70% {
    stroke-dashoffset: 13;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.smallLineAnimated {
  stroke-dashoffset: 13;
  stroke-dasharray: 13;
  @include animation;
  animation-name: calendar-1-s-line6_s_do;
}

@keyframes calendar-1-s-line6_s_do {
  0% {
    stroke-dashoffset: 2;
  }
  50% {
    stroke-dashoffset: 2;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
