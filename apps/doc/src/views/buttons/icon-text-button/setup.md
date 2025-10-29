<template>
  <IconTextButton
    :size="Size.M"
    :color="AppColor.DarkBlue"
    :is-disabled="false"
    type="button"
    :is-loading="false"
    text="Text"
    :icon-name="IconName.IconMonitor"
    :icon-position="IconPosition.Left"
    for="text"
  />
</template>

// ...

<script setup lang="ts">
  import { AppColor, Size } from '@libs/components/enums'
  import { IconName } from '@/components/icons/models';
  import {IconTextButton} from '@/components/buttons/IconTextButton.vue';
  import { IconPosition } from '@/components/buttons/models';
</script>
