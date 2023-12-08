import * as React from 'react';
import { View, Text } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $user } from '@store/user';
import { $settings } from '@store/settings';

import Box from '../common/Box';

import { convertationWithFee } from '@utils/common/convertationWithFee';
import { showCourse } from '@utils/common/course';

import { styles as s } from './styles';

const coursesToRender = [
  ['btc', 'usdt'],
  ['btc', 'eth'],
  ['eth', 'usdt'],
];

export const Courses: React.FC = () => {
  const [t] = useTranslation('Courses');

  const { course } = useStore($user);
  const settings = useStore($settings);

  return (
    <Box style={s.box}>
      <View>
        <View style={s.labels}>
          <Text style={s.labelPair}>{t('pair')}</Text>
          <Text style={s.labelBuy}>{t('buying')}</Text>
          <Text style={s.labelSell}>{t('selling')}</Text>
        </View>

        {coursesToRender.map(([currencyFrom, currencyTo]) => (
          <View style={s.item} key={`${currencyFrom}_${currencyTo}`}>
            <View style={s.itemName}>
              <Text style={s.itemNameText}>
                {currencyFrom}/{currencyTo}
              </Text>
            </View>
            <View style={s.itemBuy}>
              <Text style={s.itemBuyText}>
                {showCourse(
                  convertationWithFee(
                    currencyFrom,
                    currencyTo,
                    course,
                    settings.transferComissionRate
                  )
                )}
              </Text>
              <Text style={s.itemBuyTicker}>
                {currencyTo.toLowerCase() === 'usdt' ? '$' : currencyTo}
              </Text>
            </View>
            <View style={s.itemSell}>
              <Text style={s.itemSellText}>
                {showCourse(
                  convertationWithFee(
                    currencyTo,
                    currencyFrom,
                    course,
                    settings.transferComissionRate
                  )
                )}
              </Text>
              <Text style={s.itemSellTicker}>
                {currencyTo.toLowerCase() === 'usdt' ? '$' : currencyTo}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Box>
  );
};
