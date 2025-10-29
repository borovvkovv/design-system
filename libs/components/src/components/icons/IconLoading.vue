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
      stroke-linecap="round"
    />
    <animateTransform
      v-if="triggerAnimation"
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="0.8s"
      values="0 0 0; 360 0 0"
      keyTimes="0;1"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { type IconWithAnimation } from '@comp/components/icons/utils/models';

const props = withDefaults(defineProps<IconWithAnimation>(), { size: 16, animate: true, delay: 0 });

const svgProps = computed(() => {
  if (props.size <= 16) {
    return {
      viewBox: '0 0 16 16',
      path: 'M7.54654 2C4.44397 2.23602 2 4.82822 2 7.99124C2 11.3098 4.69021 14 8.00876 14C11.1718 14 13.764 11.556 14 8.45345',
    };
  } else if (props.size <= 20) {
    return {
      viewBox: '0 0 20 20',
      path: 'M9.31982 1C4.66596 1.35403 1 5.24233 1 9.98687C1 14.9647 5.03532 19 10.0131 19C14.7577 19 18.646 15.334 19 10.6802',
    };
  } else if (props.size <= 24) {
    return {
      viewBox: '0 0 24 24',
      path: 'M11.3198 3C6.66596 3.35403 3 7.24233 3 11.9869C3 16.9647 7.03532 21 12.0131 21C16.7577 21 20.646 17.334 21 12.6802',
    };
  } else {
    return {
      viewBox: '0 0 40 40',
      path: 'M18.7152 3C9.92458 3.66871 3 11.0133 3 19.9752C3 29.3777 10.6223 37 20.0248 37C28.9867 37 36.3313 30.0754 37 21.2848',
    };
  }
});

const triggerAnimation = ref(false);
watch(
  () => props.animate,
  () => {
    if (props.animate)
      setTimeout(() => {
        triggerAnimation.value = true;
      }, props.delay * 1000);
    else triggerAnimation.value = false;
  },
  { immediate: true },
);
</script>
