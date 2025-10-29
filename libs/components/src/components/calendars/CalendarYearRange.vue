<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Месяц&nbsp;недоступен для выбора"
    :is-icon-arrow-right-disabled="isNextYearDisabled"
    :is-icon-arrow-left-disabled="isPreviousYearDisabled"
    @on-icon-arrow-left-click="onIconArrowLeftClick"
    @on-icon-arrow-right-click="onIconArrowRightClick"
  >
    <div class="flex gap-x-8">
      <div
        v-for="(yearCalendar, index) in [minYearCalendar, maxYearCalendar]"
        :key="index"
        data-test-year
      >
        <h4>{{ `${yearCalendar.year}` }}</h4>
        <div class="mt-2 flex flex-wrap justify-between">
          <CalendarMonthCell
            v-for="(month, monthsIndex) in yearCalendar.months"
            :key="`day_${yearCalendar.year}_${monthsIndex}`"
            :month="month"
            @click:date="(target: MouseEvent) => onPick(target, month, yearCalendar, showPopup, closePopup)"
          />
        </div>
      </div>
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateYearRangeCalendar, changeYear, isYearDisabled } from '@comp/components/calendars/utils';
import type { ICalendarRangeProps, IMonthRange, IYearCalendarRange } from '@comp/components/calendars/utils/models';
import { addYears, subYears } from '@comp/utils/date';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import CalendarMonthCell from '@comp/components/calendars/CalendarMonthCell.vue';

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

const minDisplayDate = ref(props.maxValue ? subYears(props.maxValue, 1) : (props.minValue ?? new Date()));
const maxDisplayDate = ref(props.maxValue ? props.maxValue : addYears(props.minValue ?? new Date(), 1));

const minYearCalendar = computed(() =>
  calculateYearRangeCalendar(minDisplayDate.value, props.minValue, props.maxValue, props.isInactiveRule),
);
const maxYearCalendar = computed(() =>
  calculateYearRangeCalendar(maxDisplayDate.value, props.minValue, props.maxValue, props.isInactiveRule),
);

const isNextYearDisabled = computed(() => isYearDisabled(maxYearCalendar.value.year + 1, props.isInactiveRule));
const isPreviousYearDisabled = computed(() => isYearDisabled(minYearCalendar.value.year - 1, props.isInactiveRule));

const onPick = (
  target: MouseEvent,
  month: IMonthRange,
  monthCalendar: IYearCalendarRange,
  showPopup?: (target: MouseEvent) => void,
  closePopup?: () => void,
) => {
  if (month.inactive) {
    showPopup?.(target);
    return;
  }

  closePopup?.();

  const newDate = new Date(monthCalendar.year, month.index);
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
  minDisplayDate.value = changeYear(subYears(minDisplayDate.value, 1), props.isInactiveRule);
  maxDisplayDate.value = changeYear(subYears(maxDisplayDate.value, 1), props.isInactiveRule);
};

const onIconArrowRightClick = () => {
  minDisplayDate.value = changeYear(addYears(minDisplayDate.value, 1), props.isInactiveRule);
  maxDisplayDate.value = changeYear(addYears(maxDisplayDate.value, 1), props.isInactiveRule);
};
</script>
