import { Event } from 'react-native-qrcode-scanner';

export type QRScannerPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onRead: (e: Event) => void;
};
