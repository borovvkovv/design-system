<template>
  <input
    :id="notEmptyFieldId"
    :name="groupName"
    :value="value"
    :checked="isChecked"
    :disabled="isDisabled"
    :class="style.hidden"
    type="radio"
    @input="onClick"
  />
  <label
    :for="notEmptyFieldId"
    :class="[style.label, isDisabled ? style.labelDisabled : isError ? style.labelError : style.labelEnabled]"
    v-bind="attrs"
  >
    <span :class="[style.iconContainer, label && 'mr-2']">
      <span :class="[style.icon, isChecked ? style.iconChecked : style.iconNotChecked]"></span>
    </span>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs, useCssModule } from 'vue';
import { createGuid } from '@comp/utils/guid';
import type { IAppRadiobuttonProps } from './utils/models';

const props = withDefaults(defineProps<IAppRadiobuttonProps>(), {
  label: '',
  isDisabled: false,
  isError: false,
  fieldId: '',
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: string): void;
}>();
const onClick = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
const notEmptyFieldId = computed(() => (props.fieldId ? props.fieldId : createGuid()));
const isChecked = computed(() => props.modelValue === props.value);
const style = useCssModule();
const attrs = useAttrs();
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.hidden {
  display: none;
}

.label {
  display: inline-flex;
  align-items: center;
  vertical-align: top;

  & .iconContainer {
    min-width: 24px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: $blueGrey4;
  }

  & .icon {
    display: flex;
    min-width: 12px;
    min-height: 12px;
    border-radius: 6px;
    background-color: $white;

    &NotChecked {
      opacity: 0;
    }
  }

  &Enabled {
    color: $black1;

    & .iconChecked {
      background-color: $blue2;
    }

    &:hover {
      & .iconContainer {
        border-color: $blueGrey3;
        cursor: pointer;
      }

      & .iconChecked {
        background-color: $darkBlue4;
      }
    }
  }

  &Disabled {
    color: $grey2;

    & .iconChecked {
      background-color: $blueGrey3;
    }
  }

  &Error {
    & .iconContainer {
      border-color: $red3;
      cursor: pointer;
    }

    & .iconChecked {
      background-color: $red3;
    }

    &:hover {
      & .iconContainer {
        border-color: $red2;
        cursor: pointer;
      }

      & .iconChecked {
        background-color: $red2;
      }
    }
  }
}
</style>
