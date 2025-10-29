<template>
  <BasePopup
    ref="popupRef"
    v-tw-merge
    v-bind="popupPosition"
    :class="[
      'text-size-6 text-black-1 whitespace-pre-line break-all text-left',
      'max-w-106 shadow-4 fixed rounded-md bg-white',
      'py-2',
    ]"
    @popup:open="shiftPopupIntoContainer"
  >
    <div
      class="max-h-100 scrollbar-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 overflow-y-auto px-3"
    >
      {{ text }}
    </div>
  </BasePopup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BasePopup from '@comp/components/popup/BasePopup.vue';
import { usePopupInsideContainer } from '@comp/components/popup/hooks/usePopupInsideContainer';
import { usePopupWithScroll } from '@comp/components/table/utils';

defineProps<{
  text: string;
}>();

const popupRef = ref<InstanceType<typeof BasePopup>>();
const popup = computed(() => popupRef.value?.popup);
const popupPosition = {
  toTopFromPointerPx: 12,
  translateXPercent: -50,
};

const showPopup = (left?: number, top?: number) => popupRef.value?.showPopup?.(left, top);

const showPopupElementEventHandler = (e: MouseEvent) => {
  popupRef.value?.showPopupElementEventHandler?.(e, 'top');
};
const { shiftPopupIntoContainer } = usePopupInsideContainer(popup, undefined, popupPosition, false, true);
const { startCheckIfPointerReachPopup } = usePopupWithScroll(popupRef);

const closePopup = () => popupRef.value?.closePopup?.();

defineExpose({
  showPopup,
  showPopupElementEventHandler,
  closePopup,
  startCheckIfPointerReachPopup,
});
</script>
