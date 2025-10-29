<template>
  <IconArrowLeft :size="50" />
  <AppIcon
    :icon="IconName.IconArrowLeft"
    :size="50"
  />
</template>

// ...

<script setup lang="ts">
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import {AppIcon} from '@libs/components';
</script>
