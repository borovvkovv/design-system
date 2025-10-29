<template>
  <div :class="[attrs.class]">
    <label
      v-if="label"
      class="font-size-5 text-grey-1 mb-2 block"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div :class="inputContainerStyle">
        <div class="flex flex-nowrap">
          <span
            ref="minDateText"
            :class="[inputStyle, 'invisible absolute']"
            @vue:mounted="minDateText && minDateTextResizeObserver.observe(minDateText)"
            @vue:unmounted="minDateText && minDateTextResizeObserver.unobserve(minDateText)"
          />
          <input
            ref="elMin"
            v-bind="{ ...attrs, class: '' }"
            :value="minDateAsString"
            :type="InputType.Text"
            :placeholder="placeholderForMinValue"
            :disabled="disabled"
            :class="inputStyle"
            @change="
              (evt: Event) => {
                minDateAsString = (evt.target as HTMLInputElement).value;
              }
            "
          />
          <span class="text-grey-1 mx-1 inline-block shrink-0">&ndash;</span>
          <input
            ref="elMax"
            v-bind="{ ...attrs, class: '' }"
            :value="maxDateAsString"
            :type="InputType.Text"
            :placeholder="placeholderForMaxValue"
            :disabled="disabled"
            :class="inputStyle"
            @change="
              (evt: Event) => {
                maxDateAsString = (evt.target as HTMLInputElement).value;
              }
            "
          />
        </div>
        <span
          :class="[
            'min-h-4 min-w-4',
            'jusify-center flex items-center',
            'text-blueGrey-2 cursor-pointer',
            'absolute right-4',
            size === Size.S ? 'top-2.5' : 'top-3.5',
            disabled ? 'pointer-events-none' : 'pointer-events-auto',
          ]"
          @click="emit('click:iconRight')"
        >
          <AppIcon
            :icon="IconName.IconCalendar"
            :size="20"
          />
        </span>
      </div>
      <InputErrorsList
        v-if="isError"
        :error-list="errorTexts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import { Size } from '@comp/enums';
import { useIMask } from 'vue-imask';
import { IconName } from '@comp/components/icons/utils/models';
import { CalendarType } from '@comp/components/calendars/utils/models';
import AppIcon from '@comp/components/AppIcon.vue';
import { InputType, type IDateRangeInputProps } from '@comp/components/inputs/utils/models';
import {
  getFormattedCalendarDate,
  getValidDateFromRange,
  getCalendarTypePlaceholder,
  getIMaskOptions,
} from '@comp/components/inputs/utils';
import InputErrorsList from '@comp/components/inputs/InputErrorsList.vue';

const props = withDefaults(defineProps<IDateRangeInputProps>(), {
  calendarType: CalendarType.month,
  label: '',
  disabled: false,
  minWidth: 320,
  size: Size.M,
  showError: true,
});

const emit = defineEmits<{
  (eventName: 'update:minValue', newValue: Date | undefined): void;
  (eventName: 'update:maxValue', newValue: Date | undefined): void;
  (eventName: 'click:iconRight'): void;
}>();

const attrs = useAttrs();
const minDateText = ref<HTMLElement | undefined>();

const inputContainerStyle = computed(() => {
  const styles = [
    'flex justify-between',
    'border rounded-md',
    'pr-13 pl-4',
    'm-0',
    'w-full box-border',
    props.size === Size.S ? 'py-1.75' : 'py-2.75',
    isError.value ? 'border-red-3' : 'border-blueGrey-4',
    props.disabled ? 'bg-grey-5' : 'bg-transparent',
  ];

  if (isError.value) styles.push('hover:border-red-2 active:border-red-2 focus:border-red-2');
  else if (props.disabled) styles.push('hover:border-blueGrey-4 active:border-blueGrey-4 focus:border-blueGrey-4');
  else styles.push('hover:border-blueGrey-3 active:border-blueGrey-3 focus:border-blueGrey-3');

  return styles;
});

const inputStyle = ['text-black-1 text-size-5', 'p-0 m-0 min-w-8', 'placeholder:text-grey-2', 'disabled:text-grey-2'];

