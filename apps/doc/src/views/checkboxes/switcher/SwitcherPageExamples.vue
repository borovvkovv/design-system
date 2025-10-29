<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Check state</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="isCheckState in isCheckStates"
          :key="isCheckState.title"
        >
          <p class="text-desktop-5">{{ isCheckState.title }}</p>
          <AppSwitcher :model-value="isCheckState.isChecked" />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Disabled state</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="isDisabledState in isDisabledStates"
          :key="isDisabledState.title"
        >
          <p class="text-desktop-5">{{ isDisabledState.title }}</p>
          <AppSwitcher
            :model-value="true"
            :is-disabled="isDisabledState.isDisabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitcherPageExamples',
};
</script>

<script setup lang="ts">
import { AppSwitcher } from '@libs/components/inputs';

const isCheckStates = [
  {
    title: 'Checked',
    isChecked: true,
  },
  {
    title: 'Not checked',
    isChecked: false,
  },
];

const isDisabledStates = [
  {
    title: 'Disabled',
    isDisabled: true,
  },
  {
    title: 'Not disabled',
    isDisabled: false,
  },
];
</script>
