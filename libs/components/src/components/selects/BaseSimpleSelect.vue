<template>
  <BaseSelectDropDown
    ref="baseSelectDropDown"
    :is-full-width-drop-down="isFullWidthDropDown"
    @on:open="
      (isVisible) => {
        iconArrow = isVisible ? IconName.IconArrowUpTriangle : IconName.IconArrowDownTriangle;
      }
    "
  >
    <template #input="{ toggleDropDown, setDropDownVisibility }">
      <BaseInput
        v-bind="props"
        v-model="queryLocal"
        :type="InputType.Text"
        :icon-right="{ iconName: iconArrow, onIconClick: toggleDropDown }"
        @update:model-value="() => setDropDownVisibility(true)"
        @change:model-value="(newValue) => emit('change:query', newValue)"
      />
    </template>
    <template #dropDown="{ registerCallSection, unregisterCallSection }">
      <LinesSkeleton
        v-if="isLoading"
        v-bind="baseSimpleSelectLinesSkeletonConfig"
        :class="['shadow-24 bg-white px-4 py-2', size === Size.M ? 'rounded-md' : 'rounded-sm']"
      />
      <IconTextStub
        v-else-if="isErrorLoading"
        :texts="['Что-то пошло не так...', 'Попробуйте повторить попытку позже']"
        :icon="IconName.IconExclamationMark"
        :size="Size.S"
        :height="288"
        @vue:mounted="registerCallSection"
        @vue:unmounted="unregisterCallSection"
      />
      <IconTextStub
        v-else-if="isEmpty"
        :texts="['Ничего не найдено', 'Попробуйте изменить запрос']"
        :icon="IconName.IconMagnifierCross"
        :size="Size.S"
        :height="288"
        @vue:mounted="registerCallSection"
        @vue:unmounted="unregisterCallSection"
      />
      <div
        v-else
        class="text-size-5 shadow-24 scrollbar-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 max-h-72 overflow-y-scroll bg-white p-2"
        @vue:mounted="registerCallSection"
        @vue:unmounted="unregisterCallSection"
      >
        <slot />
      </div>
    </template>
  </BaseSelectDropDown>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@comp/enums';
import BaseSelectDropDown from '@comp/components/selects/BaseSelectDropDown.vue';
import BaseInput from '@comp/components/inputs/BaseInput.vue';
import { IconName } from '@comp/components/icons/utils/models';
import type { IBaseSimpleSelectProps } from '@comp/components/inputs/utils/models';
import IconTextStub from '@comp/components/stubs/IconTextStub.vue';
import LinesSkeleton from '@comp/components/skeletons/LinesSkeleton.vue';
import { InputType } from '@comp/components/inputs/utils/models';

const props = withDefaults(defineProps<IBaseSimpleSelectProps>(), {
  isErrorLoading: false,
});

const emit = defineEmits<{
  (e: 'change:query', newValue: string): void;
  (e: 'update:query', newValue: string): void;
}>();

const iconArrow = ref(IconName.IconArrowDownTriangle);
const baseSelectDropDown = ref();

const baseSimpleSelectLinesSkeletonConfig = {
  rowsGap: 26,
  rowsCount: 7,
  rowHeight: 12,
};

const queryLocal = computed<string>({
  get() {
    return props.query;
  },
  set(newValue): void {
    emit('update:query', newValue);
  },
});

defineExpose({
  setDropDownVisibility: (isVisible: boolean) => baseSelectDropDown.value?.setDropDownVisibility(isVisible),
});
</script>
