<template>
  <ModalSlideFromBottom
    ref="modalRef"
    @modal:close="() => emit('modal:close')"
  >
    <ModalSlider
      v-bind="props"
      @click:close="closeModal"
    >
      <slot />
    </ModalSlider>
  </ModalSlideFromBottom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalSlideFromBottom from '@comp/components/modals/ModalSlideFromBottom.vue';
import ModalSlider from './ModalSlider.vue';
import type { IModalSliderProps } from './utils/models';

const props = defineProps<IModalSliderProps>();

const emit = defineEmits<{
  (eventName: 'modal:close'): void;
}>();

const closeModal = () => {
  modalRef.value?.closeModal();
};

const modalRef = ref();
defineExpose({
  openModal: () => {
    modalRef.value?.openModal();
  },
  closeModal,
});
</script>
