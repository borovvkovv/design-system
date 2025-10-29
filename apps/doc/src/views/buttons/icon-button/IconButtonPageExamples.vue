<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Size</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="type in sizes"
          :key="type.title"
        >
          <p class="text-desktop-5">{{ type.title }}</p>
          <IconButton
            :icon-name="IconName.IconMonitor"
            :size="type.size"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Color</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="type in colors"
          :key="type.title"
        >
          <p class="text-desktop-5">{{ type.title }}</p>
          <IconButton
            :icon-name="IconName.IconMonitor"
            :color="type.color"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Loading state</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="(type, index) in isLoadingAttribute"
          :key="index"
        >
          <p class="text-desktop-5">{{ type.title }}</p>
          <IconButton
            :icon-name="IconName.IconMonitor"
            :is-loading="type.isLoading"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Disabled state</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="(type, index) in isDisabledattributes"
          :key="index"
        >
          <p class="text-desktop-5">{{ type.title }}</p>
          <IconButton
            :icon-name="IconName.IconMonitor"
            :is-disabled="type.isDisabled"
          />
        </div>
      </div>
    </div>
    <div>
      <h4 class="mb-6">Popup</h4>
      <div class="mb-13 flex gap-3">
        <div>
          <p class="text-desktop-5">Navigate to button</p>
          <IconButton
            :icon-name="IconName.IconMonitor"
            popup-text="Popup text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconButtonPageExamples',
};
</script>

<script setup lang="ts">
import { AppColor, Size } from '@libs/components/enums';
import { IconButton } from '@libs/components/buttons';
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
</script>
