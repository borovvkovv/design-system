import type { ISelectItem } from '@comp/components/selects/utils/models';
import { computed, type Ref } from 'vue';
import { useSelectBase } from '@comp/components/paginator/hooks/useSelectBase';

export const useSelect = <T>(
  entities: Ref<T[] | undefined | null>,
  getSelectItem: (item: T) => ISelectItem,
  isSelectItemDefined: boolean = true,
  initialSelectedEntity?: T,
) => {
  const { options, optionsSelected, selectedItemValue } = useSelectBase(
    entities,
    getSelectItem,
    isSelectItemDefined,
    initialSelectedEntity ? getSelectItem(initialSelectedEntity).value : undefined,
  );

  const selectedEntity = computed<T | undefined>(() => {
    const existSelectedArrayItem = entities.value?.find(
      (item) => getSelectItem(item).value === selectedItemValue?.value,
    );

    if (!selectedItemValue.value || !existSelectedArrayItem) {
      if (isSelectItemDefined) {
        selectedItemValue.value =
          entities.value && entities.value.length > 0 ? getSelectItem(entities.value[0]).value : null;
      } else {
        selectedItemValue.value = null;
      }
    }

    return entities.value?.find((item) => getSelectItem(item).value === selectedItemValue?.value);
  });

  return {
    options,
    optionsSelected,
    selectedEntity,
  };
};
