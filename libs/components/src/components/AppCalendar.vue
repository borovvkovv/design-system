<template>
  <component
    :is="calendarComponent"
    v-model="model"
    :is-inactive-rule="isInactiveRule"
    @click:date="(newDate: Date) => emit('click:date', newDate)"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch } from 'vue';
import type { CalendarType } from '@comp/components/calendars/utils/models';

const props = defineProps<{
  calendarType: CalendarType;
  modelValue: Date;
  isInactiveRule?: (date: Date) => boolean;
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: Date): void;
  (eventName: 'click:date', newValue: Date): void;
}>();

const model = computed({
  get(): Date {
    return props.modelValue;
  },
  set(newValue: Date): void {
    emit('update:modelValue', newValue);
  },
});

const calendarComponent = shallowRef<Object>(
  defineAsyncComponent(() => import(`./calendars/${props.calendarType}.vue`)),
);

watch(
  () => props.calendarType,
  function () {
    calendarComponent.value = defineAsyncComponent<Object>(() => import(`./calendars/${props.calendarType}.vue`));
  },
);
</script>

<style module lang="scss"></style>
