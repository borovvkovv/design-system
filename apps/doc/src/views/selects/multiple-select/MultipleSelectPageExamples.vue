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
          import('@libs/components/selects').then((libsComponents) => libsComponents.MultiSelect),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MultipleSelectPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import type { IMultipleSelectProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';

const option1: ISelectItem = { title: 'Title1', value: 'value1' };
const option2: ISelectItem = { title: 'Title2', value: 'value2' };
const option3: ISelectItem = { title: 'Title3', value: 'value3' };
const options: Array<ISelectItem> = [option1, option2, option3];

const modelValueStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Text',
  states: [
    {
      stateName: 'Selected',
      stateValue: {
        selectedOptions: [option1, option2, option3],
        options,
      },
    },
    {
      stateName: 'Empty',
      stateValue: { selectedOptions: [], options },
    },
  ],
};

const sizeStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Size',
  states: [
    {
      stateName: 'XS',
      stateValue: { size: Size.XS, selectedOptions: [], options },
    },
    {
      stateName: 'S',
      stateValue: { size: Size.S, selectedOptions: [], options },
    },
    {
      stateName: 'M',
      stateValue: { size: Size.M, selectedOptions: [], options },
    },
  ],
};

const placeholderStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Placeholder',
  states: [
    {
      stateName: 'With placeholder',
      stateValue: { placeholder: 'Placeholder', selectedOptions: [], options },
    },
    {
      stateName: 'Without placeholder',
      stateValue: { placeholder: undefined, selectedOptions: [], options },
    },
  ],
};

const labelStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Label',
  states: [
    {
      stateName: 'Without label',
      stateValue: { label: undefined, selectedOptions: [], options },
    },
    {
      stateName: 'With label',
      stateValue: { label: 'Label', selectedOptions: [], options },
    },
  ],
};

const isLoadingStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Loading state',
  states: [
    {
      stateName: 'Loading',
      stateValue: { isLoading: true, selectedOptions: [], options, placeholder: 'Open ->' },
    },
    {
      stateName: 'Not loading',
      stateValue: { isLoading: false, selectedOptions: [], options, placeholder: 'Open ->' },
    },
  ],
};

const isErrorLoadingStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Error loading state',
  states: [
    {
      stateName: 'Error loading',
      stateValue: { isErrorLoading: true, selectedOptions: [], options, placeholder: 'Open ->' },
    },
    {
      stateName: 'No error loading',
      stateValue: { isErrorLoading: false, selectedOptions: [], options, placeholder: 'Open ->' },
    },
  ],
};

const isErrorStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Error state',
  states: [
    {
      stateName: 'Error',
      stateValue: { isError: true, selectedOptions: [], options },
    },
    {
      stateName: 'No error',
      stateValue: { isError: false, selectedOptions: [], options },
    },
  ],
};

const errorTextsStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Error texts',
  states: [
    {
      stateName: 'One error',
      stateValue: { errorList: ['error'], selectedOptions: [], options },
    },
    {
      stateName: 'Two errors',
      stateValue: { errorList: ['error', 'error'], selectedOptions: [], options },
    },
    {
      stateName: 'Three errors',
      stateValue: { errorList: ['error', 'error', 'error'], selectedOptions: [], options },
    },
  ],
};

const disabledStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { disabled: true, selectedOptions: [], options },
    },
    {
      stateName: 'Enabled',
      stateValue: { disabled: false, selectedOptions: [], options },
    },
  ],
};

const requiredStates: ComponentPropStates<IMultipleSelectProps> = {
  title: 'Required state',
  states: [
    {
      stateName: 'Required',
      stateValue: { required: true, selectedOptions: [], label: 'Label', options },
    },
    {
      stateName: 'Not required',
      stateValue: { required: false, selectedOptions: [], label: 'Label', options },
    },
  ],
};
</script>
