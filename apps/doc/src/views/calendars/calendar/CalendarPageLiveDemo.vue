<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(calendarselectPropsNames)"
            :key="`${propName}`"
          >
            <DateTimeInput
              v-if="isDate(propName) && calendarSelectRef"
              :model-value="calendarSelectRef.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue ?? new Date())"
            />
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="calendarSelectRef?.$props[propName]"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="calendarSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="calendarSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (calendarSelectProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="calendarSelectRef?.$props[propName] ?? null"
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
              v-else-if="isCalendarTypeKeysArray(propName) && calendarSelectRef"
              :model-value="calendarSelectRef.$props[propName]"
              :component-ref="calendarSelectRef"
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
          <CalendarSelect
            v-bind="calendarSelectProps"
            :key="`${calendarSelectProps.modelValue}`"
            ref="calendarSelectRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (calendarSelectProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalendarPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import { AppCheckbox } from '@libs/components/inputs';
import type { ICalendarSelectProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import InputSizeSelect from '@/views/inputs/input-prop-changer/InputSizeSelect.vue';
import { calendarselectPropsNames } from './utils/models';
import { isBoolean, isSize, isString, isNumber, isDate, isPredicate, isCalendarTypeKeysArray } from './utils';
import { CalendarSelect } from '@libs/components/selects';
import { CalendarType } from '@libs/components/calendars-enums';
import DateTimeInput from '../calendar-prop-changer/DateTimeInput.vue';
import IsInactiveRuleSelect from '../calendar-prop-changer/IsInactiveRuleSelect.vue';
import { InactiveRule, isInactiveRules } from '../utils/models';
import CalendarTypeSelect from '../calendar-prop-changer/CalendarTypeSelect.vue';

const calendarSelectRef = ref<InstanceType<typeof CalendarSelect>>();
const inactiveRule = ref<InactiveRule>();

const calendarSelectProps = ref<ICalendarSelectProps>({
  modelValue: new Date(),
  calendarType: CalendarType.month,
});
</script>
