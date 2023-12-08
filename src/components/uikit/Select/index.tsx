import * as React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {Icon} from '@components/uikit/Icon';

import * as colors from '@constants/colors';

import {pickerSelectStyles} from './styles';
import {SelectProps} from './types';

export const Select: React.FC<SelectProps> = props => {
  return (
    <View>
      <RNPickerSelect
        {...props}
        style={pickerSelectStyles}
        // Icon={() => <Icon icon="chevronDown" color={colors.space900} />}
      />
    </View>
  );
};
