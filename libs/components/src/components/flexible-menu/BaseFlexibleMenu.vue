<template>
  <div
    ref="menuContainer"
    class="invisible relative flex items-center"
  >
    <nav
      ref="visibleMenuRef"
      :class="['flex shrink-0 grow-0', maxLines > 1 && 'flex-wrap']"
    >
      <slot name="visibleItems" />
      <div
        v-if="isCollapsedMenuVisible"
        ref="collapsedMenuRef"
        class="shrink-0 grow-0"
      >
        <slot name="collapsedMenu" />
      </div>
    </nav>
    <div
      ref="rightBoundaryRef"
      class="absolute right-0 shrink-0 grow-0"
    >
      <slot name="rightBoundary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getElementWidthWithMarginX } from '@comp/components/flexible-menu/utils';

defineProps<{
  maxLines: number;
}>();

const emit = defineEmits<{
  (e: 'resize'): void;
}>();

const menuContainer = ref<HTMLElement | undefined>();
const visibleMenuRef = ref<HTMLElement | undefined>();
const collapsedMenuRef = ref<HTMLElement | undefined>();
const rightBoundaryRef = ref<HTMLElement | undefined>();
const isCollapsedMenuVisible = ref(false);

const timeOut = ref<NodeJS.Timeout>();
const resizeObserver = new ResizeObserver(() => {
  clearTimeout(timeOut.value);
  timeOut.value = setTimeout(() => {
    if (visibleMenuRef.value) {
      const menuContainerWidth = getElementWidthWithMarginX(menuContainer.value);
      const rightBoundaryWidth = getElementWidthWithMarginX(rightBoundaryRef.value);
      visibleMenuRef.value.style.maxWidth = `${menuContainerWidth - rightBoundaryWidth}px`;
    }
    emit('resize');
  }, 100);
});

onMounted(() => startResize());
onUnmounted(() => stopResize());

const changeCollapsedMenuVisibility = (isVisible: boolean) => (isCollapsedMenuVisible.value = isVisible);
const changeMenuContainerVisibility = (isVisible: boolean) => {
  if (menuContainer.value) {
    menuContainer.value.style.visibility = isVisible ? 'visible' : 'hidden';
  }
};
const getVisibleMenuItems = () =>
  [...(visibleMenuRef.value?.children ?? [])].slice(0, isCollapsedMenuVisible.value ? -1 : undefined);
const getVisibleMenuWidth = () => Number(visibleMenuRef.value?.style.maxWidth.slice(0, -2));
const getCollapsedMenuWidth = () => getElementWidthWithMarginX(collapsedMenuRef.value);
const stopResize = () => {
  if (menuContainer.value) resizeObserver.unobserve(menuContainer.value);
};
const startResize = () => {
  if (menuContainer.value) resizeObserver.observe(menuContainer.value);
};

defineExpose({
  isCollapsedMenuVisible,
  menuContainer,
  getVisibleMenuItems,
  getVisibleMenuWidth,
  getCollapsedMenuWidth,
  changeCollapsedMenuVisibility,
  changeMenuContainerVisibility,
  stopResize,
  startResize,
});
</script>
