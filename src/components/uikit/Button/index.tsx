import React from 'react';
import {Text, TouchableOpacity as RegularButton, Pressable} from 'react-native';
import {useDynamicValue} from 'react-native-dynamic';
import {TouchableOpacity as SheetButton} from '@gorhom/bottom-sheet';

import {Spinner} from '@components/uikit/Spinner';
import {Icon} from '@components/uikit/Icon';

import {getDynamicStyles} from './dynamicStyle';
import {TButton, TButtonKinds} from './types';

const buttonKinds: TButtonKinds = {
  RegularButton,
  SheetButton,
  Pressable,
};

export const Button = (props: TButton): JSX.Element => {
  const {
    kind = 'Pressable',
    text = null,
    type = 'primary',
    disabled = false,
    loading = false,
    onPress,
    icon = null,
    rightIcon = null,
    fill = true,
    customStyle,
  } = props;

  const styles = useDynamicValue(getDynamicStyles({type, disabled, fill}));
  const TochableComponent = buttonKinds[kind] as React.ElementType;

  const isPressable = kind === 'Pressable';

  const renderChild = () => {
    if (loading) return <Spinner size="md" color={styles.text.color} />;

    return [
      !!icon && <Icon key="icon" icon={icon} color={styles.text.color} />,
      !!text && (
        <Text key="text" style={styles.text}>
          {text}
        </Text>
      ),
      !!rightIcon && (
        <Icon key="rightIcon" icon={rightIcon} color={styles.text.color} />
      ),
    ];
  };

  const pressableStyle = ({pressed}: {pressed: boolean}) => [
    {
      opacity: pressed ? 0.7 : 1,
    },
    styles.button,
    customStyle,
  ];
  const regularStyle = styles.button;

  const handlePress = (e: React.SyntheticEvent) => {
    if (loading || disabled) return null;

    return onPress(e);
  };

  return (
    <TochableComponent
      activeOpacity={isPressable ? null : 0.8}
      android_ripple={isPressable ? {color: 'rgba(255, 255,255, 0.3)'} : null}
      style={isPressable ? pressableStyle : regularStyle}
      onPress={handlePress}
      disabled={disabled || loading}>
      {renderChild()}
    </TochableComponent>
  );
};
