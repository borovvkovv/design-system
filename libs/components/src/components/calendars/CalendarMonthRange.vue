<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Дата&nbsp;недоступна для выбора"
    :is-icon-arrow-right-disabled="isNextMonthDisabled"
    :is-icon-arrow-left-disabled="isPreviousMonthDisabled"
    @on-icon-arrow-left-click="onIconArrowLeftClick"
    @on-icon-arrow-right-click="onIconArrowRightClick"
  >
    <div class="flex gap-x-8">
      <div
        v-for="(monthCalendar, index) in [minMonthCalendar, maxMonthCalendar]"
        :key="index"
        data-test-month
        class="grow"
      >
        <h4>{{ `${monthCalendar.month.name} ${monthCalendar.year}` }}</h4>
        <div class="border-b-blueGrey-4 text-grey-2 mt-5 flex justify-between border-b py-1">
          <div
            v-for="dayName in ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']"
            :key="dayName"
            :class="cellStyle"
          >
            {{ dayName }}
          </div>
        </div>
        <div class="mt-2 flex flex-wrap justify-between">
          <template
            v-for="(day, dayIndex) in monthCalendar.days"
            :key="`day_${monthCalendar.year}_${monthCalendar.month.index}_${dayIndex}`"
          >
            <CalendarDayCell
              :day="day"
              @click:date="(target: MouseEvent) => onPick(target, day, monthCalendar, showPopup, closePopup)"
            />
            <div
              v-if="(dayIndex + 1) % 7 === 0"
              class="h-0 basis-full"
            />
          </template>
        </div>
      </div>
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { calculateMonthRangeCalendar, changeMonth, isMonthDisabled } from '@comp/components/calendars/utils';
import type { ICalendarRangeProps, IDayRange, IMonthCalendarRange } from '@comp/components/calendars/utils/models';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import { addMonths, subMonths } from '@comp/utils/date';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';

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

const minDisplayDate = ref(props.maxValue ? subMonths(props.maxValue, 1) : (props.minValue ?? new Date()));
const maxDisplayDate = ref(props.maxValue ? props.maxValue : addMonths(props.minValue ?? new Date(), 1));

const minMonthCalendar = computed(() =>
  calculateMonthRangeCalendar(minDisplayDate.value, props.minValue, props.maxValue, props.isInactiveRule),
);
const maxMonthCalendar = computed(() =>
  calculateMonthRangeCalendar(maxDisplayDate.value, props.minValue, props.maxValue, props.isInactiveRule),
);

const isNextMonthDisabled = computed(() => isMonthDisabled(addMonths(maxDisplayDate.value, 1), props.isInactiveRule));
const isPreviousMonthDisabled = computed(() =>
  isMonthDisabled(subMonths(minDisplayDate.value, 1), props.isInactiveRule),
);

const cellStyle = 'flex h-8 w-8 items-center justify-center text-size-5';

const onPick = (
  target: MouseEvent,
  day: IDayRange,
  monthCalendar: IMonthCalendarRange,
  showPopup: (target: MouseEvent) => void,
  closePopup: () => void,
) => {
  if (day.inactive) {
    showPopup(target);
    return;
  }

  closePopup();

  if (day.prevMonth || day.nextMonth) {
    return;
  }

  const newDate = new Date(monthCalendar.year, monthCalendar.month.index - 1, day.value);

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
  minDisplayDate.value = changeMonth(subMonths(minDisplayDate.value, 1), props.isInactiveRule);
  maxDisplayDate.value = changeMonth(subMonths(maxDisplayDate.value, 1), props.isInactiveRule);
};

const onIconArrowRightClick = () => {
  minDisplayDate.value = changeMonth(addMonths(minDisplayDate.value, 1), props.isInactiveRule);
  maxDisplayDate.value = changeMonth(addMonths(maxDisplayDate.value, 1), props.isInactiveRule);
};
</script>
