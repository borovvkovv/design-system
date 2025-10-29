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
        showErrorStates,
        calendarTypeStates,
        predicateStates,
        inactiveErrorTextStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/selects').then((libsComponents) => libsComponents.CalendarSelect),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalendarPageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';
import type { ICalendarSelectProps } from '@libs/components/inputs-types';
import { CalendarType } from '@libs/components/calendars-enums';
import { startOfDay } from '@/utils/date';

const modelValueStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Date',
  states: [
    {
      stateName: 'Selected',
      stateValue: {
        modelValue: new Date(),
        calendarType: CalendarType.month,
        minWidth: 400,
      },
    },
  ],
};

const sizeStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Size',
  states: [
    {
      stateName: 'XS',
      stateValue: { size: Size.XS, modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'S',
      stateValue: { size: Size.S, modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'M',
      stateValue: { size: Size.M, modelValue: new Date(), calendarType: CalendarType.month },
    },
  ],
};

const placeholderStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Placeholder',
  states: [
    {
      stateName: 'With placeholder',
      stateValue: { placeholder: 'Placeholder', modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'Without placeholder',
      stateValue: { placeholder: undefined, modelValue: new Date(), calendarType: CalendarType.month },
    },
  ],
};

const labelStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Label',
  states: [
    {
      stateName: 'Without label',
      stateValue: { label: undefined, modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'With label',
      stateValue: { label: 'Label', modelValue: new Date(), calendarType: CalendarType.month },
    },
  ],
};

const showErrorStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Error state',
  states: [
    {
      stateName: 'Error',
      stateValue: {
        showError: true,
        modelValue: new Date(),
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
      },
    },
    {
      stateName: 'No error',
      stateValue: {
        showError: false,
        modelValue: new Date(),
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
      },
    },
  ],
};

const disabledStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { disabled: true, modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'Enabled',
      stateValue: { disabled: false, modelValue: new Date(), calendarType: CalendarType.month },
    },
  ],
};

const requiredStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Required state',
  states: [
    {
      stateName: 'Required',
      stateValue: { required: true, modelValue: new Date(), calendarType: CalendarType.month, label: 'Label' },
    },
    {
      stateName: 'Not required',
      stateValue: { required: false, modelValue: new Date(), calendarType: CalendarType.month, label: 'Label' },
    },
  ],
};

const calendarTypeStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Type',
  states: [
    {
      stateName: 'Month',
      stateValue: { modelValue: new Date(), calendarType: CalendarType.month },
    },
    {
      stateName: 'Year',
      stateValue: { modelValue: new Date(), calendarType: CalendarType.year },
    },
    {
      stateName: 'Years',
      stateValue: { modelValue: new Date(), calendarType: CalendarType.years },
    },
  ],
};

const predicateStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Inactive rule',
  states: [
    {
      stateName: 'Without inactive rule',
      stateValue: {
        modelValue: new Date(),
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'With inactive rule',
      stateValue: {
        modelValue: new Date(),
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() !== startOfDay(date).toISOString(),
      },
    },
  ],
};

const inactiveErrorTextStates: ComponentPropStates<ICalendarSelectProps> = {
  title: 'Inactive error text',
  states: [
    {
      stateName: 'Without inactive error text',
      stateValue: {
        modelValue: new Date(),
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'With inactive error text',
      stateValue: {
        modelValue: new Date(),
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
        showError: true,
        inactiveErrorText: 'Inactive Error Text',
      },
    },
  ],
};
</script>
