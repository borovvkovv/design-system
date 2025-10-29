<template>
  <div class="flex w-fit flex-col gap-y-12">
    <PropExampleState
      v-for="(propStates, propStatesIndex) in [
        modelValueStates,
        placeholderStates,
        disabledStates,
        rowsStates,
        labelStates,
        requiredStates,
        isErrorStates,
        errorTextsStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/inputs').then((libsComponents) => libsComponents.AppTextArea),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppTextAreaPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import type { IAppTextAreaProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';

const modelValueStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Text',
  states: [
    {
      stateName: 'Filled',
      stateValue: { modelValue: 'Text' },
    },
    {
      stateName: 'Empty',
      stateValue: { modelValue: '' },
    },
  ],
};

const placeholderStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Placeholder',
  states: [
    {
      stateName: 'With placeholder',
      stateValue: { placeholder: 'Placeholder', modelValue: '' },
    },
    {
      stateName: 'Without placeholder',
      stateValue: { placeholder: undefined, modelValue: '' },
    },
  ],
};

const disabledStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { isDisabled: true, modelValue: '' },
    },
    {
      stateName: 'Enabled',
      stateValue: { isDisabled: false, modelValue: '' },
    },
  ],
};

const rowsStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: '1 row',
      stateValue: { rows: 1, modelValue: 'Qwerty' },
    },
    {
      stateName: '2 rows',
      stateValue: {
        rows: 2,
        modelValue: `Qwerty
Qwerty`,
      },
    },
    {
      stateName: '2 rows',
      stateValue: {
        rows: 3,
        modelValue: `Qwerty
Qwerty
Qwerty`,
      },
    },
  ],
};

const labelStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Label',
  states: [
    {
      stateName: 'Without label',
      stateValue: { label: undefined, modelValue: '' },
    },
    {
      stateName: 'With label',
      stateValue: { label: 'Label', modelValue: '' },
    },
  ],
};

const requiredStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Required state',
  states: [
    {
      stateName: 'Required',
      stateValue: { required: true, modelValue: '', label: 'Label' },
    },
    {
      stateName: 'Not required',
      stateValue: { required: false, modelValue: '', label: 'Label' },
    },
  ],
};

const isErrorStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Error state',
  states: [
    {
      stateName: 'Error',
      stateValue: { isError: true, modelValue: '' },
    },
    {
      stateName: 'No error',
      stateValue: { isError: false, modelValue: '' },
    },
  ],
};

const errorTextsStates: ComponentPropStates<IAppTextAreaProps> = {
  title: 'Error texts',
  states: [
    {
      stateName: 'One error',
      stateValue: { errorList: ['error'], modelValue: '' },
    },
    {
      stateName: 'Two errors',
      stateValue: { errorList: ['error', 'error'], modelValue: '' },
    },
    {
      stateName: 'Three errors',
      stateValue: { errorList: ['error', 'error', 'error'], modelValue: '' },
    },
  ],
};
</script>
