import React from 'react';
import { Triangle as TriangleIcon } from '@components/uikit/Icon/lib';
import * as colors from '@constants/colors';
import { styles as s } from './styles';

interface IProps {
  increase?: boolean;
  width?: number;
}

export const Triangle: React.FC<IProps> = ({ increase, width = 15 }) => {
  if (increase === undefined) return null;

  const deg = increase ? 0 : 180;
  const color = increase ? colors.oceanGreen : colors.fieryRose;
  return (
    <TriangleIcon
      style={[{ transform: [{ rotate: `${deg}deg` }] }, s.triangle]}
      fill={color}
      width={width}
      height={width / 2.5}
    />
  );
};
