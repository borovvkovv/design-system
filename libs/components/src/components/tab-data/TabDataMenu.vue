<template>
  <div class="relative inline-block text-left">
    <Menu v-slot="{ close, open }">
      <MenuButton class="link_Style5">
        <span class="flex items-center">
          {{ modelValue.title }}
          <IconArrowUpTriangle
            v-if="open"
            class="ml-1"
          />
          <IconArrowDownTriangle
            v-else
            class="ml-1"
          />
        </span>
      </MenuButton>
      <MenuItems
        class="divide-blueGrey-5 absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y rounded-md bg-white p-1 px-5 shadow-lg outline-none"
      >
        <MenuItem
          v-for="option in options"
          :key="option.value"
          as="div"
          class="py-4"
        >
          <AppLink
            :link-style="LinksStyles.Style2"
            @click="
              () => {
                onSelect(option);
                close();
              }
            "
          >
            {{ option.title }}
          </AppLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import AppLink from '@comp/components/app-link/AppLink.vue';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';
import IconArrowUpTriangle from '@comp/components/icons/IconArrowUpTriangle.vue';
import type { ISelectItem } from '@comp/components/selects/utils/models';

defineProps<{
  modelValue: ISelectItem;
  options: ISelectItem[];
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: ISelectItem): void;
}>();

const onSelect = (item: ISelectItem) => {
  emit('update:modelValue', item);
};
</script>

<style module lang="scss"></style>
