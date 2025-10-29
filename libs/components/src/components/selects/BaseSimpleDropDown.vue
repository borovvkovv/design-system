<template>
  <div
    :class="['cursor-pointer', isDisabled && 'pointer-events-none', attrs.class]"
    @click="() => setDropDownVisibility(!isDropDownShown)"
  >
    <slot
      name="title"
      :is-drop-down-shown="isDropDownShown"
      :set-drop-down-visibility="setDropDownVisibility"
    />
  </div>
  <div
    ref="dropDownRef"
    :class="['h-0 overflow-hidden', 'transition-height duration-300']"
    data-test="dropDown"
    @transitionend="onDropDownTransitionEndHandler"
  >
    <slot name="dropDown" />
  </div>
  <slot name="border" />
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import type { IBaseSimpleDropDownProps } from '@comp/components/selects/utils/models';

withDefaults(defineProps<IBaseSimpleDropDownProps>(), {
  isDisabled: false,
});

const attrs = useAttrs();
const isDropDownShown = ref(false);
const dropDownRef = ref<HTMLElement | undefined>();

const setDropDownVisibility = (isShown: boolean) => {
  isDropDownShown.value = isShown;

  if (!dropDownRef.value) return;

  dropDownRef.value.style.height = `${dropDownRef.value.scrollHeight}px`;

  setTimeout(() => {
    if (!isDropDownShown.value && dropDownRef.value) dropDownRef.value.style.height = '0px';
  }, 0);
};

const onDropDownTransitionEndHandler = () => {
  if (dropDownRef.value && isDropDownShown.value) {
    dropDownRef.value.style.height = 'auto';
  }
};

defineExpose({
  isDropDownShown,
  setDropDownVisibility,
});
</script>
