<template>
  <LayoutContainer ref="layoutContainer">
    <RowLayoutColumns
      ref="rowLayoutColumnsRef"
      :column-widths="columnWidths"
      :layout-container-margin="layoutContainerMargin"
    />
  </LayoutContainer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getLayoutContainerMargin, getWindowWidth } from '@layout/utils';
import LayoutContainer from '@layout/components/layout/LayoutContainer.vue';
import RowLayoutColumns from '@layout/components/columns/RowLayoutColumns .vue';

const layoutContainer = ref<InstanceType<typeof LayoutContainer>>();
const layoutContainerMargin = ref('');
const columnWidths = ref<Array<string>>(['1', '1']);
const rowLayoutColumnsRef = ref<InstanceType<typeof RowLayoutColumns>>();

const bodyResizeObserver = new ResizeObserver(() => {
  layoutContainerMargin.value = getLayoutContainerMargin(getWindowWidth(), layoutContainer.value?.$el);
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
