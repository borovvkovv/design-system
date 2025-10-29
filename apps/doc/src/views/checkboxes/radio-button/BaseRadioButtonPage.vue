<template>
  <BaseDesignPage :route-name="RouteName.RadioButton"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseRadioButtonPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
