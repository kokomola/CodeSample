import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {Icon} from '@components/uikit/Icon';
import {RadioButtonProps} from '@components/uikit/RadioButtons/types';
import {styles as s} from '@components/uikit/RadioButtons/styles';
import {isAndroid} from '@constants/platform';
import {AFastImage} from '@components/AFastImage';

export const RadioButton: React.FC<RadioButtonProps> = props => {
  const {active = false, icon, text, onPress, img, disabled} = props;

  const style = img ? s.imgBox : s.box;

  const showText = text ? <Text style={s.text}>{text}</Text> : null;

  const resizeMode = isAndroid ? 'center' : 'contain';
  const showImage = img ? (
    <AFastImage style={s.img} uri={img} resizeMode={resizeMode} />
  ) : null;

  const show = showImage ? showImage : showText;

  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : () => undefined}
      style={[style, active && s.active, disabled && s.disabled]}>
      {!!icon && <Icon icon={icon} size="sm" />}
      {show}
    </TouchableOpacity>
  );
};

type RadioButtonsContainerProps = {
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
export const RadioButtonsContainer: React.FC<
  RadioButtonsContainerProps
> = props => {
  return (
    <View style={[s.container, props.containerStyle]}>{props.children}</View>
  );
};
