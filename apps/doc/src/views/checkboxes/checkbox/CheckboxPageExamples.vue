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
          <AppCheckbox :model-value="isCheckState.isChecked" />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Label</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="labelState in labelStates"
          :key="labelState.title"
        >
          <p class="text-desktop-5">{{ labelState.title }}</p>
          <AppCheckbox
            :model-value="true"
            :label="labelState.label"
          />
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
          <AppCheckbox
            :model-value="true"
            :is-disabled="isDisabledState.isDisabled"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Error state</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="isErrorState in isErrorStates"
          :key="isErrorState.title"
        >
          <p class="text-desktop-5">{{ isErrorState.title }}</p>
          <AppCheckbox
            :model-value="true"
            :is-error="isErrorState.isError"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Color</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="colorMode in colorModes"
          :key="colorMode.title"
        >
          <p class="text-desktop-5">{{ colorMode.title }}</p>
          <AppCheckbox
            :model-value="true"
            :inverse-color="colorMode.color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CheckboxPageExamples',
};
</script>

<script setup lang="ts">
import { AppCheckbox } from '@libs/components/inputs';

const isCheckStates = [
  {
    title: 'Checked',
    isChecked: true,
  },
  {
    title: 'Not checked',
    isChecked: false,
  },
  {
    title: 'Null',
    isChecked: null,
  },
];

const labelStates = [
  {
    title: 'Without label',
    label: undefined,
  },
  {
    title: 'With label',
    label: 'Label',
  },
];

const colorModes = [
  {
    title: 'Straight color',
    color: false,
  },
  {
    title: 'Inverse color',
    color: true,
  },
];

const isErrorStates = [
  {
    title: 'Error',
    isError: true,
  },
  {
    title: 'No error',
    isError: false,
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
