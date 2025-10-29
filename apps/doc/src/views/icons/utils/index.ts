import { createGuid } from '@/utils/guid';
import { IconName } from '@libs/components/icons-enums';
import { IconComponents } from '@/views/icons/utils/models';
import type { TRow, TTableData } from '@libs/components/table-types';
import { createVNode } from 'vue';
import { designSystemIcons, type AllIconsProps, type DesignSystemIconProperties } from './models';

export const buildDesignSystemIconsExampleTable = (
  buildDesignSystemIcons: Array<DesignSystemIconProperties>,
): TTableData => {
  const rows: Array<TRow> = [];

  buildDesignSystemIcons.forEach((buildDesignSystemIcon, index) => {
    rows.push({
      cells: [
        {
          type: 'text',
          colspan: 2,
          text: buildDesignSystemIcon.size ? `${buildDesignSystemIcon.size}px` : (buildDesignSystemIcon.title ?? ''),
          modifier: {
            text: 'text-size-h4',
            padding: ['pb-6', index !== 0 ? 'pt-12' : 'pt-0'],
          },
        },
      ],
    });

    buildDesignSystemIcon.icons.map((x) => {
      rows.push({
        cells: [
          {
            type: 'text',
            text: x.iconName,
          },
          {
            type: 'render',
            nodeRender: createVNode(IconComponents[x.iconName], {
              key: createGuid(),
              ...x.props,
            }),
          },
        ],
      });
    });
  });

  return {
    header: [],
    rows,
    modifier: {
      other: ['border-hidden', 'border-blueGrey-4'],
    },
  };
};

export const getIconProps = (iconName: IconName | undefined): AllIconsProps => {
  const props = iconName
    ? (designSystemIcons
        .flatMap((designSystemIcon) => designSystemIcon.icons)
        .find((icon) => icon.iconName === iconName)?.props ?? {})
    : {};

  return structuredClone(props);
};
