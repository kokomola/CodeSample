import * as React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {StorybookUIRoot} from '../../../storybook';

import * as colors from '../../consts/colors';

const s = StyleSheet.create({
  title: {
    color: 'grey',
    alignSelf: 'center',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 5,
  },
  area: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

const dynamicStyles = new DynamicStyleSheet({
  box: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.white, colors.space900),
  },
});

export const DevApp: React.FC = () => {
  const s = useDynamicValue(dynamicStyles);

  return (
    <View style={s.box}>
      <StorybookUIRoot />
    </View>
  );
};

export const Area: React.FC<{children: JSX.Element}> = ({children}) => (
  <ScrollView style={s.area}>{children}</ScrollView>
);

type WrapperProps = {
  children: React.ReactNode;
  title: string;
  style?: StyleSheet.NamedStyles<unknown>;
};

export const Wrapper: React.FC<WrapperProps> = ({children, title, style}) => (
  <View style={[style]}>
    <Text style={s.title}>{title}</Text>
    <>{children}</>
  </View>
);
