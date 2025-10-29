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
        isLoadingStates,
        isErrorLoadingStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/selects').then((libsComponents) => libsComponents.SimpleSelect),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SimpleSelectPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import type { ISimpleSelectProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';

const option1: ISelectItem = { title: 'Title1', value: 'value1' };
const option2: ISelectItem = { title: 'Title2', value: 'value2' };
const option3: ISelectItem = { title: 'Title3', value: 'value3' };
const options: Array<ISelectItem> = [option1, option2, option3];

const modelValueStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Text',
  states: [
    {
      stateName: 'Selected',
      stateValue: {
        modelValue: option1,
        options,
      },
    },
    {
      stateName: 'Empty',
      stateValue: { modelValue: undefined, options },
    },
  ],
};

const sizeStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Size',
  states: [
    {
      stateName: 'XS',
      stateValue: { size: Size.XS, modelValue: undefined, options },
    },
    {
      stateName: 'S',
      stateValue: { size: Size.S, modelValue: undefined, options },
    },
    {
      stateName: 'M',
      stateValue: { size: Size.M, modelValue: undefined, options },
    },
  ],
};

const placeholderStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Placeholder',
  states: [
    {
      stateName: 'With placeholder',
      stateValue: { placeholder: 'Placeholder', modelValue: undefined, options },
    },
    {
      stateName: 'Without placeholder',
      stateValue: { placeholder: undefined, modelValue: undefined, options },
    },
  ],
};

const labelStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Label',
  states: [
    {
      stateName: 'Without label',
      stateValue: { label: undefined, modelValue: undefined, options },
    },
    {
      stateName: 'With label',
      stateValue: { label: 'Label', modelValue: undefined, options },
    },
  ],
};

const isLoadingStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Loading state',
  states: [
    {
      stateName: 'Loading',
      stateValue: { isLoading: true, modelValue: undefined, options, placeholder: 'Open ->' },
    },
    {
      stateName: 'Not loading',
      stateValue: { isLoading: false, modelValue: undefined, options, placeholder: 'Open ->' },
    },
  ],
};

const isErrorLoadingStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Error loading state',
  states: [
    {
      stateName: 'Error loading',
      stateValue: { isErrorLoading: true, modelValue: undefined, options, placeholder: 'Open ->' },
    },
    {
      stateName: 'No error loading',
      stateValue: { isErrorLoading: false, modelValue: undefined, options, placeholder: 'Open ->' },
    },
  ],
};

const isErrorStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Error state',
  states: [
    {
      stateName: 'Error',
      stateValue: { isError: true, modelValue: undefined, options },
    },
    {
      stateName: 'No error',
      stateValue: { isError: false, modelValue: undefined, options },
    },
  ],
};

const errorTextsStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Error texts',
  states: [
    {
      stateName: 'One error',
      stateValue: { errorList: ['error'], modelValue: undefined, options },
    },
    {
      stateName: 'Two errors',
      stateValue: { errorList: ['error', 'error'], modelValue: undefined, options },
    },
    {
      stateName: 'Three errors',
      stateValue: { errorList: ['error', 'error', 'error'], modelValue: undefined, options },
    },
  ],
};

const disabledStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { disabled: true, modelValue: undefined, options },
    },
    {
      stateName: 'Enabled',
      stateValue: { disabled: false, modelValue: undefined, options },
    },
  ],
};

const requiredStates: ComponentPropStates<ISimpleSelectProps<string>> = {
  title: 'Required state',
  states: [
    {
      stateName: 'Required',
      stateValue: { required: true, modelValue: undefined, label: 'Label', options },
    },
    {
      stateName: 'Not required',
      stateValue: { required: false, modelValue: undefined, label: 'Label', options },
    },
  ],
};
</script>
