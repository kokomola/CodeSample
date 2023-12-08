import {isIOS} from '@constants/platform';
import React, {ReactNode} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {styles} from './styles';
export const AKeyboardAvoidingView: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={isIOS ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  );
};
