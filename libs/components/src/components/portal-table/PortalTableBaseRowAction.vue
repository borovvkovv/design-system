<template>
  <AppIcon
    :icon="rowAction.icon"
    :size="16"
    :class="[
      'cursor-pointer',
      rowAction.modifier?.textColor ?? 'text-blueGrey-2 hover:text-blue-2',
      rowAction.modifier?.other,
    ]"
    @click="rowAction.onIconClick"
    @mouseenter="(evt: MouseEvent) => popupRef?.showPopup(evt)"
    @mouseleave="() => popupRef?.closePopup()"
  />
  <AppTableCellTextPopup
    ref="popupRef"
    :text="rowAction.title"
    class="size-max"
  />
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import AppIcon from '@comp/components/AppIcon.vue';
import type { TRowAction } from '@comp/components/portal-table/utils/models';
import AppTableCellTextPopup from '@comp/components/table/AppTableCellTextPopup.vue';

defineProps<{
  rowAction: TRowAction<T>;
}>();

const popupRef = ref();
</script>
