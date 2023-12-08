import * as React from 'react';

import { Input, IInputProps } from '@components/uikit/Input';

export type PasswordInputProps = Omit<
  IInputProps,
  'icon' | 'onPressIcon' | 'leftIcon' | 'onPressLeftIcon'
>;

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const {
    value,
    onChangeText,
    onBlur,
    onFocus,
    focused,
    error,
    warning,
    disabled,
    placeholder,
  } = props;

  const [secureTextEntry, changeSecureTextEntry] = React.useState(true);
  const toggle = () => changeSecureTextEntry(!secureTextEntry);

  const icon = secureTextEntry ? 'eye' : 'eyeClosed';

  return (
    <Input
      icon={icon}
      onPressIcon={toggle}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      onFocus={onFocus}
      focused={focused}
      error={error}
      warning={warning}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
