<template>
  <div class="relative inline-block text-left">
    <Menu v-slot="{ close, open }">
      <MenuButton
        class="link_Style2"
        @mouseenter="(evt: MouseEvent) => openMenuWithDelay(evt, open)"
        @mouseleave="(evt: MouseEvent) => closeMenuWithDelay(open, close)"
        @click="(evt: MouseEvent) => clearTimeOut()"
      >
        <slot
          name="menuButton"
          :is-opened="Boolean(open)"
        />
      </MenuButton>
      <TransitionRoot
        v-if="menu.items.length"
        enter="transition duration-100 ease-out"
        enter-from="transform scale-0 opacity-0"
        enter-to="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leave-from="transform scale-100 opacity-100"
        leave-to="transform scale-0 opacity-0"
      >
        <MenuItems
          :class="[
            'divide-blueGrey-5 shadow-8 absolute z-50 mt-2 origin-top-right divide-y rounded-md bg-white outline-none',
            menu.modifier?.text ?? 'text-size-5',
            menu.modifier?.textColor ?? 'text-black-1',
            menu.modifier?.padding ?? 'p-5',
            menu.modifier?.width ?? 'max-w-95 w-max min-w-32',
            menu.modifier?.other,
            menu.modifier?.position ?? 'left-0',
          ]"
          @mouseenter="(evt: MouseEvent) => clearTimeOut()"
          @mouseleave="(evt: MouseEvent) => closeMenuWithDelay(open, close)"
        >
          <MenuItem
            v-for="(item, itemIndex) in menu.items"
            :key="`row_${itemIndex}`"
            as="div"
            :class="[
              item.modifier?.text ?? 'text-size-5',
              item.modifier?.textColor ?? 'text-black-1',
              item.modifier?.textAlign ?? 'text-left',
              item.modifier?.verticalAlign ?? 'align-middle',
              item.modifier?.border ?? (itemIndex > 0 ? 'border-t-blueGrey-5 border-t' : ''),
              item.modifier?.other ?? 'font-normal',
            ]"
          >
            <template v-if="item.type === 'text'">
              <span
                :class="[
                  'block',
                  item.click && 'cursor-pointer',
                  item.modifier?.padding ?? getMenuItemPadding(itemIndex, menu.items.length),
                ]"
                @click="
                  () => {
                    if (item.click) {
                      item.click();
                    }
                    close();
                  }
                "
              >
                {{ item.text }}
              </span>
            </template>
            <template v-if="item.type === 'link'">
              <AppLink
                :to="item.to"
                :link-style="item.linkStyle ?? LinksStyles.Style2"
                :class="['block', item.modifier?.padding ?? getMenuItemPadding(itemIndex, menu.items.length)]"
                :is-active="item.isActive"
                @click="
                  () => {
                    if (item.click) {
                      item.click();
                    }
                    close();
                  }
                "
              >
                <span :class="[item.modifier?.text ?? 'text-size-5']">
                  {{ item.title }}
                </span>
              </AppLink>
            </template>
          </MenuItem>
        </MenuItems>
      </TransitionRoot>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import type { IMenu } from '@comp/components/dropdown-menu/utils/models';
import { TransitionRoot } from '@headlessui/vue';

const props = defineProps<{
  menu: IMenu;
  delayInMs?: number;
}>();

let timer: NodeJS.Timeout | undefined = undefined;

function getMenuItemPadding(index: number, itemsLength: number) {
  return itemsLength === 1 ? 'pb-0 pt-0' : index === 0 ? 'pb-4 pt-0' : index === itemsLength - 1 ? 'pb-0 pt-4' : 'py-4';
}

function clearTimeOut() {
  if (props.delayInMs === undefined) return;

  clearTimeout(timer);
}

function openMenuWithDelay(evt: MouseEvent, isOpened: boolean) {
  if (props.delayInMs === undefined) return;

  clearTimeOut();
  timer = setTimeout(() => {
    if (!isOpened) {
      (evt.target as HTMLElement).click();
    }
  }, props.delayInMs);
}

function closeMenuWithDelay(isOpened: boolean, close: () => {}) {
  if (props.delayInMs === undefined) return;

  clearTimeOut();
  timer = setTimeout(() => {
    if (isOpened) {
      close();
    }
  }, props.delayInMs);
}
</script>
