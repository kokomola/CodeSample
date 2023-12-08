import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextStyle } from 'react-native';
import { styles as s } from './styles';

type InputErrorProps = {
  visible?: boolean;
  error?: string | null;
  replace?: Record<string, string | number>;
  style?: TextStyle;
};

export const InputError: React.FC<InputErrorProps> = (props) => {
  const { visible = false, error, replace, style } = props;
  const { i18n } = useTranslation();

  if (!visible || !error) return null;

  return <Text style={[s.error, style]}>{i18n.t(error, replace)}</Text>;
};
