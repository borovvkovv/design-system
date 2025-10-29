<template>
  <ModalWithSwipe
    :swipe-field="modalContainer"
    :swipe-start-field="modalContainer"
  >
    <AppModal
      ref="modalRef"
      :enter="transitionPhases.enter"
      :enter-from="transitionPhases.enterFrom"
      :enter-to="transitionPhases.enterTo"
      :leave="transitionPhases.leave"
      :leave-from="transitionPhases.leaveFrom"
      :leave-to="transitionPhases.leaveTo"
      v-bind="attrs"
    >
      <template #header>
        <div class="mx-auto w-fit lg:mx-0">
          <slot name="header" />
        </div>
      </template>
      <template #default>
        <slot />
      </template>
    </AppModal>
  </ModalWithSwipe>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import { useBreakpoints } from '@comp/components/utils/hooks/useBreakpoints';
import { BreakpointName } from '@comp/enums/breakpoint-name';
import ModalWithSwipe from './ModalWithSwipe.vue';
import AppModal from './AppModal.vue';
import type { TransitionProps } from './utils/models';

const modalRef = ref();
const modalContainer = computed(() => modalRef.value?.modalContainer);
const attrs = useAttrs();
const breakpoints = useBreakpoints();
const isSmallerLg = breakpoints.smaller(BreakpointName.Lg);

const transitionPhases = computed<TransitionProps>(() => ({
  enter: isSmallerLg.value ? 'duration-300 ease-out' : undefined,
  enterFrom: isSmallerLg.value ? 'absolute opacity-0 translate-x-full z-100' : undefined,
  enterTo: isSmallerLg.value ? 'absolute opacity-100 translate-x-0 z-100' : undefined,
  leave: isSmallerLg.value ? 'duration-200 ease-in' : undefined,
  leaveFrom: isSmallerLg.value ? 'absolute opacity-100 translate-x-0 z-100' : undefined,
  leaveTo: isSmallerLg.value ? 'absolute opacity-0 translate-x-full z-100' : undefined,
}));

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
