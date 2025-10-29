<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">Size</h4>
      <div class="mb-13 flex gap-3">
        <TextButton
          v-for="type in sizes"
          :key="type.title"
          :text="type.title"
          :size="type.size"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Color</h4>
      <div class="mb-13 flex gap-3">
        <TextButton
          v-for="type in colors"
          :key="type.title"
          :text="type.title"
          :color="type.color"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Loading state</h4>
      <div class="mb-13 flex gap-3">
        <TextButton
          v-for="(type, index) in isLoadingAttribute"
          :key="index"
          :text="type.title"
          :is-loading="type.isLoading"
        />
      </div>
    </div>
    <div>
      <h4 class="mb-6">Disabled state</h4>
      <div class="mb-13 flex gap-3">
        <TextButton
          v-for="(type, index) in isDisabledattributes"
          :key="index"
          :text="type.title"
          :is-disabled="type.isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TextButtonPageExamples',
};
</script>

<script setup lang="ts">
import { AppColor, Size } from '@libs/components/enums';
import { TextButton } from '@libs/components/buttons';

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
