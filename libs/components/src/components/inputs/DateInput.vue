<template>
  <div :class="[style.main, attrs.class]">
    <InputLabel
      v-if="label"
      :label="label"
      :required="required"
    />
    <div :class="style.inputContainer">
      <input
        ref="el"
        v-bind="{ ...attrs, class: '' }"
        :value="dateAsString"
        :type="InputType.Text"
        :placeholder="placeholder"
        :class="inputStyle"
        :disabled="disabled"
        @keydown.enter="onKeyDownEnter"
        @change="
          (evt: Event) => {
            dateAsString = (evt.target as HTMLInputElement).value;
          }
        "
      />
      <span
        :class="[style.icon, disabled && style.iconRight_disabled, style.iconRight, size === Size.S && style.icon_s]"
        @click="emit('click:iconRight')"
      >
        <AppIcon
          :icon="IconName.IconCalendar"
          :size="20"
        />
      </span>
      <InputErrorsList
        v-if="isError"
        :error-list="errorTexts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useCssModule, watch } from 'vue';
import { Size } from '@comp/enums';
import { useIMask } from 'vue-imask';
import { IconName } from '@comp/components/icons/utils/models';
import { CalendarType } from '@comp/components/calendars/utils/models';
import InputErrorsList from '@comp/components/inputs/InputErrorsList.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import { InputType, type IDateInputProps } from '@comp/components/inputs/utils/models';
import {
  getFormattedCalendarDate,
  getCalendarTypePlaceholder,
  getIMaskOptions,
  getValidDateForCalendar,
} from '@comp/components/inputs/utils';
import InputLabel from '@comp/components/inputs/InputLabel.vue';

const props = withDefaults(defineProps<IDateInputProps>(), {
  calendarType: CalendarType.month,
  label: '',
  disabled: false,
  minWidth: 320,
  size: Size.M,
  showError: true,
  isNotPreventDefaultEnter: false,
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: Date): void;
  (eventName: 'click:iconRight'): void;
}>();

const attrs = useAttrs();
const style = useCssModule();
const inputStyle = computed(() => {
  const styles = [style.input];
  if (isError.value) styles.push(style.inputError);
  if (props.size === Size.S) styles.push(style.input_s);

  return styles;
});

const dateAsString = computed({
  get(): string {
    return getFormattedCalendarDate(props.modelValue, props.calendarType);
  },
  set(newDate: string): void {
    emit(
      'update:modelValue',
      getValidDateForCalendar(newDate, props.calendarType, props.isInactiveRule, props.showError),
    );
  },
});

const placeholder = computed(() => props.placeholder ?? getCalendarTypePlaceholder(props.calendarType));

const maskOptions = computed(() => getIMaskOptions(props.calendarType));
const { el, masked } = useIMask(maskOptions);

const isError = computed(() => {
  if (!props.showError) {
    return isNaN(props.modelValue.getDate());
  }

  return props.isInactiveRule?.call(undefined, props.modelValue);
});

const errorTexts = computed(() => {
  if (!props.showError && isNaN(props.modelValue.getDate())) {
    return ['Не найдена дата, подходящая под критерии'];
  }

  return [props.inactiveErrorText ?? ''];
});

const onKeyDownEnter = (event: Event) => {
  if (!props.isNotPreventDefaultEnter) {
    (event.target as HTMLInputElement).blur();
  }
};

watch(
  () => dateAsString.value,
  () => {
    masked.value = dateAsString.value;
  },
);
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.inputContainer {
  position: relative;
  display: block;
}

.input {
  display: block;
  color: $black1;
  font-size: 14px;
  line-height: 22px;
  border-color: $blueGrey4;
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  padding: 12px 52px 12px 16px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  &_s {
    padding: 8px 52px 8px 16px;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus,
  &:not(:disabled):active {
    border-color: $blueGrey3;
  }

  &::placeholder {
    color: $grey2;
  }

  &:disabled {
    background-color: $grey5;
    color: $grey2;
  }

  &Error {
    border-color: $red3;

    &:not(:disabled):hover,
    &:not(:disabled):focus,
    &:not(:disabled):active {
      border-color: $red2;
    }
  }
}

.icon {
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: $blueGrey2;
  top: 14px;

  &_s {
    top: 10px;
  }
}

.iconRight {
  right: 16px;
  cursor: pointer;

  &_disabled {
    pointer-events: none;
  }
}
</style>
