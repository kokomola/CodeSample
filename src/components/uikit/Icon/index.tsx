import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import * as colors from '../../../consts/colors';

import lib from './lib';
import { SIZES } from './sizes';
import { styles as s } from './styles';

export { SIZES as ICON_SIZES };

export type IconName = null | keyof typeof lib;
export type IconSize = keyof typeof SIZES;
export type IconColor = string;

export interface IIconProps {
  icon: IconName;
  size?: IconSize;
  color?: IconColor;
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { icon = null, size = 'md', color = colors.space500 } = props;

  if (!icon) {
    return null;
  }

  if (!Object.prototype.hasOwnProperty.call(lib, icon)) {
    throw new Error(`Invalid icon name: ${icon}`);
  }

  const styles = StyleSheet.create({
    box: {
      height: SIZES[size],
      width: SIZES[size],
    },
  });

  const xml = lib[icon]({ color });

  return (
    <View style={styles.box}>
      <SvgXml xml={xml} width={SIZES[size]} height={SIZES[size]} />
    </View>
  );
};

export type CircleIconProps = IIconProps & {
  inverse?: boolean;
};

export const CircleIcon: React.FC<CircleIconProps> = (props) => {
  const {
    icon = null,
    color = colors.space500,
    inverse = false,
    size = 'md',
  } = props;

  const rgbArray = colors.hexToRgb(color);
  const backgroundColor = !inverse
    ? `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, 0.2)`
    : color;
  const iconColor = !inverse ? color : colors.white;

  return (
    <View style={[s.circleIconBox, { backgroundColor }]}>
      <Icon icon={icon} color={iconColor} size={size} />
    </View>
  );
};
