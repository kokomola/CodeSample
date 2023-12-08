import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Icon} from '@components/uikit/Icon';
import * as colors from '@constants/colors';

import {styles as s} from './styles';

//
export const Box: React.FC<{children: React.ReactNode}> = props => {
  const {children} = props;

  return <View style={s.box}>{children}</View>;
};

//
type ScreenTitleProps = {
  title: string;
};

export const ScreenTitle: React.FC<ScreenTitleProps> = props => {
  const {title} = props;

  return <Text style={s.title}>{title}</Text>;
};

//
type BackButtonProps = {
  disabled?: boolean;
};

export const BackButton: React.FC<BackButtonProps> = props => {
  const {disabled = false} = props;

  const navigation = useNavigation();

  return (
    <View style={s.backButtonBox}>
      {!disabled ? ( // saving padding if we don't need a back button
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon icon="arrowLeft" color={colors.purple500} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

//
export const InputsBox: React.FC<{children: JSX.Element}> = props => {
  const {children} = props;

  return <View style={s.inputsBox}>{children}</View>;
};

//
type TipProps = {
  tip: string;
};

export const Tip: React.FC<TipProps> = props => {
  const {tip} = props;

  return <Text style={s.tip}>{tip}</Text>;
};
