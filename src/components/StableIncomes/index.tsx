import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

import * as colors from '@constants/colors';
import { s } from './styles';

import { ScrollView } from 'react-native';
import { CircleIcon } from '@components/uikit/Icon';

import { fixNumber } from '../../utils/numbers';

import { Cryptocurrencies, Stable } from '@store/stables/types';

const StableIncomes: React.FC<Stable> = (props) => {
  const { paymentChart, is_ended: isEnded, currency } = props;

  const normalizeDate = (string) => {
    const parts = string.split('-');

    return new Date(+parts[2], parts[1] - 1, +parts[0]);
  };

  return (
    <ScrollView>
      {paymentChart.map((income) => (
        <View style={s.box} key={`${income.date} + ${income.rest}`}>
          <View style={s.iconBox}>
            <CircleIcon
              icon={income.isPaid ? 'check' : isEnded ? 'cross' : 'sandGlass'}
              color={income.isPaid ? colors.oceanGreen : colors.space500}
            />
          </View>

          <View style={s.infoBox}>
            <Text style={s.amountText}>
              {fixNumber(income.month_income, currency || 'usdt')}{' '}
              {Cryptocurrencies[currency || 'usdt']}{' '}
            </Text>
            <Text style={s.typeText}>
              {fixNumber(income.rest, currency || 'usdt')}{' '}
              {Cryptocurrencies[currency || 'usdt']}
            </Text>
          </View>

          <View style={s.dateBox}>
            <Text style={s.dateText}>
              {format(normalizeDate(income.date), 'DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default StableIncomes;
