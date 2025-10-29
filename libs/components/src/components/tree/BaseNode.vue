<template>
  <div
    :class="[
      'border-blueGrey-5 hover:text-darkBlue-4 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border',
      isDisabled ? 'text-blueGrey-2 pointer-events-none' : 'text-blue-2',
    ]"
    @click="() => emits('onButtonClick')"
  >
    <AppIcon
      :icon="icon"
      :size="20"
    />
    <AppIcon
      v-if="state !== AccountingNodeEquipStateCheck.None"
      :icon="IconName.IconPoint"
      :size="10"
      :class="[
        'absolute -right-[5px] -top-[5px] border-white bg-white',
        isDisabled || state === AccountingNodeEquipStateCheck.Warning ? 'text-orange' : 'text-red-3',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { IconName } from '@comp/components/icons/utils/models';
import AppIcon from '@comp/components/AppIcon.vue';
import { AccountingNodeEquipStateCheck } from '@comp/components/tree/utils/models';

withDefaults(
  defineProps<{
    state?: AccountingNodeEquipStateCheck;
    isDisabled?: boolean;
    icon: IconName;
  }>(),
  {
    state: AccountingNodeEquipStateCheck.None,
    isDisabled: false,
  },
);

const emits = defineEmits<{
  (e: 'onButtonClick'): void;
}>();
</script>
