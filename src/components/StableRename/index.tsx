import React from 'react';
import { Text, View } from 'react-native';

import {
  $id,
  $idErrors,
  $isFormValid,
  $title,
  $titleErrors,
  $titleInFocus,
  $titleTouched,
  blurTitle,
  changeTitle,
  focusTitle,
  pressSubmitRename,
} from '@store/stablesRename';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { Input } from '@components/uikit/Input';
import { InputError } from '@components/uikit/InputError';
import { Button } from '@components/uikit/Button';

import { styles as s } from './styles';
import { closeBottomSheet } from '@store/bottomSheet';

const TitleInput: React.FC = () => {
  const { t } = useTranslation('Stable');

  const value = useStore($title);
  const inFocus = useStore($titleInFocus);
  const touched = useStore($titleTouched);
  const errors = useStore($titleErrors);

  return (
    <View>
      <Input
        value={value}
        onChangeText={changeTitle}
        onFocus={focusTitle}
        onBlur={blurTitle}
        placeholder={t('renameTitle')}
        focused={inFocus}
        autoCorrect={false}
      />
      <InputError visible={touched} error={errors[0]} />
    </View>
  );
};

export const StableRename: React.FC = () => {
  const { t } = useTranslation('Stable');
  const isFormValid = useStore($isFormValid);
  return (
    <View>
      <View style={s.btmSheetBox}>
        <Text style={s.btmSheetTitle}>{t('renameTitle')}</Text>
        <TitleInput />
      </View>
      <View style={s.btmSheetBtnBox}>
        <View style={s.btnSheetBtnWrapper}>
          <Button
            kind="SheetButton"
            text={t('cancel')}
            type="secondary"
            onPress={closeBottomSheet}
          />
        </View>
        <View style={s.btnSheetBtnWrapper}>
          <Button
            disabled={!isFormValid}
            kind="SheetButton"
            text={t('save')}
            onPress={pressSubmitRename}
          />
        </View>
      </View>
    </View>
  );
};
