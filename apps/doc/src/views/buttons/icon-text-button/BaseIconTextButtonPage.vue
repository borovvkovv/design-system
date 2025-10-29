<template>
  <BaseDesignPage :route-name="RouteName.IconTextButton"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseIconTextButtonPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
