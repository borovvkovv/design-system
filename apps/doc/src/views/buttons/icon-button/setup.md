<template>
  <IconButton
    :size="Size.M"
    :color="AppColor.DarkBlue"
    :is-disabled="false"
    :type="'button'"
    :is-loading="false"
    :icon-name="IconName.IconMonitor"
    popup-text="Popup text"
  />
</template>

// ...

<script setup lang="ts">
  import { AppColor, Size } from '@libs/components/enums'
  import { IconName } from '@/components/icons/models';
  import {IconButton} from '@/components/buttons/IconButton.vue';
</script>
