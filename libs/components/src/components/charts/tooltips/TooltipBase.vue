<template>
  <PopupInsideContainer
    ref="popupInsideContainer"
    :container="container"
    :to-top-from-pointer-px="10"
    :translate-x-percent="-50"
    :class="['bg-darkBlue-2 absolute z-50 rounded-md p-3', 'text-size-6 text-white', 'flex flex-col']"
  >
    <slot />
  </PopupInsideContainer>
</template>

<script setup lang="ts">
import PopupInsideContainer from '@comp/components/popup/PopupInsideContainer.vue';
import { ref } from 'vue';

defineProps<{
  container?: HTMLElement;
}>();

const popupInsideContainer = ref();
const open = (left: number = 0, top: number = 0) => popupInsideContainer.value?.showPopup(left, top);
const close = () => popupInsideContainer.value?.closePopup();

defineExpose({
  open,
  close,
});
</script>
