<template>
  <AppIcon
    :icon="action.icon"
    :size="16"
    :class="[
      action.isActive ? 'text-blue-2' : 'text-blueGrey-2',
      isItemHover || action.isActive || action.isAlwaysVisible ? 'hover:text-blue-2' : 'hidden',
    ]"
    @click.stop="action.onIconClick"
    @mouseenter="(evt: MouseEvent) => popupRef?.showPopup(evt)"
    @mouseleave="() => popupRef?.closePopup()"
  />
  <AppTableCellTextPopup
    ref="popupRef"
    :text="action.title"
    class="w-max"
  />
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import AppIcon from '@comp/components/AppIcon.vue';
import type { IAccordionAction } from '@comp/components/selects/utils/models';
import AppTableCellTextPopup from '@comp/components/table/AppTableCellTextPopup.vue';

defineProps<{
  action: IAccordionAction<T>;
  isItemHover: boolean;
}>();

const popupRef = ref();
</script>
