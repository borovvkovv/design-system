<template>
  <LayoutContainer
    ref="layoutContainer"
    :class="['flex flex-col gap-y-10', 'h-full', 'py-4']"
  >
    <div class="flex flex-wrap gap-10">
      <LayoutColumnCalculator v-model:column-widths="columnWidths" />
      <div>
        <p>{{ `Window width interval = ${windowWidthMode}px` }}</p>
        <p>{{ `Window width = ${windowWidth}px` }}</p>
        <p>{{ `LayoutContainer margin-x = ${layoutContainerMargin}` }}</p>
        <p>{{ `Row width = ${rowLayoutColumnsRef?.rowWidth}px` }}</p>
        <p>{{ `Row margin-x = ${rowLayoutColumnsRef?.rowMargin}px` }}</p>
      </div>
    </div>
    <RowLayoutColumns
      ref="rowLayoutColumnsRef"
      :column-widths="columnWidths"
      :layout-container-margin="layoutContainerMargin"
      :show-column-width="true"
    />
  </LayoutContainer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getLayoutContainerMargin, getWindowWidth, getWindowWidthMode } from '@layout/utils';
import LayoutContainer from '@layout/components/layout/LayoutContainer.vue';
import RowLayoutColumns from '@layout/components/columns/RowLayoutColumns .vue';
import LayoutColumnCalculator from '@layout/components/columns/LayoutColumnCalculator.vue';

const windowWidthMode = ref('');
const windowWidth = ref(0);
const layoutContainer = ref<InstanceType<typeof LayoutContainer>>();
const layoutContainerMargin = ref('');
const columnWidths = ref<Array<string>>([]);
const rowLayoutColumnsRef = ref<InstanceType<typeof RowLayoutColumns>>();

const bodyResizeObserver = new ResizeObserver(() => {
  windowWidth.value = getWindowWidth();
  layoutContainerMargin.value = getLayoutContainerMargin(windowWidth.value, layoutContainer.value?.$el);
  windowWidthMode.value = getWindowWidthMode();
});

onMounted(() => {
  bodyResizeObserver.observe(document.body);
});

onUnmounted(() => {
  bodyResizeObserver.unobserve(document.body);
});
</script>

<style lang="scss">
@use '@layout/assets/styles/tailwind';
@use '@layout/assets/styles/normalize';

html,
#app {
  height: 100%;
}
</style>
