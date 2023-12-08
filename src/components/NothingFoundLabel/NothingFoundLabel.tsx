import React from 'react';
import { View, Text } from 'react-native';

import { SvgXml } from 'react-native-svg';
import { group } from './img/group';
import { NothingFoundLabelTypes } from './types';
import { s } from './styles';

export const NothingFoundLabel: React.FC<NothingFoundLabelTypes> = ({
  title,
}) => {
  return (
    <View style={s.container}>
      <SvgXml xml={group} />
      <Text style={s.text}>{title}</Text>
    </View>
  );
};
