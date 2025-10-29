<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
    v-bind="{ ...attrs, class: '' }"
  >
    <Dialog
      as="div"
      class="relative z-50"
      @close="closeModal"
    >
      <AppModalBaseBackdrop v-if="withBackdrop" />
      <div
        ref="modalContainer"
        :class="[
          'fixed inset-0 ',
          'flex h-dvh w-dvw overflow-auto overflow-x-hidden text-center',
          justifyContent,
          alignItems,
        ]"
        data-test="modalContainer"
      >
        <TransitionChild
          as="template"
          :enter="enter"
          :enter-from="enterFrom"
          :enter-to="enterTo"
          :leave="leave"
          :leave-from="leaveFrom"
          :leave-to="leaveTo"
        >
          <DialogPanel
            ref="modalDialog"
            :class="[
              'transform transition-all',
              'h-full w-full overflow-auto bg-white text-left',
              'scrollbar-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3',
              attrs.class,
            ]"
          >
            <div>
              <AppLink
                v-if="withCloseCross"
                ref="closeCross"
                class="absolute right-1/2 top-5 translate-x-1/2 lg:right-6 lg:top-6 lg:translate-x-0"
                :link-style="LinksStyles.Style6"
                @click="() => closeModal()"
              >
                <div
                  class="bg-grey-5 flex h-12 w-12 items-center justify-center rounded-full lg:h-6 lg:w-6 lg:rounded-none lg:bg-transparent"
                >
                  <IconCross24 />
                </div>
              </AppLink>
              <DialogTitle as="h2">
                <slot name="header" />
              </DialogTitle>
              <slot />
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { computed, ref, useAttrs } from 'vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import AppModalBaseBackdrop from './AppModalBaseBackdrop.vue';
import type { AppModalBaseProps } from './utils/models';

const props = withDefaults(defineProps<AppModalBaseProps>(), {
  position: undefined,
  enter: 'duration-300 ease-out',
  enterFrom: 'opacity-0 scale-95',
  enterTo: 'opacity-100 scale-100',
  leave: 'duration-200 ease-in',
  leaveFrom: 'opacity-100 scale-100',
  leaveTo: 'opacity-0 scale-95',
  withCloseCross: true,
  withBackdrop: true,
});

const isOpen = ref(props.openImmediately ?? false);
const closeCross = ref<HTMLElement>();
const modalContainer = ref<HTMLElement>();
const modalDialog = ref<InstanceType<typeof DialogPanel>>();
const modalDialogElement = computed<HTMLDivElement | undefined>(() => modalDialog.value?.$el);
const attrs = useAttrs();

const emit = defineEmits<{
  (e: 'onClose'): void;
}>();

function closeModal() {
  isOpen.value = false;
  emit('onClose');
}

const justifyContent = computed(() => {
  switch (props.position) {
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-center';
  }
});

const alignItems = computed(() => {
  switch (props.position) {
    case 'top':
      return 'items-start';
    case 'bottom':
      return 'items-end';
    default:
      return (modalDialogElement.value?.parentElement?.clientHeight ?? 0) <= (modalContainer.value?.clientHeight ?? 0)
        ? 'items-center'
        : 'items-start';
  }
});

defineExpose({
  openModal: () => {
    isOpen.value = true;
  },
  closeModal,
  modalContainer,
  modalDialog: modalDialogElement,
});
</script>
