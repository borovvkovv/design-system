<template>
  <div
    ref="chip"
    @click="() => emit('delete:selectedOption')"
  >
    <div :class="['bg-grey-5 group cursor-pointer rounded', 'flex flex-nowrap items-center', 'px-4 py-1 hover:pr-0']">
      <div class="grow overflow-hidden text-ellipsis whitespace-nowrap">{{ selectedOption.title }}</div>
      <AppIcon
        :icon="IconName.IconCross"
        :size="16"
        class="text-blueGrey-2 mx-2 hidden shrink-0 group-hover:block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppIcon from '@comp/components/AppIcon.vue';
import { IconName } from '@comp/components/icons/utils/models';
import type { ISelectItem } from '@comp/components/selects/utils/models';

const props = defineProps<{
  selectedOption: ISelectItem;
  container: HTMLElement | undefined;
}>();

const emit = defineEmits<{
  (e: 'delete:selectedOption'): void;
}>();

const chip = ref<HTMLElement>();

watch([chip, () => props.selectedOption], () => {
  if (chip.value) {
    const containerWidth = props.container?.getBoundingClientRect().width;
    const chipWidth = chip.value.getBoundingClientRect().width;
    chip.value.style.width = `${Math.min(containerWidth ?? chipWidth, chipWidth)}px`;
    chip.value.style.minWidth = `${Math.min(containerWidth ?? chipWidth, chipWidth)}px`;
  }
});

defineExpose({
  chip,
});
</script>
