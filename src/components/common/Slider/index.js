import React from 'react';
import RNSlider from '@react-native-community/slider';
import {View, StyleSheet} from 'react-native';

import * as colors from '@constants/colors';

const Slider = props => {
  const {
    value,
    onChange,
    minimumValue,
    maximumValue,
    step,
    thumbTintColor = colors.purple500,
    minimumTrackTintColor = colors.purple500,
  } = props;

  return (
    <View style={s.container}>
      <RNSlider
        value={value}
        onValueChange={onChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        thumbTintColor={thumbTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
      />
    </View>
  );
};

const s = StyleSheet.create({});

export default Slider;
