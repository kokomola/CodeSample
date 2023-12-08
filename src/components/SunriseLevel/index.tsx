import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStore } from 'effector-react';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { $sunriseProgramData } from '@store/sunrise';
import { $isPassedKyc } from '@store/user';
import { styles } from './styles';
import { redirectToScreenFx } from '@store/redirect';
import { routes } from 'src/navigator/routes';

export const SunriseLevel: React.FC = () => {
  const [t] = useTranslation('SunriseLevelIcon');
  const sunriseProgramData = useStore($sunriseProgramData);
  const isPassedKyc = useStore($isPassedKyc);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => redirectToScreenFx({ screen: routes.tabs.Sunrise })}
      disabled={!isPassedKyc}
    >
      <SvgXml xml={sunriseProgramData.icon} width={44} height={44} />
      <View style={styles.info}>
        <Text style={styles.title}>{sunriseProgramData.status}</Text>
        <Text style={styles.detail}>{t('level')}</Text>
      </View>
    </TouchableOpacity>
  );
};
