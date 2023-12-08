import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import QRCodeScanner, {
  RNQRCodeScannerProps,
} from 'react-native-qrcode-scanner';

import { Button } from '@components/uikit';

import { QRScannerPopupProps } from '@components/QRScanner/types';
import { styles as s } from '@components/QRScanner/styles';

export const QRScanner: React.FC<RNQRCodeScannerProps> = (props) => {
  const [t] = useTranslation('QRScanner');

  return (
    <QRCodeScanner
      permissionDialogTitle={t('requestTitle')}
      permissionDialogMessage={t('requestMessage')}
      buttonPositive={t('requestPositive')}
      notAuthorizedView={
        <View style={{ alignItems: 'center' }}>
          <Text>{t('permissionDenied')}</Text>
        </View>
      }
      {...props}
    />
  );
};

export const QRScannerPopup: React.FC<QRScannerPopupProps> = (props) => {
  const { isOpen, onClose, onRead } = props;

  const [t] = useTranslation('QRScanner');

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      useNativeDriver
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={s.box}>
        <View style={s.tipBox}>
          <Text style={s.tip}>{t('tip')}</Text>
        </View>

        <View style={s.eye}>
          <QRScanner
            onRead={onRead}
            reactivate
            reactivateTimeout={500}
            cameraStyle={s.camera}
          />
        </View>

        <View style={s.closeButton}>
          <Button text={t('closeButtonText')} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
