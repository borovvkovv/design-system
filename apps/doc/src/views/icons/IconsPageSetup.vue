<template>
  <div>
    <h4 class="mb-6">IconsExample.vue</h4>
    <p class="text-desktop-5">
      {{ $t('vue-design-system.icons.icons-page-setup.iconComponentExplain') }}
    </p>
    <p class="mb-13 text-desktop-5">{{ $t('vue-design-system.icons.icons-page-setup.appIconExplain') }}</p>
    <highlightjs
      autodetect
      ignore-illegals
      :code="content"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconsPageSetup',
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
