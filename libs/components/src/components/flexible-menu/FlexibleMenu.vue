<template>
  <BaseFlexibleMenu
    ref="baseFlexibleMenuRef"
    :max-lines="maxLines"
    @resize="() => onResizeHandler()"
  >
    <template #visibleItems><slot name="visibleItems" /></template>
    <template #collapsedMenu><slot name="collapsedMenu" /></template>
    <template #rightBoundary><slot name="rightBoundary" /></template>
  </BaseFlexibleMenu>
</template>

<script setup lang="ts" generic="T">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import type { BaseFlexibleMenuRef, IMenuItemParams } from '@comp/components/flexible-menu/utils/models';
import { getMenuItemsParams, getNotFittedItemIndex } from '@comp/components/flexible-menu/utils';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';

const props = withDefaults(
  defineProps<{
    visibleItems: T[];
    collapsedItems: T[];
    maxLines?: number;
    showAllItems?: boolean;
  }>(),
  {
    maxLines: 1,
    showAllItems: false,
  },
);

const emit = defineEmits<{
  (e: 'update:visibleItems', items: T[]): void;
  (e: 'update:collapsedItems', items: T[]): void;
}>();

const baseFlexibleMenuRef = ref<BaseFlexibleMenuRef>();
const allItems = ref<T[]>();
const allItemsParams = ref<IMenuItemParams[]>([]);
const isAllItemsParamsFulled = ref(false);
const indexOfNotFitItem = ref(-1);

const onResizeHandler = () => {
  if (!isAllItemsParamsFulled.value) {
    isAllItemsParamsFulled.value = true;
    allItemsParams.value = getMenuItemsParams(baseFlexibleMenuRef.value?.getVisibleMenuItems() ?? []);
    baseFlexibleMenuRef.value?.changeMenuContainerVisibility(true);
  }

  indexOfNotFitItem.value = getNotFittedItemIndex(props.maxLines, baseFlexibleMenuRef.value, allItemsParams.value);

  if (indexOfNotFitItem.value > -1) {
    if (!baseFlexibleMenuRef.value?.isCollapsedMenuVisible) {
      baseFlexibleMenuRef.value?.changeCollapsedMenuVisibility(true);
      nextTick(() => onResizeHandler());
      return;
    }

    if (!props.showAllItems) {
      emit('update:visibleItems', allItems.value?.slice(0, indexOfNotFitItem.value) ?? []);
      emit('update:collapsedItems', allItems.value?.slice(indexOfNotFitItem.value) ?? []);
    }
  } else {
    emit('update:visibleItems', allItems.value ?? []);
    emit('update:collapsedItems', []);
    baseFlexibleMenuRef.value?.changeCollapsedMenuVisibility(false);
  }
};

const updateAllItems = (newAllItems: T[]) => {
  baseFlexibleMenuRef.value?.stopResize();

  allItems.value = [...newAllItems];
  emit('update:visibleItems', newAllItems);
  emit('update:collapsedItems', []);
  isAllItemsParamsFulled.value = false;

  nextTick(() => setTimeout(() => baseFlexibleMenuRef.value?.startResize()));
};

onMounted(() => (allItems.value = [...props.visibleItems]));

onUnmounted(() => {
  emit('update:visibleItems', allItems.value ?? []);
  emit('update:collapsedItems', []);
});

defineExpose({
  rerender: (newAllItems: T[]) => updateAllItems(newAllItems),
  indexOfNotFitItem,
});
</script>
