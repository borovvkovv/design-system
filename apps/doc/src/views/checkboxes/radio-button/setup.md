<template>
  <AppRadiobutton
    v-model="currentValue"
    value="value1"
    group-name="group"
    label="label"
    :is-disabled="false"
    :is-error="false"
    field-id="fieldId"
  />
  <AppRadiobutton
    v-model="currentValue"
    value="value2"
    group-name="group"
    label="label"
    :is-disabled="false"
    :is-error="false"
    field-id="fieldId"
  />
</template>

// ...

<script setup lang="ts">
  import { ref } from 'vue';
  import {AppRadiobutton} from '@/components/AppRadiobutton.vue';

  const currentValue = ref('value1');
</script>
