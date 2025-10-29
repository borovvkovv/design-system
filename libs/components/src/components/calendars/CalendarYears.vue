<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Год&nbsp;недоступен для выбора"
    :is-icon-arrow-right-disabled="isNextDozenOfYearsDisabled"
    :is-icon-arrow-left-disabled="isPreviousDozenOfYearsDisabled"
    @on-icon-arrow-left-click="() => currentDozenOfYearsIndex++"
    @on-icon-arrow-right-click="() => currentDozenOfYearsIndex--"
  >
    <h4>Год</h4>
    <div class="mt-2 flex flex-wrap justify-between">
      <CalendarYearCell
        v-for="(year, index) in yearsCalendar.years"
        :key="`day_${year}_${index}`"
        :year="year"
        @click:date="(target: MouseEvent) => onPick(target, year, showPopup, closePopup)"
      />
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateYearsCalendar, isDozenOfYearsDisabled } from '@comp/components/calendars/utils';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import { YEARS_IN_CALENDAR, type ICalendarItem, type ICalendarProps } from '@comp/components/calendars/utils/models';
import CalendarYearCell from '@comp/components/calendars/CalendarYearCell.vue';

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

const calculateInitialDozenOfYearsIndex = () => {
  const nowYear = new Date().getFullYear();
  const modelYear = model.value.getFullYear();
  const isModelYearOlder = nowYear < modelYear;
  const dozenOfYears = Math.floor(Math.abs(modelYear - nowYear) / YEARS_IN_CALENDAR);

  return (dozenOfYears + (isModelYearOlder ? 0 : 1)) * (isModelYearOlder ? -1 : 1);
};

const currentDozenOfYearsIndex = ref(calculateInitialDozenOfYearsIndex());
const yearsCalendar = computed(() =>
  calculateYearsCalendar(currentDozenOfYearsIndex.value, model.value, props.isInactiveRule),
);
const isNextDozenOfYearsDisabled = computed(() =>
  isDozenOfYearsDisabled(yearsCalendar.value.years[0].value + YEARS_IN_CALENDAR, props.isInactiveRule),
);
const isPreviousDozenOfYearsDisabled = computed(() =>
  isDozenOfYearsDisabled(yearsCalendar.value.years[0].value - YEARS_IN_CALENDAR, props.isInactiveRule),
);

const onPick = (
  target: MouseEvent,
  year: ICalendarItem,
  showPopup: (target: MouseEvent) => void,
  closePopup: () => void,
) => {
  if (year.inactive) {
    showPopup(target);
    return;
  }

  closePopup();

  if (year.active) {
    return;
  }

  const newDate = new Date(year.value, 0);
  model.value = newDate;
  emit('click:date', newDate);
};
</script>
