import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { purple300, purple500 } from '@constants/colors';

export const CheckBox = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress ?? null}>
    <View style={[s.checkboxBody, checked && s.checkboxActive]}>
      {checked && <Image style={s.icon} source={require('./img/check.png')} />}
    </View>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  checkboxBody: {
    width: 24,
    height: 24,
    padding: 0,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: purple300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: purple500,
    borderColor: purple500,
  },
  icon: {
    margin: 0,
    padding: 0,
  },
});
