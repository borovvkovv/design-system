<template>
  <div :class="[style.main, attrs.class]">
    <InputLabel
      v-if="label"
      :label="label"
      :required="required"
    />
    <div
      :class="inputStyle"
      data-test="inputContainer"
      @click="onClickForward"
    >
      <BaseInputIcon
        v-if="iconLeft"
        class="mr-4"
        :icon-name="iconLeft"
      />
      <slot name="beforeInput" />
      <input
        ref="inputRef"
        v-bind="{ ...attrs, class: '' }"
        :value="value"
        class="w-full grow"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
        @input="onInput"
        @change="(event: Event) => emit('change:modelValue', (event.target as HTMLInputElement).value)"
        @keydown.enter="onKeyDownEnter"
        @focus="onFocus"
        @blur="onBlur"
      />
      <BaseInputIcon
        v-if="iconRight"
        v-show="showRightIcon"
        class="ml-4"
        v-bind="iconRight"
        :disabled="disabled"
        tabindex="1"
      />
    </div>
    <InputErrorsList
      v-if="errorList"
      :error-list="errorList"
    />
  </div>
</template>

<script setup lang="ts">
import { type IBaseInputProps, InputType } from '@comp/components/inputs/utils/models';
import { computed, ref, useAttrs, useCssModule } from 'vue';
import { Size } from '@comp/enums';
import InputErrorsList from '@comp/components/inputs/InputErrorsList.vue';
import BaseInputIcon from '@comp/components/inputs/BaseInputIcon.vue';
import InputLabel from '@comp/components/inputs/InputLabel.vue';

const props = withDefaults(defineProps<IBaseInputProps>(), {
  type: InputType.Text,
  label: '',
  placeholder: '',
  disabled: false,
  isError: false,
  minWidth: 320,
  size: Size.M,
  iconRightShowMode: 'AllTime',
  isNotPreventDefaultEnter: false,
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: string): void;
  (eventName: 'change:modelValue', newValue: string): void;
  (eventName: 'click:iconRight'): void;
  (eventName: 'focus', payload: FocusEvent): void;
  (eventName: 'blur', payload: FocusEvent): void;
}>();
const attrs = useAttrs();
const style = useCssModule();
const inputRef = ref<HTMLInputElement | undefined>();
const inputStyle = computed(() => {
  const styles = [style.input];
  styles.push(props.disabled ? style.disabled : style.enabled);
  if (props.inputClass) props.inputClass.forEach((className) => styles.push(className));

  if (props.isError) styles.push(style.inputError);
  else if (props.isCorrect) styles.push(style.inputCorrect);
  else styles.push(style.inputDefault);

  if (props.size === Size.S) styles.push(style.input_s);
  if (props.size === Size.XS) styles.push(style.input_xs);

  return styles;
});
const isFocused = ref(false);
const onFocus = (evt: FocusEvent) => {
  emit('focus', evt);
  isFocused.value = true;
};
const onBlur = (evt: FocusEvent) => {
  emit('blur', evt);
  isFocused.value = false;
};

const onInput = (event: Event) => {
  const inputEvent = event as InputEvent;
  if (props.type === InputType.Number) {
    if (
      value.value &&
      inputEvent.data === '-' &&
      Number(value.value) != -(inputEvent.target as HTMLInputElement).valueAsNumber
    ) {
      (inputEvent.target as HTMLInputElement).value = value.value;
      return;
    }
  }

  let newValue = (inputEvent.target as HTMLInputElement).value;
  if (props.type === InputType.Number && Number(newValue)) {
    if (attrs.min !== null && attrs.min !== undefined && newValue < attrs.min) {
      newValue = attrs.min.toString();
    }
    if (attrs.max !== null && attrs.max !== undefined && newValue > attrs.max) {
      newValue = attrs.max.toString();
    }
  }
  value.value = newValue;
};

const onKeyDownEnter = (event: Event) => {
  if (!props.isNotPreventDefaultEnter) {
    (event.target as HTMLInputElement).blur();
  }
};

const showRightIcon = computed(
  () => props.iconRightShowMode === 'AllTime' || (props.iconRightShowMode === 'OnFocus' && isFocused.value),
);
const onClickForward = () => {
  inputRef.value?.focus();
};

const value = computed({
  get(): string {
    return props.modelValue;
  },
  set(newValue: string): void {
    emit('update:modelValue', newValue);
  },
});

defineExpose({
  focus: () => inputRef.value?.focus(),
  inputRef,
});
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.input {
  display: flex;
  align-items: center;
  color: $black1;
  font-size: 14px;
  line-height: 22px;
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  padding: 12px 16px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  &_s {
    padding: 8px 16px;
  }

  &_xs {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 16px;
    padding-right: 8px;
  }

  &::placeholder {
    color: $grey2;
  }

  &.disabled {
    background-color: $grey5;
    color: $grey2;
  }

  &.enabled {
    cursor: text;
    background-color: $white;
  }

  &Default {
    border-color: $blueGrey4;

    &.enabled:hover,
    &.enabled:focus,
    &.enabled:active {
      border-color: $blueGrey3;
    }
  }

  &Error {
    border-color: $red3;

    &.enabled:hover,
    &.enabled:focus,
    &.enabled:active {
      border-color: $red1;
    }
  }

  &Correct {
    border-color: $green1;
  }
}

.icon {
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $blueGrey2;
}
</style>
