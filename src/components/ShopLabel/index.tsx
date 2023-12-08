import React, { FC } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@components/uikit/Icon';
import { styles as s } from './styles';
import { logline } from '@utils/debug';

type Types = 'vip' | 'new' | 'certificate' | 'giftery' | 'digital';

type Property = {
  color: string;
  icon?: IconName | null;
  priority: number;
  text?: string | null;
  textColor?: string;
};

const LABELS: Record<Types, Property> = {
  new: {
    color: '#5dbc96',
    text: 'new',
    priority: 2,
    textColor: 'white',
  },
  certificate: {
    color: '#fece63',
    text: 'certificate',
    textColor: 'black',
    priority: 3,
  },
  vip: {
    color: '#fece63',
    icon: 'vipCrown',
    textColor: 'black',
    priority: 1,
  },
  giftery: {
    color: '#fece63',
    text: 'giftery',
    textColor: 'black',
    priority: 3,
  },
  digital: {
    color: '#fece63',
    text: 'digital',
    textColor: 'black',
    priority: 3,
  },
};

type LabelKey = keyof typeof LABELS;

export type LabelKeys = Partial<{ [K in LabelKey]: boolean | string }>;

const sortDesc = (a: [string, Property], b: [string, Property]) =>
  a[1].priority - b[1].priority;

export const ShopLabel: FC<LabelKeys> = (props) => {
  const [t] = useTranslation('LabelTypes');

  const sortedLabels = Object.entries(LABELS).sort(sortDesc);

  for (const [key] of sortedLabels) {
    if (props[key as LabelKey]) {
      const { color, text, icon, textColor } = LABELS[key as LabelKey];
      //logline('[ShopLabel]', { text, key });
      const showIcon = icon && <Icon icon={icon} color={color} size="lg" />;
      const showText = text && (
        <Text style={[s.label, { backgroundColor: color, color: textColor }]}>
          {t(text)}
        </Text>
      );
      return showIcon || showText || null;
    }
  }
  return null;
};
