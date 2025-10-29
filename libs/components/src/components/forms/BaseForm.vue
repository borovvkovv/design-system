<template>
  <form
    novalidate
    @submit.prevent="formSubmit"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  validator: {
    $validate(): Promise<boolean>;
    $touch(): void;
  };
}>();

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const formSubmit = async () => {
  //props.validator.$clearExternalResults();
  const result = await props.validator.$validate();
  if (result) {
    emit('submit');
  }

  props.validator.$touch();
};

defineExpose({ submit: formSubmit });
</script>
