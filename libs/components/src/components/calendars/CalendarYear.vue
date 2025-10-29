<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Месяц&nbsp;недоступен для выбора"
    :is-icon-arrow-right-disabled="isNextYearDisabled"
    :is-icon-arrow-left-disabled="isPreviousYearDisabled"
    @on-icon-arrow-left-click="() => (displayDate = changeYear(subYears(displayDate, 1), isInactiveRule))"
    @on-icon-arrow-right-click="() => (displayDate = changeYear(addYears(displayDate, 1), isInactiveRule))"
  >
    <h4>{{ `${monthCalendar.year}` }}</h4>
    <div class="mt-2 flex flex-wrap justify-between">
      <CalendarMonthCell
        v-for="(month, index) in monthCalendar.months"
        :key="`day_${monthCalendar.year}_${index}`"
        :month="month"
        @click="(target: MouseEvent) => onPick(target, month, showPopup, closePopup)"
      />
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateYearCalendar, changeYear, isYearDisabled } from '@comp/components/calendars/utils';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import type { ICalendarProps, IMonth } from '@comp/components/calendars/utils/models';
import { addYears, subYears } from '@comp/utils/date';
import CalendarMonthCell from '@comp/components/calendars/CalendarMonthCell.vue';

const props = defineProps<ICalendarProps>();

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

const displayDate = ref(model);
const monthCalendar = computed(() => calculateYearCalendar(displayDate.value, model.value, props.isInactiveRule));
const isNextYearDisabled = computed(() => isYearDisabled(monthCalendar.value.year + 1, props.isInactiveRule));
const isPreviousYearDisabled = computed(() => isYearDisabled(monthCalendar.value.year - 1, props.isInactiveRule));

const onPick = (target: MouseEvent, month: IMonth, showPopup: (target: MouseEvent) => void, closePopup: () => void) => {
  if (month.inactive) {
    showPopup(target);
    return;
  }

  closePopup();

  if (month.active) {
    return;
  }

  const currentDate = new Date(monthCalendar.value.year, month.index);
  displayDate.value = currentDate;
  model.value = currentDate;
  emit('click:date', currentDate);
};
</script>
