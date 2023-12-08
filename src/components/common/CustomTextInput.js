import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default (props) => {
  const { error, rightElement } = props;

  const s = StyleSheet.create({
    box: {
      justifyContent: 'center',
    },
    input: {
      paddingTop: 11,
      paddingBottom: 11,
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomWidth: 1,
      borderBottomColor: error ? '#dd4444' : '#3a1d00',
      fontFamily: 'Exo2-Regular',
      color: '#3a1d00',
      fontSize: 16,
    },
    rightElement: {
      position: 'absolute',
      right: 0,
      alignSelf: 'center',
    },
  });

  return (
    <View style={s.box}>
      <TextInput
        placeholderTextColor="#d8d2cc"
        style={{ ...s.input }}
        {...props}
      />
      {rightElement && <View style={s.rightElement}>{rightElement}</View>}
    </View>
  );
};
