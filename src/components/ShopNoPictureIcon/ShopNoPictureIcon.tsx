import React from 'react';
import lib from '@components/uikit/Icon/lib';
import { SvgXml } from 'react-native-svg';
import { s } from './styles';
import * as colors from '@constants/colors';

export const ShopNoPictureIcon = (
  <SvgXml
    style={s.image}
    xml={lib.noPicture({ color: colors.purple500 })}
    width="100%"
    height="100%"
  />
);
