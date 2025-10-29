<template>
  <BasePopup
    ref="basePopup"
    class="text-size-6 shadow-4 fixed z-50 rounded-md bg-white px-4 py-2.5"
    :to-right-from-pointer-px="16"
  >
    <span>{{ text }}</span>
  </BasePopup>
</template>

<script setup lang="ts">
import { BasePopup } from '@libs/components/popup';
import { ref } from 'vue';

defineProps<{
  text: string;
}>();

const basePopup = ref();

const showPopup = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).getBoundingClientRect();
  basePopup.value?.showPopup(target.right, target.top);
};
const closePopup = () => basePopup.value?.closePopup();

defineExpose({
  showPopup,
  closePopup,
});
</script>
