<template>
  <BaseSelectDropDown>
    <template #input="{ toggleDropDown }">
      <DateRangeInput
        v-bind="$props"
        v-model:min-value="valueMinLocal"
        v-model:max-value="valueMaxLocal"
        @click:icon-right="() => toggleDropDown()"
      />
    </template>
    <template #dropDown="{ registerCallSection, unregisterCallSection, setDropDownVisibility }">
      <AppCalendarRange
        v-model:min-value="valueMinLocal"
        v-model:max-value="valueMaxLocal"
        :calendar-type="calendarType"
        :is-inactive-rule="isInactiveRule"
        class="border-md w-144 shadow-24 px-8 py-5"
        @vue:mounted="registerCallSection"
        @vue:unmounted="unregisterCallSection"
        @set:date-range="() => setDropDownVisibility(false)"
      />
    </template>
  </BaseSelectDropDown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Size } from '@comp/enums';
import BaseSelectDropDown from '@comp/components/selects/BaseSelectDropDown.vue';
import DateRangeInput from '@comp/components/inputs/DateRangeInput.vue';
import type { ICalendarRangeSelectProps } from '@comp/components/inputs/utils/models';
import AppCalendarRange from '@comp/components/AppCalendarRange.vue';

const props = withDefaults(defineProps<ICalendarRangeSelectProps>(), {
  size: Size.S,
  showError: true,
});

const emit = defineEmits<{
  (eventName: 'update:minValue', newValue: Date | undefined): void;
  (eventName: 'update:maxValue', newValue: Date | undefined): void;
}>();

const valueMinLocal = computed<Date | undefined>({
  get() {
    return props.minValue;
  },
  set(newValue): void {
    emit('update:minValue', newValue);
  },
});

const valueMaxLocal = computed<Date | undefined>({
  get() {
    return props.maxValue;
  },
  set(newValue): void {
    emit('update:maxValue', newValue);
  },
});
</script>
