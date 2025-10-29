<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Год&nbsp;недоступен для выбора"
    :is-icon-arrow-right-disabled="isNextDozenOfYearsDisabled"
    :is-icon-arrow-left-disabled="isPreviousDozenOfYearsDisabled"
    @on-icon-arrow-left-click="onIconArrowLeftClick"
    @on-icon-arrow-right-click="onIconArrowRightClick"
  >
    <div class="flex gap-x-8">
      <div
        v-for="(monthCalendar, index) in [minMonthCalendar, maxMonthCalendar]"
        :key="index"
        data-test-years
      >
        <h4>Год</h4>
        <div class="mt-2 flex flex-wrap justify-between">
          <CalendarYearCell
            v-for="(year, yearsIndex) in monthCalendar.years"
            :key="`day_${year}_${yearsIndex}`"
            :year="year"
            @click:date="(target: MouseEvent) => onPick(target, year, showPopup, closePopup)"
          />
        </div>
      </div>
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateYearsRangeCalendar, isDozenOfYearsDisabled } from '@comp/components/calendars/utils';
import { YEARS_IN_CALENDAR, type ICalendarRangeProps, type IYearRange } from '@comp/components/calendars/utils/models';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import CalendarYearCell from '@comp/components/calendars/CalendarYearCell.vue';

const props = defineProps<ICalendarRangeProps>();

const emit = defineEmits<{
  (eventName: 'update:minValue', newValue: Date | undefined): void;
  (eventName: 'update:maxValue', newValue: Date | undefined): void;
  (eventName: 'set:dateRange', newValue: Date): void;
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

const calculateInitialDozenOfYearsIndex = () => {
  const nowYear = new Date().getFullYear();
  const modelYear = props.maxValue?.getFullYear() ?? props.minValue?.getFullYear() ?? new Date().getFullYear();
  const isModelYearOlder = nowYear < modelYear;
  const dozenOfYears = Math.floor(Math.abs(modelYear - nowYear) / YEARS_IN_CALENDAR);

  return (dozenOfYears + (isModelYearOlder ? 0 : 1)) * (isModelYearOlder ? -1 : 1);
};

const maxDozenOfYearsIndex = ref(calculateInitialDozenOfYearsIndex());
const minDozenOfYearsIndex = ref(maxDozenOfYearsIndex.value + 1);

const minMonthCalendar = computed(() =>
  calculateYearsRangeCalendar(minDozenOfYearsIndex.value, props.minValue, props.maxValue, props.isInactiveRule),
);
const maxMonthCalendar = computed(() =>
  calculateYearsRangeCalendar(maxDozenOfYearsIndex.value, props.minValue, props.maxValue, props.isInactiveRule),
);

const isNextDozenOfYearsDisabled = computed(() =>
  isDozenOfYearsDisabled(maxMonthCalendar.value.years[0].value + YEARS_IN_CALENDAR, props.isInactiveRule),
);
const isPreviousDozenOfYearsDisabled = computed(() =>
  isDozenOfYearsDisabled(minMonthCalendar.value.years[0].value - YEARS_IN_CALENDAR, props.isInactiveRule),
);

const onPick = (
  target: MouseEvent,
  year: IYearRange,
  showPopup: (target: MouseEvent) => void,
  closePopup: () => void,
) => {
  if (year.inactive) {
    showPopup(target);
    return;
  }

  closePopup();

  const newDate = new Date(year.value, 0);
  if (maxValueLocal.value) {
    maxValueLocal.value = undefined;
    minValueLocal.value = newDate;
  } else if (minValueLocal.value) {
    if (newDate < minValueLocal.value) {
      minValueLocal.value = newDate;
    } else {
      maxValueLocal.value = newDate;
      emit('set:dateRange', newDate);
    }
  } else {
    minValueLocal.value = newDate;
  }
};

const onIconArrowLeftClick = () => {
  minDozenOfYearsIndex.value += 1;
  maxDozenOfYearsIndex.value += 1;
};

const onIconArrowRightClick = () => {
  minDozenOfYearsIndex.value -= 1;
  maxDozenOfYearsIndex.value -= 1;
};
</script>
