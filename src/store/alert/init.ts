import { forward } from 'effector';
import {
  showError,
  showErrorFx,
  showSuccess,
  showSuccessFx,
} from '@store/alert/index';
import i18n from '@utils/i18n';
import { Alert } from 'react-native';

forward({
  from: showError,
  to: showErrorFx,
});

showErrorFx.use(
  ({ domain, title, message = '', buttons = [{ text: 'OK' }], options }) => {
    const domainColon = domain ? `${domain}:` : '';
    const _buttons = buttons.map(({ text = '', ...props }) => ({
      ...props,
      text: i18n.t(`${domainColon}${text}`),
    }));
    Alert.alert(
      i18n.t(`${domainColon}${title}`),
      i18n.t(`${domainColon}${message}`),
      _buttons,
      options
    );
  }
);

forward({
  from: showSuccess,
  to: showSuccessFx,
});

showSuccessFx.use(
  ({ domain, title, message, buttons = [{ text: 'OK' }], options }) => {
    const domainColon = domain ? `${domain}:` : '';
    const _buttons = buttons.map(({ text = '', ...props }) => ({
      ...props,
      text: i18n.t(`${domainColon}${text}`),
    }));
    Alert.alert(
      i18n.t(`${domainColon}${title}`),
      i18n.t(`${domainColon}${message}`),
      _buttons,
      options
    );
  }
);
