import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useStore } from 'effector-react';
import {
  $detailByDate,
  $range,
  $selectedDatePicker,
  selectDateByPicker,
} from '@store/sunriseLine';
import { bn } from '@utils/numbers/bn';
import * as fix from '@utils/numbers/fix';
import { useTranslation } from 'react-i18next';
import { withSpaceAndComma } from '@utils/common/withSpaceAndComma';
import moment from 'moment';
import { styles as s } from './styles';
import { Button } from '@components/uikit';
import i18n, { getLocale } from '@utils/i18n';
import DatePicker from '@components/uikit/Calendar';
import { isEqualDates } from '@utils/common/date';

const AppDatePicker: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);

  const range = useStore($range);
  const selectedDate = useStore($selectedDatePicker);

  const locale = getLocale(i18n);

  const showDatePicker = () => {
    setVisibility(true);
  };
  const hideDatePicker = () => {
    setVisibility(false);
  };

  const onConfirm = (date: Date) => {
    if (!isEqualDates(selectedDate, date)) {
      selectDateByPicker(date);
    }
    hideDatePicker();
  };

  return (
    <>
      <Button
        kind="SheetButton"
        text={moment(selectedDate).format('D MMMM YYYY')}
        type="ghost"
        onPress={showDatePicker}
      />
      <DatePicker
        key={selectedDate.getTime()}
        mode="single"
        isVisible={isVisible}
        initialDate={selectedDate}
        onCancel={hideDatePicker}
        onConfirm={onConfirm}
        minDate={moment(range.first).add(-1, 'day').toDate()}
        maxDate={range.last}
        locale={locale}
      />
    </>
  );
};

export const SunriseDetailWithDatePicker: FC = () => {
  const [t] = useTranslation('Sunrise');

  const detail = useStore($detailByDate);
  const selectedDate = useStore($selectedDatePicker);

  const { date, sum, btc = '0', eth = '0', usdt = '0' } = detail || {
    sum: bn(0),
  };

  const isEqual = !!date && isEqualDates(date, selectedDate);

  return (
    <View style={s.box}>
      <View style={s.row}>
        <Text style={s.title}>{t('detalization')}</Text>
        <AppDatePicker />
      </View>
      {detail && isEqual ? (
        <>
          <View style={s.row}>
            <Text style={s.text}>{t('equivalent')}</Text>
            <Text style={s.text}>
              {withSpaceAndComma(fix.fixToUsdt(sum))} USDT
            </Text>
          </View>
          <View style={s.row}>
            <Text style={s.text}>Bitcon</Text>
            <Text style={s.text}>{withSpaceAndComma(fix.toBtc(btc))} BTC</Text>
          </View>
          <View style={s.row}>
            <Text style={s.text}>Ethereum</Text>
            <Text style={s.text}>{withSpaceAndComma(fix.toEth(eth))} ETH</Text>
          </View>
          <View style={s.row}>
            <Text style={s.text}>Tether</Text>
            <Text style={s.text}>
              {withSpaceAndComma(fix.fixToUsdt(usdt))} USDT
            </Text>
          </View>
        </>
      ) : (
        <Text>{t('noData')}</Text>
      )}
    </View>
  );
};
