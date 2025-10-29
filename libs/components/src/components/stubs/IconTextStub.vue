<template>
  <BaseStub
    v-tw-merge
    :class="['bg-white', size === Size.M ? 'border-blueGrey-4 rounded-md border p-8' : 'shadow-24 rounded-sm']"
    :height="height"
  >
    <div :class="['flex w-full', isNormalFormat && 'flex-col items-center justify-center']">
      <AppIcon
        :icon="icon"
        :class="[
          'text-blueGrey-2 shrink-0',
          isNormalFormat ? (size === Size.M ? 'mb-5' : 'mb-4') : undefined,
          !isNormalFormat && 'mr-5',
        ]"
      />
      <div class="flex flex-col">
        <span
          v-for="(text, index) in texts"
          :key="`text_${text}_${index}`"
          :class="[
            isNormalFormat && 'text-center',
            size === Size.M ? 'text-size-5' : 'text-size-7',
            index === 0 && size === Size.S ? 'text-black-1' : 'text-grey-1',
          ]"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </BaseStub>
</template>

<script setup lang="ts">
import BaseStub from '@comp/components/stubs/BaseStub.vue';
import type { IconName } from '@comp/components/icons/utils/models';
import AppIcon from '@comp/components/AppIcon.vue';
import { Size } from '@comp/enums';
import { Format } from '@comp/enums/format';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    texts?: string[];
    icon: IconName;
    height?: number;
    size?: Size;
    format?: Format;
  }>(),
  {
    texts: () => [],
    height: undefined,
    size: Size.M,
    format: Format.Normal,
  },
);

const isNormalFormat = computed(() => props.format === Format.Normal);
</script>
