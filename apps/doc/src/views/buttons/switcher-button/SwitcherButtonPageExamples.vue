<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Switcher</h4>
      <p class="text-desktop-5">{{ model }}</p>
      <SwitcherButton
        v-model="model"
        :switcher
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitcherButtonPageExamples',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { SwitcherButton } from '@libs/components/buttons';

const model = ref<string>();
const switcher = {
  left: {
    text: 'Title 1',
    value: 'Value 1',
  },
  right: {
    text: 'Title 2',
    value: 'Value 2',
  },
};
</script>
