<template>
  <div class="flex w-fit flex-col gap-y-12">
    <PropExampleState
      v-for="(propStates, propStatesIndex) in [
        modelValueStates,
        sizeStates,
        placeholderStates,
        disabledStates,
        labelStates,
        isErrorStates,
        errorTextsStates,
        requiredStates,
        iconLeftStates,
        titleStates,
        countStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/inputs').then((libsComponents) => libsComponents.SmartInput),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SmartInputPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import { IconName } from '@libs/components/icons-enums';
import type { ISmartInputProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';
import type { ISelectItem, SelectKeyType } from '@libs/components/selects-types';

const options: Array<ISelectItem<SelectKeyType>> = [
  { title: 'Title1', value: 'Value1' },
  { title: 'Title2', value: 'Value2' },
  { title: 'Title3', value: 'Value3' },
];

const modelValueStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
  title: 'Text',
  states: [
    {
      stateName: 'Filled',
      stateValue: { modelValue: { title: 'Title1', value: 'Value1' }, options },
    },
    {
      stateName: 'Empty',
      stateValue: { modelValue: undefined, options },
    },
  ],
};

const sizeStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const placeholderStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const labelStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const isErrorStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const errorTextsStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const iconLeftStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
  title: 'Left icon',
  states: [
    {
      stateName: '',
      stateValue: { iconLeft: IconName.IconArrowLeft, modelValue: undefined, options },
    },
    {
      stateName: '',
      stateValue: { iconLeft: IconName.IconMagnifier, modelValue: undefined, options },
    },
  ],
};

const disabledStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const requiredStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
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

const titleStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
  title: 'Title state',
  states: [
    {
      stateName: 'With title',
      stateValue: { title: 'Title', modelValue: undefined, options },
    },
    {
      stateName: 'Without title',
      stateValue: { modelValue: undefined, options },
    },
  ],
};

const countStates: ComponentPropStates<ISmartInputProps<SelectKeyType>> = {
  title: 'Count state',
  states: [
    {
      stateName: 'With count',
      stateValue: { count: 5, modelValue: undefined, options },
    },
    {
      stateName: 'Without count',
      stateValue: { modelValue: undefined, options },
    },
  ],
};
</script>
