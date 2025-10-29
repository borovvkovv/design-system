<template>
  <div :class="['rounded-md bg-origin-padding px-5 py-4', textColor ?? textColorComputed, backGroundColor]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { HintType, type IBaseHintProps } from '@comp/components/hints/utils/models';
import { computed } from 'vue';

const props = defineProps<IBaseHintProps>();

const textColorComputed = computed(() => {
  switch (props.type) {
    case HintType.Error:
      return 'text-red-3';
    case HintType.Info:
      return 'text-white';
    default:
      return 'text-white';
  }
});

const backGroundColor = computed(() => {
  switch (props.type) {
    case HintType.Error:
      return 'bg-red-6';
    case HintType.Info:
      return 'bg-darkBlue-2';
    default:
      return 'bg-darkBlue-2';
  }
});
</script>
