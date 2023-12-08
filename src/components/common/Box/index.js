import React from 'react';
import { View, StyleSheet } from 'react-native';

const Box = props => {
  const { children, style } = props;

  const s = StyleSheet.create({
    box: {
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingTop: 17,
      paddingBottom: 18,
      paddingLeft: 11,
      paddingRight: 11,
      ...style
    }
  });

  return <View style={s.box}>{children}</View>;
};

export default Box;
