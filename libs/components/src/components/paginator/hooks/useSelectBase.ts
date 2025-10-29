import type { Ref } from 'vue';
import type { ISelectItem, SelectKeyType } from '@comp/components/selects/utils/models';
import { computed, ref, watch } from 'vue';

const getDefaultSelectedItemValue = <TKey extends SelectKeyType>(
  options: Ref<ISelectItem<TKey>[] | undefined>,
  isSelectItemDefined: boolean = true,
  initialSelectedId?: TKey,
): TKey | null => {
  if (!options.value || options.value.length === 0) {
    return null;
  }

  if (initialSelectedId && options.value.some((option) => option.value === initialSelectedId)) {
    return initialSelectedId;
  }

  if (isSelectItemDefined) {
    return options.value[0].value;
  }

  return null;
};

export const useSelectBase = <TKey extends SelectKeyType, TEntity>(
  entities: Ref<TEntity[] | undefined | null>,
  getSelectItem: (item: TEntity) => ISelectItem<TKey>,
  isSelectItemDefined: boolean = true,
  initialSelectedId?: TKey,
) => {
  const options = computed(() => entities.value?.map((item) => getSelectItem(item)));
  const selectedItemValue = ref<TKey | null>(
    getDefaultSelectedItemValue<TKey>(options, isSelectItemDefined, initialSelectedId),
  ) as Ref<TKey | null>;

  const optionsSelected = computed({
    get() {
      return options.value?.find((option) => option.value === selectedItemValue.value);
    },
    set(newValue?: ISelectItem<TKey>): void {
      selectedItemValue.value = newValue?.value ?? null;
    },
  });

  watch(
    () => options.value,
    () => {
      selectedItemValue.value = getDefaultSelectedItemValue<TKey>(options, isSelectItemDefined, initialSelectedId);
    },
  );

  return {
    options,
    optionsSelected,
    selectedItemValue,
  };
};
