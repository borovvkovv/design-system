<template>
  <div class="flex w-fit flex-col gap-y-12">
    <PropExampleState
      v-for="(propStates, propStatesIndex) in [
        modelValueStates,
        sizeStates,
        placeholderStates,
        disabledStates,
        labelStates,
        requiredStates,
        isErrorStates,
        errorTextsStates,
        isCorrectedStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/inputs').then((libsComponents) => libsComponents.BasePasswordInput),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasePasswordInputPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import type { IPasswordInputProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';

const modelValueStates: ComponentPropStates<IPasswordInputProps> = {
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

const sizeStates: ComponentPropStates<IPasswordInputProps> = {
  title: 'Size',
  states: [
    {
      stateName: 'XS',
      stateValue: { size: Size.XS, modelValue: '' },
    },
    {
      stateName: 'S',
      stateValue: { size: Size.S, modelValue: '' },
    },
    {
      stateName: 'M',
      stateValue: { size: Size.M, modelValue: '' },
    },
  ],
};

const placeholderStates: ComponentPropStates<IPasswordInputProps> = {
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

const labelStates: ComponentPropStates<IPasswordInputProps> = {
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

const isErrorStates: ComponentPropStates<IPasswordInputProps> = {
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

const errorTextsStates: ComponentPropStates<IPasswordInputProps> = {
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

const isCorrectedStates: ComponentPropStates<IPasswordInputProps> = {
  title: 'Corrected state',
  states: [
    {
      stateName: 'Correct',
      stateValue: { isCorrect: true, modelValue: '' },
    },
  ],
};

const disabledStates: ComponentPropStates<IPasswordInputProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { disabled: true, modelValue: '' },
    },
    {
      stateName: 'Enabled',
      stateValue: { disabled: false, modelValue: '' },
    },
  ],
};

const requiredStates: ComponentPropStates<IPasswordInputProps> = {
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
</script>
