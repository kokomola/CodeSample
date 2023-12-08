import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

const Wrapper = props => {
  const { children } = props;

  return (
    <ScrollView contentContainerStyle={s.contentContainerStyle}>
      <View style={s.wrapper}>{children}</View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1
  },
  wrapper: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 28
  }
});

export default Wrapper;
