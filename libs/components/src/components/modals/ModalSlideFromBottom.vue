<template>
  <ModalWithSwipe
    :swipe-field="modalContainer"
    :swipe-start-field="modalContainer"
    @swiped:down="closeModal"
  >
    <AppModalBase
      ref="modalRef"
      position="bottom"
      enter="duration-300 ease-out"
      enter-from="opacity-0 translate-y-full"
      enter-to="opacity-100 translate-y-0"
      leave="duration-200 ease-in"
      leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 translate-y-full"
      :with-close-cross="false"
      v-bind="attrs"
      class="relative !h-min overflow-visible rounded-md"
      @on-close="() => emit('modal:close')"
    >
      <slot />
      <div :class="['absolute -top-2 right-1/2 translate-x-1/2', 'rounded-full border-2 border-white', 'w-24']" />
    </AppModalBase>
  </ModalWithSwipe>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import AppModalBase from './AppModalBase.vue';
import ModalWithSwipe from './ModalWithSwipe.vue';

const emit = defineEmits<{
  (eventName: 'modal:close'): void;
}>();

const modalRef = ref();
const modalContainer = computed(() => modalRef.value?.modalContainer);
const attrs = useAttrs();

const closeModal = () => {
  modalRef.value?.closeModal();
};

defineExpose({
  openModal: () => {
    modalRef.value?.openModal();
  },
  closeModal,
});
</script>
