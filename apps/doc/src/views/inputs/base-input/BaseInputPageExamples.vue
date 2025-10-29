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
        iconLeftStates,
        iconRightStates,
        iconsRightShowModeStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() => import('@libs/components/inputs').then((libsComponents) => libsComponents.BaseInput))
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseInputPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import { IconName } from '@libs/components/icons-enums';
import type { IBaseInputProps } from '@libs/components/inputs-types';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';

const modelValueStates: ComponentPropStates<IBaseInputProps> = {
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

const sizeStates: ComponentPropStates<IBaseInputProps> = {
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

const placeholderStates: ComponentPropStates<IBaseInputProps> = {
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

const labelStates: ComponentPropStates<IBaseInputProps> = {
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

const isErrorStates: ComponentPropStates<IBaseInputProps> = {
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

const errorTextsStates: ComponentPropStates<IBaseInputProps> = {
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

const isCorrectedStates: ComponentPropStates<IBaseInputProps> = {
  title: 'Corrected state',
  states: [
    {
      stateName: 'Correct',
      stateValue: { isCorrect: true, modelValue: '' },
    },
  ],
};

const iconLeftStates: ComponentPropStates<IBaseInputProps> = {
  title: 'Left icon',
  states: [
    {
      stateName: '',
      stateValue: { iconLeft: IconName.IconArrowLeft, modelValue: '' },
    },
    {
      stateName: '',
      stateValue: { iconLeft: IconName.IconMagnifier, modelValue: '' },
    },
  ],
};

const iconRightStates: ComponentPropStates<IBaseInputProps> = {
  title: 'Right icon',
  states: [
    {
      stateName: '',
      stateValue: { iconRight: { iconName: IconName.IconArrowLeft }, modelValue: '' },
    },
    {
      stateName: '',
      stateValue: { iconRight: { iconName: IconName.IconMagnifier }, modelValue: '' },
    },
  ],
};

const iconsRightShowModeStates: ComponentPropStates<IBaseInputProps> = {
  title: 'Icon right show modes',
  states: [
    {
      stateName: 'All time',
      stateValue: { iconRightShowMode: 'AllTime', iconRight: { iconName: IconName.IconMagnifier }, modelValue: '' },
    },
    {
      stateName: 'On focus',
      stateValue: { iconRightShowMode: 'OnFocus', iconRight: { iconName: IconName.IconMagnifier }, modelValue: '' },
    },
  ],
};

const disabledStates: ComponentPropStates<IBaseInputProps> = {
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

const requiredStates: ComponentPropStates<IBaseInputProps> = {
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
