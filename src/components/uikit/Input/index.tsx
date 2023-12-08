import * as React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// import { useDynamicValue } from 'react-native-dynamic';

import { Icon, IconName } from '@components/uikit/Icon/index';
import { getDynamicStyles } from '@components/uikit/Input/styles';
import * as colors from '@constants/colors';

export interface IInputProps extends TextInputProps {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  icon?: IconName;
  leftIcon?: IconName;
  textAlign?: 'center' | 'right' | 'left' | 'none';
  textRight?: string;
  warning?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onKeyPress?: (e: any) => void;
  onPressIcon?: () => void;
  onPressLeftIcon?: () => void;
  onPressTextRight?: () => void;
  isTextRightDisabled?: boolean;
  onSumbitEditing?: () => void;
}

export type DynamicStyleSheetProps = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  warning: boolean;
};

export const Input: React.FC<IInputProps> = (props) => {
  const {
    autoCapitalize,
    autoCompleteType,
    disabled,
    error,
    focused,
    icon,
    keyboardType,
    leftIcon,
    textRight,
    onBlur,
    onChangeText,
    onFocus,
    onPressIcon,
    onPressLeftIcon,
    onPressTextRight,
    isTextRightDisabled,
    onSubmitEditing,
    placeholder,
    secureTextEntry,
    style,
    textAlign,
    value,
    warning,
    containerStyle,
    //onKeyPress,
  } = props;

  // for fix bug to jump cursor end when text input is empty & align center is center
  //const isTextAlignCenter = style?.textAlign === 'center' ? true : false;
  const isTextAlignCenter = [textAlign].includes('center');

  // const styles = useDynamicValue(
  //   getDynamicStyles({ disabled, focused, error, warning })
  // );
  const styles = getDynamicStyles({ disabled, focused, error, warning });

  return (
    <View style={[styles.box, containerStyle]}>
      {[
        !!leftIcon && (
          <TouchableOpacity
            key="leftIcon"
            onPress={onPressLeftIcon}
            style={[styles.iconWrapper, styles.leftIconWrapper]}
          >
            <Icon icon={leftIcon} />
          </TouchableOpacity>
        ),
        <TextInput
          //onKeyPress={onKeyPress}
          key="input"
          placeholderTextColor={colors.independence500}
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          textAlign={textAlign}
          multiline={isTextAlignCenter}
          onSubmitEditing={onSubmitEditing}
        />,
        !!icon && (
          <TouchableOpacity
            key="rightIcon"
            onPress={onPressIcon}
            style={[styles.iconWrapper, styles.rightIconWrapper]}
          >
            <Icon icon={icon} />
          </TouchableOpacity>
        ),
        !!textRight && (
          <TouchableOpacity
            key="rightIcon"
            disabled={isTextRightDisabled}
            onPress={onPressTextRight}
            style={[styles.textWrapper, styles.rightIconWrapper]}
          >
            <Text style={styles.textRight}>{textRight}</Text>
          </TouchableOpacity>
        ),
      ]}
    </View>
  );
};
