<template>
  <div class="flex h-full w-max">
    <iframe
      ref="iframeRef"
      :src="`${pathToLayoutPages}/index.html`"
      :width="`${iframeWidth}px`"
      class="border-blueGrey-3 box-content border"
    />
    <WidthDragger
      v-model:width="iframeWidth"
      :header-cell="iframeRef"
      :swipe-field="body"
      :min-width="375"
      @before:swipe="() => (isWidthDragging = true)"
      @swiped:end="() => (isWidthDragging = false)"
    />
    <div :class="['fixed inset-0', !isWidthDragging && 'hidden']"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayoutPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import WidthDragger from '@/components/width-dragger/WidthDragger.vue';

const iframeRef = ref<HTMLElement | undefined>();
const iframeWidth = ref(390);
const body = document.body;
const isWidthDragging = ref(false);
const pathToLayoutPages = import.meta.env.VITE_LAYOUT_PAGE_EXAMPLE;
</script>
