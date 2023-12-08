import * as React from 'react';
// import { Alert } from 'react-native';
// import { useTranslation } from 'react-i18next';

import {Input, IInputProps} from '@components/uikit/Input';
import {QRScannerPopup} from '@components/QRScanner';

import {readURI} from '@utils/qrCodes';

export const AddressInput: React.FC<IInputProps> = props => {
  const {onChangeText} = props;

  // const [t] = useTranslation('AddressInput');

  const [isReaderOpen, setReaderState] = React.useState(false);
  const closeReader = () => setReaderState(false);
  const openReader = () => setReaderState(true);

  return (
    <>
      <Input
        {...props}
        icon="qr"
        onPressIcon={openReader}
        onChangeText={onChangeText}
      />
      {/* <QRScannerPopup
        isOpen={isReaderOpen}
        onClose={closeReader}
        onRead={(e) => {
          if (!e.data || !onChangeText) return null;

          readURI(e.data, {
            onSuccess: ({ address }: { address: string }) => {
              onChangeText(address);
              closeReader();
            },
            onFail: () => null,
          });
        }}
      /> */}
    </>
  );
};
