<template>
  <SimpleSelect
    :model-value="calendarTypeMode"
    :options="stringSizeOptions"
    :size="Size.XS"
    :label="calendarTypePropName"
    @update:model-value="
      (newValue) => {
        if (newValue) calendarTypeMode = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'CalendarTypeSelect',
};
</script>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import { CalendarType } from '@libs/components/calendars-enums';
import type { ICalendarSelectProps } from '@libs/components/inputs-types';

const props = defineProps<{
  componentRef: ComponentInstance<any>;
}>();

const calendarTypePropName: keyof Pick<ICalendarSelectProps, 'calendarType'> = 'calendarType';
const calendarTypes: { [P in CalendarType]: P } = {
  [CalendarType.month]: CalendarType.month,
  [CalendarType.year]: CalendarType.year,
  [CalendarType.years]: CalendarType.years,
};

const calendarType = defineModel<CalendarType>({ required: true });

const stringSizeOptions: ISelectItem<CalendarType>[] = Object.values(calendarTypes).map((calendarType) => ({
  title: calendarType.toString(),
  value: calendarType,
}));

const calendarTypeMode = computed<ISelectItem<CalendarType>>({
  get() {
    return {
      title: props.componentRef.$props[calendarTypePropName].toString(),
      value: props.componentRef.$props[calendarTypePropName] as CalendarType,
    };
  },
  set(newValue) {
    calendarType.value = newValue?.value;
  },
});
</script>
