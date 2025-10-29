<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Check state</h4>
      <div class="mb-13 flex gap-3">
        <AppRadiobutton v-bind="firstRadiobutton" />
        <AppRadiobutton v-bind="secondRadiobutton" />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Label</h4>
      <div class="mb-13 flex gap-3">
        <div>
          <p class="text-desktop-5">Without label</p>
          <AppRadiobutton v-bind="firstRadiobutton" />
        </div>
        <div>
          <p class="text-desktop-5">With label</p>
          <AppRadiobutton
            v-bind="secondRadiobutton"
            label="Label"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Disabled state</h4>
      <div class="mb-13 flex gap-3">
        <div>
          <p class="text-desktop-5">Disabled</p>
          <AppRadiobutton
            v-bind="firstRadiobutton"
            :is-disabled="true"
          />
        </div>
        <div>
          <p class="text-desktop-5">Not disabled</p>
          <AppRadiobutton v-bind="secondRadiobutton" />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Error state</h4>
      <div class="mb-13 flex gap-3">
        <div>
          <p class="text-desktop-5">Error</p>
          <AppRadiobutton
            v-bind="firstRadiobutton"
            :is-error="true"
          />
        </div>
        <div>
          <p class="text-desktop-5">No error</p>
          <AppRadiobutton v-bind="secondRadiobutton" />
        </div>
      </div>
    </div>
    <AppLoading />
  </div>
</template>

<script lang="ts">
export default {
  name: 'RadioButtonPageExamples',
};
</script>

<script setup lang="ts">
import { AppRadiobutton } from '@libs/components/inputs';
import type { IAppRadiobuttonProps } from '@libs/components/inputs-types';
import { AppLoading } from '@libs/components';

const firstRadiobutton: IAppRadiobuttonProps = {
  modelValue: 'value1',
  value: 'value1',
  groupName: 'groupName',
};

const secondRadiobutton: IAppRadiobuttonProps = {
  modelValue: 'value1',
  value: 'value2',
  groupName: 'groupName',
};
</script>
