<template>
  <component
    :is="calendarComponent"
    v-model:min-value="minValueLocal"
    v-model:max-value="maxValueLocal"
    :is-inactive-rule="isInactiveRule"
    @set:date-range="() => emit('set:dateRange')"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch } from 'vue';
import { CalendarTypeForCalendarRange, type CalendarType } from '@comp/components/calendars/utils/models';

const props = defineProps<{
  calendarType: CalendarType;
  minValue: Date | undefined;
  maxValue: Date | undefined;
  isInactiveRule?: (date: Date) => boolean;
}>();

const emit = defineEmits<{
  (eventName: 'update:minValue', newValue: Date | undefined): void;
  (eventName: 'update:maxValue', newValue: Date | undefined): void;
  (eventName: 'set:dateRange'): void;
}>();

const minValueLocal = computed<Date | undefined>({
  get() {
    return props.minValue;
  },
  set(newValue): void {
    emit('update:minValue', newValue);
  },
});

const maxValueLocal = computed<Date | undefined>({
  get() {
    return props.maxValue;
  },
  set(newValue): void {
    emit('update:maxValue', newValue);
  },
});

const calendarComponent = shallowRef<Object>(
  defineAsyncComponent(() => import(`./calendars/${CalendarTypeForCalendarRange[props.calendarType]}.vue`)),
);

watch(
  () => props.calendarType,
  () => {
    calendarComponent.value = defineAsyncComponent<Object>(
      () => import(`./calendars/${CalendarTypeForCalendarRange[props.calendarType]}.vue`),
    );
  },
);
</script>
