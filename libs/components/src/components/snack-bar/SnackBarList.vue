<template>
  <TransitionGroup
    mode="out-in"
    tag="div"
    class="fixed bottom-3 right-3 flex flex-col-reverse items-end"
  >
    <SnackBar
      v-for="snackBar in snackBarList"
      :id="snackBar.id"
      :key="snackBar.id"
      :status="snackBar.status"
      :message="snackBar.message"
      :timer="snackBar.timer"
      class="mt-3 w-fit"
      @close="() => (snackBarList = removeItemFromArrayByModel(snackBarList, 'id', snackBar.id))"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { removeItemFromArrayByModel } from '@comp/utils/array';
import SnackBar from './SnackBar.vue';
import type { SnackBarPropsStrict } from '@comp/components/snack-bar/utils/models';

const snackBarList = defineModel<SnackBarPropsStrict[]>({ required: true, default: [] });
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(60%);
  opacity: 0;
}
</style>
