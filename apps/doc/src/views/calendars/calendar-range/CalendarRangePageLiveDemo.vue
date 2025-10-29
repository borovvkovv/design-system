<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(calendarRangePropsNames)"
            :key="`${propName}`"
          >
            <DateTimeInput
              v-if="isDate(propName) && calendarRangeSelectRef"
              :model-value="calendarRangeSelectRef.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="calendarRangeSelectRef?.$props[propName]"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="calendarRangeSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="calendarRangeSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="calendarRangeSelectRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <IsInactiveRuleSelect
              v-else-if="isPredicate(propName)"
              :model-value="inactiveRule"
              @update:model-value="
                (newValue) => {
                  inactiveRule = newValue;
                  if (newValue) calendarSelectProps[propName] = isInactiveRules[newValue];
                  else calendarSelectProps[propName] = undefined;
                }
              "
            />
            <CalendarTypeSelect
              v-else-if="isCalendarTypeKeysArray(propName) && calendarRangeSelectRef"
              :model-value="calendarRangeSelectRef.$props[propName]"
              :component-ref="calendarRangeSelectRef"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Компонент</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <CalendarRangeSelect
            v-bind="calendarSelectProps"
            :key="`${calendarSelectProps.minValue}-${calendarSelectProps.maxValue}`"
            ref="calendarRangeSelectRef"
            class="mx-auto max-w-full"
            @update:min-value="(newValue) => (calendarSelectProps.minValue = newValue)"
            @update:max-value="(newValue) => (calendarSelectProps.maxValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalendarRangePageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import { AppCheckbox } from '@libs/components/inputs';
import type { ICalendarRangeSelectProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import InputSizeSelect from '@/views/inputs/input-prop-changer/InputSizeSelect.vue';
import { calendarRangePropsNames } from './utils/models';
import { isBoolean, isSize, isString, isNumber, isDate, isPredicate, isCalendarTypeKeysArray } from './utils';
import { CalendarType } from '@libs/components/calendars-enums';
import DateTimeInput from '../calendar-prop-changer/DateTimeInput.vue';
import IsInactiveRuleSelect from '../calendar-prop-changer/IsInactiveRuleSelect.vue';
import { InactiveRule, isInactiveRules } from '../utils/models';
import CalendarTypeSelect from '../calendar-prop-changer/CalendarTypeSelect.vue';
import { CalendarRangeSelect } from '@libs/components/selects';
import { addDays } from '@/utils/date';

const calendarRangeSelectRef = ref<InstanceType<typeof CalendarRangeSelect>>();
const inactiveRule = ref<InactiveRule>();

const calendarSelectProps = ref<ICalendarRangeSelectProps>({
  minValue: new Date(),
  maxValue: addDays(new Date(), 10),
  calendarType: CalendarType.month,
});
</script>
