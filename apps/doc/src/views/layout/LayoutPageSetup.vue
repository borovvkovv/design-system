<template>
  <div>
    <h4 class="mb-6">LayoutExample.vue</h4>
    <p class="text-desktop-5">
      {{ $t('vue-design-system.layout.layout-page-setup.layoutContainerGridExplain') }}
    </p>
    <p class="mb-13 text-desktop-5">{{ $t('vue-design-system.layout.layout-page-setup.colStyleClassExplain') }}</p>
    <highlightjs
      autodetect
      ignore-illegals
      :code="content"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayoutPageSetup',
};
</script>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { parseMarkdownText } from '@/views/utils';
import type { RawLoaderContent } from '@/views/utils/models';

const setupModule: RawLoaderContent = import('./setup.md?raw');

const content = ref<string>('');

onBeforeMount(async () => {
  const rawContent = (await setupModule).default;
  content.value = parseMarkdownText(rawContent);
});
</script>
