<template>
  <BaseDesignPage :route-name="RouteName.Checkbox"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseCheckboxPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
