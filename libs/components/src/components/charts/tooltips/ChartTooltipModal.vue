<template>
  <ModalSliderSlideFromBottom
    ref="modalRef"
    v-bind="props"
    :transition-key="xAxisLabel"
    @modal:close="() => emit('modal:close')"
  >
    <ChartTooltipModalBody
      :tooltip-title="tooltipTitle"
      :values="values"
      :x-axis-label="xAxisLabel"
    />
  </ModalSliderSlideFromBottom>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IChartTooltipModalProps } from '@comp/components/charts/tooltips/models';
import ModalSliderSlideFromBottom from '@comp/components/modals/ModalSliderSlideFromBottom.vue';
import ChartTooltipModalBody from './modal-tooltip/ChartTooltipModalBody.vue';

const props = defineProps<IChartTooltipModalProps>();

const emit = defineEmits<{
  (eventName: 'modal:close'): void;
}>();

const modalRef = ref();
defineExpose({
  openModal: () => {
    modalRef.value?.openModal();
  },
  closeModal: () => {
    modalRef.value?.closeModal();
  },
});
</script>