const minDateAsString = computed({
  get(): string {
    return getFormattedCalendarDate(props.minValue, props.calendarType);
  },
  set(newDate: string): void {
    const regex = /[^\d]/g;
    (elMin.value as HTMLInputElement).value = '';

    switch (props.calendarType) {
      case CalendarType.month: {
        const [day, month, year] = newDate.split(regex);
        const newValidDate = getValidDateFromRange(
          props.calendarType,
          true,
          day,
          month,
          year,
          props.isInactiveRule,
          props.showError,
          props.maxValue,
        );
        emit('update:minValue', newValidDate);
        break;
      }
      case CalendarType.year: {
        let [month, year] = newDate.split(regex);

        const newValidDate = getValidDateFromRange(
          props.calendarType,
          true,
          '1',
          month,
          year,
          props.isInactiveRule,
          props.showError,
          props.maxValue,
        );
        emit('update:minValue', newValidDate);
        break;
      }
      case CalendarType.years: {
        const newValidDate = getValidDateFromRange(
          props.calendarType,
          true,
          '1',
          '1',
          newDate,
          props.isInactiveRule,
          props.showError,
          props.maxValue,
        );
        emit('update:minValue', newValidDate);
        break;
      }
    }
  },
});

const maxDateAsString = computed({
  get(): string {
    return getFormattedCalendarDate(props.maxValue, props.calendarType);
  },
  set(newDate: string): void {
    const regex = /[^\d]/g;
    (elMax.value as HTMLInputElement).value = '';

    switch (props.calendarType) {
      case CalendarType.month: {
        const [day, month, year] = newDate.split(regex);

        const newValidDate = getValidDateFromRange(
          props.calendarType,
          false,
          day,
          month,
          year,
          props.isInactiveRule,
          props.showError,
          props.minValue,
        );
        emit('update:maxValue', newValidDate);
        break;
      }
      case CalendarType.year: {
        let [month, year] = newDate.split(regex);

        const newValidDate = getValidDateFromRange(
          props.calendarType,
          false,
          '1',
          month,
          year,
          props.isInactiveRule,
          props.showError,
          props.minValue,
        );
        emit('update:maxValue', newValidDate);
        break;
      }
      case CalendarType.years: {
        const newValidDate = getValidDateFromRange(
          props.calendarType,
          false,
          '1',
          '1',
          newDate,
          props.isInactiveRule,
          props.showError,
          props.minValue,
        );
        emit('update:maxValue', newValidDate);
        break;
      }
    }
  },
});

const placeholderForMinValue = computed(
  () => props.placeholderForMinValue ?? getCalendarTypePlaceholder(props.calendarType),
);
const placeholderForMaxValue = computed(
  () => props.placeholderForMaxValue ?? getCalendarTypePlaceholder(props.calendarType),
);

const { el: elMin, masked: maskedMin } = useIMask(getIMaskOptions(props.calendarType));
const { el: elMax, masked: maskedMax } = useIMask(getIMaskOptions(props.calendarType));

const isError = computed(() => {
  if (props.isError) return true;

  if (!props.showError && (isNaN(props.minValue?.getDate() ?? 0) || isNaN(props.maxValue?.getDate() ?? 0))) {
    return true;
  }

  if (props.showError && props.minValue && props.maxValue && props.minValue > props.maxValue) {
    return true;
  }

  return (
    (props.minValue && props.isInactiveRule?.call(undefined, props.minValue)) ||
    (props.maxValue && props.isInactiveRule?.call(undefined, props.maxValue))
  );
});

const errorTexts = computed(() => {
  if (props.isError) return props.errorList ?? [];

  if (!props.showError && (isNaN(Number(props.minValue)) || isNaN(Number(props.maxValue)))) {
    return ['Не найдена дата, подходящая под критерии'];
  }

  if (props.showError && props.minValue && props.maxValue && props.minValue > props.maxValue) {
    return ['Начальная дата не может быть позже конечной'];
  }

  return [props.inactiveErrorText ?? ''];
});

const minDateTextResizeObserver = new ResizeObserver(() => {
  if (minDateText.value && elMin.value) {
    (elMin.value as HTMLElement).style.width = window.getComputedStyle(minDateText.value).getPropertyValue('width');
  }
});

watch(
  () => minDateAsString.value,
  () => {
    maskedMin.value = minDateAsString.value;
  },
);

watch(
  () => maxDateAsString.value,
  () => {
    maskedMax.value = maxDateAsString.value;
  },
);

watch([maskedMin, elMin], () => {
  if (minDateText.value && elMin.value) {
    minDateText.value.innerText = maskedMin.value ? maskedMin.value : placeholderForMinValue.value;
  }
});
</script>
