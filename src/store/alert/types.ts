import { AlertButton, AlertOptions } from 'react-native';

export type ShowErrorPayload = {
  domain?: string;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  options?: AlertOptions | undefined;
};

export type ShowSuccessPayload = {
  domain?: string;
  title: string;
  message: string;
  buttons?: AlertButton[];
  options?: AlertOptions | undefined;
};
