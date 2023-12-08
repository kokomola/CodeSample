import { $isOpenned, closeModal } from '@store/modal';
import { useStore } from 'effector-react';
import React from 'react';
import { Modal } from 'react-native';
import { s } from './styles';

export default function ModalWrapper({ children, header }: any) {
  const isOpenned = useStore($isOpenned);

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      //transparent={true}
      visible={isOpenned}
      onRequestClose={closeModal}
    >
      {children}
    </Modal>
  );
}
