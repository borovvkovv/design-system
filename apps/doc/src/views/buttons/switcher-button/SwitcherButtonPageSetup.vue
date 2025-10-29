<template>
  <div>
    <h4 class="mb-13">SwitcherButtonExample.vue</h4>
    <highlightjs
      autodetect
      ignore-illegals
      :code="content"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitcherButtonPageSetup',
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
