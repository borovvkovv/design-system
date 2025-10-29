<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Size</h4>
      <div class="mb-13 flex gap-3">
        <IconTextButton
          v-for="type in sizes"
          :key="type.title"
          :icon-name="IconName.IconMonitor"
          :text="type.title"
          :size="type.size"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Color</h4>
      <div class="mb-13 flex gap-3">
        <IconTextButton
          v-for="type in colors"
          :key="type.title"
          :icon-name="IconName.IconMonitor"
          :text="type.title"
          :color="type.color"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Loading state</h4>
      <div class="mb-13 flex gap-3">
        <IconTextButton
          v-for="(type, index) in isLoadingAttribute"
          :key="index"
          :icon-name="IconName.IconMonitor"
          :text="type.title"
          :is-loading="type.isLoading"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Disabled state</h4>
      <div class="mb-13 flex gap-3">
        <IconTextButton
          v-for="(type, index) in isDisabledattributes"
          :key="index"
          :icon-name="IconName.IconMonitor"
          :text="type.title"
          :is-disabled="type.isDisabled"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Icon position</h4>
      <div class="mb-13 flex gap-3">
        <IconTextButton
          v-for="(type, index) in iconPositions"
          :key="index"
          :icon-name="IconName.IconMonitor"
          :text="type.title"
          :icon-position="type.iconPosition"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconTextButtonPageExamples',
};
</script>

<script setup lang="ts">
import { AppColor, Size } from '@libs/components/enums';
import { IconTextButton } from '@libs/components/buttons';
import { IconPosition } from '@libs/components/buttons-enums';
import { IconName } from '@libs/components/icons-enums';

const sizes = [
  {
    title: 'XS',
    size: Size.XS,
  },
  {
    title: 'S',
    size: Size.S,
  },
  {
    title: 'M',
    size: Size.M,
  },
] as const;

const colors = [
  {
    title: 'DarkBlue',
    color: AppColor.DarkBlue,
  },
  {
    title: 'Blue',
    color: AppColor.Blue,
  },
  {
    title: 'Grey',
    color: AppColor.Grey,
  },
  {
    title: 'Red',
    color: AppColor.Red,
  },
];

const isLoadingAttribute = [
  {
    title: 'Loading',
    isLoading: true,
  },
  {
    title: 'Not loading',
    isLoading: false,
  },
];

const isDisabledattributes = [
  {
    title: 'Disabled',
    isDisabled: true,
  },
  {
    title: 'Not disabled',
    isDisabled: false,
  },
];

const iconPositions = [
  {
    title: 'Left',
    iconPosition: IconPosition.Left,
  },
  {
    title: 'Right',
    iconPosition: IconPosition.Right,
  },
];
</script>
