import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import QRScanner from './index';
import { Button } from '@components/uikit/Button';
import { QRScannerPopupProps } from '@components/QRScanner/types';

import { styles as s } from './styles';

const QRScannerPopup: React.FC<QRScannerPopupProps> = (props) => {
  const { isOpen, onClose, onRead } = props;

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
          <Text style={s.tip}>
            Наведите камеру на QR код с адресом для считывания
          </Text>
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
          <Button text="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default QRScannerPopup;
