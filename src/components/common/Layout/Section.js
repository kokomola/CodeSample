import React from 'react';
import { View, StyleSheet } from 'react-native';

const Section = props => {
  const { children, style } = props;

  return <View style={{ ...s.section, ...style }}>{children}</View>;
};

const s = StyleSheet.create({
  section: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  }
});

export default Section;
