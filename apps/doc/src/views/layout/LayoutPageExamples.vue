<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">375-743px</h4>
      <p class="text-desktop-5">margin: 16px</p>
      <p class="mb-13 text-desktop-5">column: 343-711px</p>
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-sm.html`"
        height="160px"
        width="375px"
        class="border-blueGrey-3 mb-3 box-content border"
      />
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-sm.html`"
        height="160px"
        width="743px"
        class="border-blueGrey-3 box-content border"
      />
    </div>
    <div>
      <h4 class="mb-6">744-1139px</h4>
      <p class="text-desktop-5">margin: 24px</p>
      <p class="text-desktop-5">column: 336-533.5px</p>
      <p class="mb-13 text-desktop-5">gutter: 24px</p>
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-md.html`"
        height="160px"
        width="744px"
        class="border-blueGrey-3 mb-3 box-content border"
      />
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-md.html`"
        height="160px"
        width="1139px"
        class="border-blueGrey-3 box-content border"
      />
    </div>
    <div>
      <h4 class="mb-6">1140-1359px</h4>
      <p class="text-desktop-5">margin: 40px</p>
      <p class="text-desktop-5">column: 66-84px</p>
      <p class="mb-13 text-desktop-5">gutter: 24px</p>
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1140px"
        class="border-blueGrey-3 mb-3 box-content border"
      />
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1359px"
        class="border-blueGrey-3 box-content border"
      />
    </div>
    <div>
      <h4 class="mb-6">1360-1519px</h4>
      <p class="text-desktop-5">margin: 40px</p>
      <p class="text-desktop-5">column: 84px</p>
      <p class="mb-13 text-desktop-5">gutter: 24-40px</p>
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1360px"
        class="border-blueGrey-3 mb-3 box-content border"
      />
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1519px"
        class="border-blueGrey-3 box-content border"
      />
    </div>
    <div>
      <h4 class="mb-6">1520px></h4>
      <p class="text-desktop-5">row: 1140px</p>
      <p class="text-desktop-5">margin: auto</p>
      <p class="text-desktop-5">column: 84px</p>
      <p class="mb-13 text-desktop-5">gutter: 40px</p>
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1520px"
        class="border-blueGrey-3 mb-3 box-content border"
      />
      <iframe
        ref="iframeRef"
        :src="`${pathToLayoutPages}/index-lg.html`"
        height="160px"
        width="1800px"
        class="border-blueGrey-3 box-content border"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayoutPageExamples',
};
</script>

<script setup lang="ts">
const pathToLayoutPages = import.meta.env.VITE_LAYOUT_PAGE_EXAMPLE;
</script>
