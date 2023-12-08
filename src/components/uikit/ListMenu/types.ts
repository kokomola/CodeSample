import * as React from 'react';
import { IconName } from '@components/uikit/Icon';
import { SvgProps } from 'react-native-svg';

export type ListMenuItem = {
  text: string;
  onPress: (e: React.SyntheticEvent) => void;
  svgIcon?: React.FC<SvgProps>;
  icon?: IconName;
  active?: boolean;
  key: string;
};

export type ListMenuProps = {
  menu: ListMenuItem[];
};
