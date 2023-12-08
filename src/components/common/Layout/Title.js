import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = props => {
  const { children } = props;

  return <Text style={s.title}>{children}</Text>;
};

const s = StyleSheet.create({
  title: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    fontFamily: 'Exo2-SemiBold',
    fontSize: 12,
    color: '#460000'
  }
});

export default Title;
