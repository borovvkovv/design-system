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
        isErrorStates,
        errorListStates,
      ]"
      :key="propStatesIndex"
      :prop-states="propStates"
      :component="
        defineAsyncComponent(() =>
          import('@libs/components/selects').then((libsComponents) => libsComponents.CalendarRangeSelect),
        )
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalendarRangePageExamples',
};
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Size } from '@libs/components/enums';
import type { ComponentPropStates } from '@/views/utils/models';
import PropExampleState from '@/views/common/PropExampleState.vue';
import type { ICalendarRangeSelectProps } from '@libs/components/inputs-types';
import { CalendarType } from '@libs/components/calendars-enums';
import { addDays, startOfDay } from '@/utils/date';

const modelValueStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Date',
  states: [
    {
      stateName: 'Not selected',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        minWidth: 400,
      },
    },
    {
      stateName: 'Min value selected',
      stateValue: {
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
        minWidth: 400,
      },
    },
    {
      stateName: 'Max value selected',
      stateValue: {
        minValue: new Date(),
        maxValue: addDays(new Date(), 7),
        calendarType: CalendarType.month,
        minWidth: 400,
      },
    },
  ],
};

const sizeStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Size',
  states: [
    {
      stateName: 'XS',
      stateValue: { size: Size.XS, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
    {
      stateName: 'S',
      stateValue: { size: Size.S, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
    {
      stateName: 'M',
      stateValue: { size: Size.M, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
  ],
};

const placeholderStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Placeholder',
  states: [
    {
      stateName: 'With placeholders',
      stateValue: {
        placeholderForMinValue: 'Min value placeholder',
        placeholderForMaxValue: 'Max value placeholder',
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'Without placeholders',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
  ],
};

const labelStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Label',
  states: [
    {
      stateName: 'Without label',
      stateValue: { label: undefined, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
    {
      stateName: 'With label',
      stateValue: { label: 'Label', minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
  ],
};

const showErrorStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Error state',
  states: [
    {
      stateName: 'Error',
      stateValue: {
        isError: true,
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
      },
    },
    {
      stateName: 'No error',
      stateValue: {
        showError: false,
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
      },
    },
  ],
};

const disabledStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Disabled state',
  states: [
    {
      stateName: 'Disabled',
      stateValue: { disabled: true, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
    {
      stateName: 'Enabled',
      stateValue: { disabled: false, minValue: undefined, maxValue: undefined, calendarType: CalendarType.month },
    },
  ],
};

const requiredStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Required state',
  states: [
    {
      stateName: 'Required',
      stateValue: {
        required: true,
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        label: 'Label',
      },
    },
    {
      stateName: 'Not required',
      stateValue: {
        required: false,
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        label: 'Label',
      },
    },
  ],
};

const calendarTypeStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Type',
  states: [
    {
      stateName: 'Month',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'Year',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.year,
      },
    },
    {
      stateName: 'Years',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.years,
      },
    },
  ],
};

const predicateStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Inactive rule',
  states: [
    {
      stateName: 'Without inactive rule',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'With inactive rule',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() !== startOfDay(date).toISOString(),
      },
    },
  ],
};

const inactiveErrorTextStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Inactive error text',
  states: [
    {
      stateName: 'Without inactive error text',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'With inactive error text',
      stateValue: {
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
        isInactiveRule: (date) => startOfDay(new Date()).toISOString() === startOfDay(date).toISOString(),
        showError: true,
        inactiveErrorText: 'Inactive error text',
      },
    },
  ],
};

const isErrorStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Inactive error text',
  states: [
    {
      stateName: 'Without error',
      stateValue: {
        minValue: undefined,
        maxValue: undefined,
        calendarType: CalendarType.month,
        isError: false,
      },
    },
    {
      stateName: 'With error',
      stateValue: {
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
        isError: true,
      },
    },
  ],
};

const errorListStates: ComponentPropStates<ICalendarRangeSelectProps> = {
  title: 'Error texts',
  states: [
    {
      stateName: 'One error',
      stateValue: {
        isError: true,
        errorList: ['error'],
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'Two errors',
      stateValue: {
        isError: true,
        errorList: ['error', 'error'],
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
    {
      stateName: 'Three errors',
      stateValue: {
        isError: true,
        errorList: ['error', 'error', 'error'],
        minValue: new Date(),
        maxValue: undefined,
        calendarType: CalendarType.month,
      },
    },
  ],
};
</script>
