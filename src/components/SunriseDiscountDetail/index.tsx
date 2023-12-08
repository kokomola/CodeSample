import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useStore } from 'effector-react';
import { $selectedDiscountItem } from '@store/sunriseDiscountHistory';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { styles as s } from './styles';

export const SunriseDiscountDetail: FC = () => {
  const [t] = useTranslation('Sunrise');

  const selectedItem = useStore($selectedDiscountItem);

  if (!selectedItem) return null;

  const { balance, reason, changeDate } = selectedItem;
  return (
    <View style={s.box}>
      <Text style={s.title}>{t('detalization')}</Text>
      <View style={s.row}>
        <Text style={s.text}>{t('balance')}</Text>
        <Text style={s.text}>{balance ? balance : '-'} Sollar</Text>
      </View>
      <View style={s.row}>
        <Text style={[s.text, s.column35]}>{t('comment')}</Text>

        <Text style={[s.text, s.column65, s.right]}>
          {`${t(reason)} ${moment(changeDate).format('DD.YYYY')}`}
        </Text>
      </View>
    </View>
  );
};
