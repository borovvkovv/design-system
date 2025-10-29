<template>
  <button
    v-tw-merge
    :class="classes"
    :disabled="isDisabled"
    :type="type"
    @click="emit('buttonClick')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AppColor, Size } from '@comp/enums';
import type { IBaseButtonProps } from '@comp/components/buttons/utils/models';

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  color: AppColor.DarkBlue,
  size: Size.M,
  isDisabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'buttonClick'): void;
}>();
const defaultClasses = 'cursor-pointer rounded-md border-0 align-top disabled:cursor-default';

const getColorClasses = (color: AppColor) => {
  switch (color) {
    case AppColor.DarkBlue:
      return 'bg-darkBlue-2 text-white hover:bg-darkBlue-3 focus-visible:bg-darkBlue-3 active:bg-darkBlue-1 disabled:bg-darkBlue-7';
    case AppColor.Blue:
      return 'bg-blue-2 text-white hover:bg-blue-3 focus-visible:bg-blue-3 active:bg-blue-1 disabled:bg-blue-5';
    case AppColor.Red:
      return 'bg-red-3 text-white hover:bg-red-4 focus-visible:bg-red-4 active:bg-red-2 disabled:bg-red-5';
    case AppColor.Grey:
      return 'bg-grey-5 text-black-1 hover:bg-grey-4 focus-visible:bg-grey-4 active:bg-grey-3 disabled:bg-blue-7';
  }
};

const getSizeClasses = (size: Size) => {
  switch (size) {
    case Size.L:
    case Size.M:
      return 'py-[13px] text-size-5 h-12';
    case Size.S:
      return 'py-[9px] text-size-5 h-10';
    case Size.XS:
      return 'py-[5px] text-size-6 h-7';
  }
};
const classes = computed(() => [defaultClasses, getColorClasses(props.color), getSizeClasses(props.size)]);
</script>
