<template>
  <BaseCalendar
    v-slot="{ showPopup, closePopup }"
    popup-text="Дата&nbsp;недоступна для выбора"
    :is-icon-arrow-right-disabled="isNextMonthDisabled"
    :is-icon-arrow-left-disabled="isPreviousMonthDisabled"
    @on-icon-arrow-left-click="() => (displayDate = changeMonth(subMonths(displayDate, 1), isInactiveRule))"
    @on-icon-arrow-right-click="() => (displayDate = changeMonth(addMonths(displayDate, 1), isInactiveRule))"
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
        v-for="(day, index) in monthCalendar.days"
        :key="`day_${monthCalendar.year}_${monthCalendar.month.index}_${index}`"
      >
        <CalendarDayCell
          :day="day"
          @click:date="(target: MouseEvent) => onPick(target, day, showPopup, closePopup)"
        />
        <div
          v-if="(index + 1) % 7 === 0"
          class="h-0 basis-full"
        />
      </template>
    </div>
  </BaseCalendar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseCalendar from '@comp/components/calendars/BaseCalendar.vue';
import { calculateMonthCalendar, changeMonth } from '@comp/components/calendars/utils';
import type { ICalendarProps, IDay } from '@comp/components/calendars/utils/models';
import { subMonths, addMonths } from '@comp/utils/date';
import { isMonthDisabled } from '@comp/components/calendars/utils';
import CalendarDayCell from '@comp/components/calendars/CalendarDayCell.vue';

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
const monthCalendar = computed(() => calculateMonthCalendar(displayDate.value, model.value, props.isInactiveRule));
const isNextMonthDisabled = computed(() => isMonthDisabled(addMonths(displayDate.value, 1), props.isInactiveRule));
const isPreviousMonthDisabled = computed(() => isMonthDisabled(subMonths(displayDate.value, 1), props.isInactiveRule));

const cellStyle = 'flex h-8 w-8 items-center justify-center text-size-5';

const onPick = (target: MouseEvent, day: IDay, showPopup: (target: MouseEvent) => void, closePopup: () => void) => {
  if (day.inactive) {
    showPopup(target);
    return;
  }

  closePopup();

  if (day.active || day.prevMonth || day.nextMonth) {
    return;
  }

  const currentMonth = new Date(monthCalendar.value.year, monthCalendar.value.month.index - 1);
  let newMonth = currentMonth;
  if ((day as IDay).prevMonth) {
    newMonth = subMonths(currentMonth, 1);
  } else if ((day as IDay).nextMonth) {
    newMonth = addMonths(currentMonth, 1);
  }
  const newDate = new Date(newMonth.getFullYear(), newMonth.getMonth(), day.value);
  displayDate.value = newDate;
  model.value = newDate;
  emit('click:date', newDate);
};
</script>
