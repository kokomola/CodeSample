import React from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { handlePressShare, referralLinkGate } from '@store/referralSystem';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import { Button } from '@components/uikit';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';

import {
  $email,
  $emailErrors,
  $emailInFocus,
  $emailTouched,
  $isFormValid,
  $partnerName,
  $partnerNameErrors,
  $partnerNameInFocus,
  $partnerNameTouched,
  $referralData,
  blurEmail,
  blurPartnerName,
  focusEmail,
  focusPartnerName,
  onChangeEmail,
  onChangePartnerName,
  pressSubmit,
} from '@store/referralWeb';
import { styles as s } from './styles';

export interface IProps {
  modalVisible: boolean;
  setModalVisible: (prop: boolean) => void;
}

export function ReferralLinkModal({ modalVisible, setModalVisible }: IProps) {
  useGate(referralLinkGate);

  const [t] = useTranslation('SunriseMoreInfoBlock');

  const { refferal_link: referralLink } = useStore($referralData);
  const isFormValid = useStore($isFormValid);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity
        style={s.modalShadowWrapper}
        onPress={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => null}>
          <View style={s.modalView}>
            <Text style={s.modalTitle}>{t('partnerLink')}</Text>

            <Text>{referralLink}</Text>

            <Button
              text={t('copy')}
              customStyle={s.modalButton}
              onPress={() => Clipboard.setString(referralLink)}
            />

            <Text style={s.modalTitle2}>{t('invite')}</Text>

            <EmailInput />
            <PartnerNameInput />

            <Button
              text={t('send')}
              customStyle={s.modalButton}
              onPress={pressSubmit}
              disabled={!isFormValid}
            />

            {/*             <Text style={s.modalTitle2}>{t('shareTitle')}</Text>

            <Button
              text={t('shareButton')}
              customStyle={s.modalButton}
              onPress={() => handlePressShare()}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const EmailInput: React.FC = () => {
  const { t } = useTranslation('TransferByEmail');

  const value = useStore($email);
  const inFocus = useStore($emailInFocus);
  const touched = useStore($emailTouched);
  const errors = useStore($emailErrors);

  return (
    <>
      <Input
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeEmail}
        onFocus={focusEmail}
        onBlur={blurEmail}
        focused={inFocus}
        placeholder={t('emailPlaceholder')}
        style={s.modalInput}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};

const PartnerNameInput: React.FC = () => {
  const { t } = useTranslation('SunriseMoreInfoBlock');

  const value = useStore($partnerName);
  const inFocus = useStore($partnerNameInFocus);
  const touched = useStore($partnerNameTouched);
  const errors = useStore($partnerNameErrors);

  return (
    <>
      <Input
        value={value}
        onChangeText={onChangePartnerName}
        placeholder={t('partnerName')}
        onFocus={focusPartnerName}
        onBlur={blurPartnerName}
        focused={inFocus}
      />
      <InputError visible={inFocus || touched} error={errors[0]} />
    </>
  );
};
