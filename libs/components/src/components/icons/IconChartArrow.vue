<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      :class="mainLineStyle"
      d="M2,15L8.4,8.33333l3.2,3.33337L18,5m0,0m0,0"
      transform="translate(-.04 0)"
    />
    <line
      :class="leftLineStyle"
      x1="0"
      y1="-3.247061"
      x2="0"
      y2="0.121363"
      transform="translate(17.96 8.211967)"
    />
    <line
      :class="rightLineStyle"
      x1="0.445932"
      y1="0"
      x2="-2.92"
      y2="0"
      transform="translate(17.514068 4.964906)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { type IconWithAnimation } from '@comp/components/icons/utils/models';

const props = withDefaults(defineProps<IconWithAnimation>(), { size: 20, animate: false, delay: 0 });

const style = useCssModule();
const mainLineStyle = computed(() => (props.animate ? style.mainLineAnimate : style.mainLineStatic));
const rightLineStyle = computed(() => (props.animate ? style.rightLineAnimate : style.rightLineStatic));
const leftLineStyle = computed(() => (props.animate ? style.leftLineAnimate : style.leftLineStatic));
const animationDelay = computed(() => `${props.delay}s`);
</script>

<style lang="scss" module>
.mainLineStatic {
}
.mainLineAnimate {
  animation: charticon-u-mainline_s_do 1000ms linear 1 normal forwards;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 23.103684;
  stroke-dasharray: 23.103684;
}
@keyframes charticon-u-mainline_s_do {
  0% {
    stroke-dashoffset: 23.103684;
  }
  80% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.leftLineStatic {
}
.leftLineAnimate {
  animation: charticon-s-line1_s_do 1000ms linear 1 normal forwards;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 3.368424;
  stroke-dasharray: 3.368424;
}
@keyframes charticon-s-line1_s_do {
  0% {
    stroke-dashoffset: 3.368424;
  }
  80% {
    stroke-dashoffset: 3.368424;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.rightLineStatic {
}
.rightLineAnimate {
  animation: charticon-s-line2_s_do 1000ms linear 1 normal forwards;
  animation-delay: v-bind(animationDelay);
  stroke-dashoffset: 3.365932;
  stroke-dasharray: 3.365932;
}
@keyframes charticon-s-line2_s_do {
  0% {
    stroke-dashoffset: 3.365932;
  }
  80% {
    stroke-dashoffset: 3.365932;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
