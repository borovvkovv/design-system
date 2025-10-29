<template>
  <BasePopup
    ref="basePopup"
    v-bind="props"
    @popup:open="shiftPopupIntoContainer"
  >
    <slot />
  </BasePopup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BasePopup from './BasePopup.vue';
import type { PopupInsideContainerProps } from './utils/models';
import { usePopupInsideContainer } from './hooks/usePopupInsideContainer';

const props = defineProps<PopupInsideContainerProps>();

const basePopup = ref<InstanceType<typeof BasePopup>>();
const popup = computed<HTMLElement | undefined>(() => basePopup.value?.popup);
const showPopup = computed(() => basePopup.value?.showPopup);
const showPopupElementEventHandler = computed(() => basePopup.value?.showPopupElementEventHandler);
const closePopup = computed(() => basePopup.value?.closePopup);
const throttledOpenPopupAfter = computed(() => basePopup.value?.throttledOpenPopupAfter);
const throttledClosePopupAfter = computed(() => basePopup.value?.throttledClosePopupAfter);

const { shiftPopupIntoContainer } = usePopupInsideContainer(popup, () => props.container, props, false, true);

defineExpose({
  showPopup,
  showPopupElementEventHandler,
  closePopup,
  throttledOpenPopupAfter,
  throttledClosePopupAfter,
  popup,
});
</script>
