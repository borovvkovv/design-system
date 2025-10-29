<template>
  <BaseInput
    ref="baseInputRef"
    v-bind="props"
    :icon-right="{
      iconName: icon,
      onIconClick: toggleType,
    }"
    :type="passwordType"
    @update:model-value="(value: string) => emit('update:modelValue', value)"
  />
</template>

<script setup lang="ts">
import type { IPasswordInputProps } from '@comp/components/inputs/utils/models';
import BaseInput from '@comp/components/inputs/BaseInput.vue';
import { computed, ref } from 'vue';
import { IconName } from '@comp/components/icons/utils/models';
import { InputType } from '@comp/components/inputs/utils/models';

const props = defineProps<IPasswordInputProps>();
const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: string): void;
}>();
const baseInputRef = ref();
const passwordType = ref(InputType.Password);
const icon = computed(() => (passwordType.value === InputType.Password ? IconName.IconEyeClose : IconName.IconEyeOpen));

const toggleType = () => {
  passwordType.value = passwordType.value === InputType.Password ? InputType.Text : InputType.Password;
};

defineExpose({
  focus: () => baseInputRef.value.focus(),
});
</script>
