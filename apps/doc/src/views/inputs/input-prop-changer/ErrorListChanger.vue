<template>
  <div>
    <div class="mb-2 flex justify-between">
      <p class="text-size-5 text-grey-1">{{ label }}</p>
      <AppLink
        @click="
          () => {
            if (!errorList) errorList = [''];
            else errorList.push('');
          }
        "
      >
        <AppIcon :icon="IconName.IconPlus" />
      </AppLink>
    </div>
    <div class="flex flex-col gap-5">
      <div
        v-for="(error, errorIndex) in errorList"
        :key="errorIndex"
        class="flex"
      >
        <BaseInput
          :model-value="error"
          :size="Size.XS"
          class="grow"
          @update:model-value="(newValue) => (errorList![errorIndex] = newValue)"
        />
        <div class="pl-5">
          <AppLink
            @click="
              () => {
                errorList = [...(errorList ?? []).slice(0, errorIndex), ...(errorList ?? []).slice(errorIndex + 1)];
              }
            "
          >
            <AppIcon :icon="IconName.IconWasteBin" />
          </AppLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ErrorListChanger',
};
</script>

<script setup lang="ts">
import { Size } from '@libs/components/enums';
import { IconName } from '@libs/components/icons-enums';
import { BaseInput } from '@libs/components/inputs';
import { AppLink } from '@libs/components/app-link';
import { AppIcon } from '@libs/components';

const errorList = defineModel<Array<string> | undefined>();

defineProps<{ label: string }>();
</script>
