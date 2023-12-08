import * as React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import { CircleIcon } from '@components/uikit/Icon';
import { AFastImage } from '@components/AFastImage';

import { styles as s } from './styles';

type InfoRow = {
  icon?: string;
  imageURI?: string;
  borderBottom?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  leftTextTop: string;
  leftTextBottom?: string;
  rightTextTop?: string;
  rightTextBottom?: string | null;
  hidden?: boolean;
};

export const InfoRow: React.FC<InfoRow> = (props) => {
  const {
    icon,
    imageURI,
    color,
    borderBottom,
    containerStyle,
    leftTextTop,
    rightTextTop,
    leftTextBottom,
    rightTextBottom,
    hidden = false,
  } = props;

  if (hidden) return null;

  return (
    <View style={[s.box, containerStyle, borderBottom && s.borderBottom]}>
      <View>
        {icon ? <CircleIcon icon={icon} color={color} /> : null}
        {imageURI ? <AFastImage uri={imageURI} style={s.image} /> : null}
      </View>

      <View style={s.infoBox}>
        <Text style={s.leftTextTop}>{leftTextTop}</Text>
        <Text style={s.leftTextBottom}>{leftTextBottom}</Text>
      </View>

      <View style={s.dateBox}>
        <Text style={s.rightTextTop}>{rightTextTop}</Text>
        {rightTextBottom ? (
          <Text style={s.rightTextBottom}>{rightTextBottom}</Text>
        ) : null}
      </View>
    </View>
  );
};
