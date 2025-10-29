<template>
  <PopupInsideContainer
    ref="basePopup"
    :container="container"
    class="text-size-6 fixed w-min rounded-md bg-white p-3 shadow-md"
  >
    <span>{{ text }}</span>
  </PopupInsideContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PopupInsideContainer from './PopupInsideContainer.vue';

defineProps<{
  text: string;
  container?: HTMLElement;
}>();

const basePopup = ref();

const showPopup = (source: MouseEvent) => {
  basePopup.value?.showPopup(source.clientX, source.clientY);
};
const closePopup = computed(() => basePopup.value?.closePopup);
const throttledClosePopupAfter = computed(() => basePopup.value?.throttledClosePopupAfter);

defineExpose({
  showPopup,
  closePopup,
  throttledClosePopupAfter,
});
</script>
