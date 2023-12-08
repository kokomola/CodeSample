import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { IconButton } from '@components/uikit/IconButton';

import { openSunriseProfileInfoBottomSheet } from '@store/sunrise';
import { $sunriseProgramData } from '@store/sunrise';

import { SunriseProfileInfoBottomSheet } from '@components/SunriseProfileInfoBottomSheet';

import { independence500 } from '@constants/colors';
import { noneStatus } from './img/noneStatus';
import { s } from './styles';

export const SunriseLevelInfo: React.FC = () => {
  const { icon, name, level } = useStore($sunriseProgramData);

  const [t] = useTranslation('SunriseLevelIcon');

  return (
    <View style={s.box}>
      <SvgXml xml={icon || noneStatus} />
      <View style={s.titleContainer}>
        <View style={s.titleBox}>
          <Text style={s.levelName}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text style={s.level}>{`${t('level')} ${level}`}</Text>
        </View>

        <IconButton
          icon={'warning'}
          color={independence500}
          styles={s.iconButton}
          onPress={openSunriseProfileInfoBottomSheet}
        />
      </View>

      <SunriseProfileInfoBottomSheet />
    </View>
  );
};
