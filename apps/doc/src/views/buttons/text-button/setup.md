<template>
  <TextButton
    :size="Size.M"
    :color="AppColor.DarkBlue"
    :is-disabled="false"
    type="button"
    :is-loading="false"
    text="Text"
  />
</template>

<script setup lang="ts">
  import { AppColor, Size } from '@libs/components/enums'
  import TextButton from '@/components/buttons/TextButton.vue';
</script>
