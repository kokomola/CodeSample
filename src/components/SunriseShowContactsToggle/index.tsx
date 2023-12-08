import React from 'react';
import { Switch } from '@components/uikit/Switch';
import {
  $isShowInterface,
  toggleShowRequest,
} from '@store/sunriseShowContacts';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { styles as s } from './styles';

export const SunriseShowContactsToggle: React.FC = () => {
  const isShowInterface = useStore($isShowInterface) || undefined;

  const [t] = useTranslation('Sunrise');

  return (
    <View style={s.switchWrapper}>
      <Switch
        key={Number(isShowInterface)}
        value={isShowInterface}
        onValueChange={toggleShowRequest}
      />
      <Text style={s.text}>{t('showContacts')}</Text>
    </View>
  );
};
