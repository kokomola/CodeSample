import { BackButton } from '@components/layout/BackButton';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles as s } from './styles';
import { useStore } from 'effector-react';
import { $haveDynamic, $selectedLine } from '@store/sunriseLine';
import { SunriseLineChart } from '@components/SunriseLineChart';
import { SunriseChildrenByLevel } from '@components/SunriseChildrenByLevel';
import { withSpaceAndComma } from '@utils/common/withSpaceAndComma';
import { fixToUsdt } from '@utils/numbers/fix';
import { Triangle } from '@components/Triangle';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { blurSunriseLineScreen, focusSunriseLineScreen } from '@store/app';
import { closeBSFx, openBS, openBSFx } from '@store/bottomSheetCommon';
import { $date } from '@store/sunriseStructure';
import { Donut } from '@components/uikit/Icon/lib';
import { useShowDate } from 'src/hooks/useShowDate';

const SelectedMonthDetail: FC<{ level: number }> = ({ level }) => {
  const [t] = useTranslation('Sunrise');

  const [start] = useStore($date);

  const showDate = useShowDate(start);

  const strLine = `${t('account')} ${level}-${t('thOfLine')}`;
  return (
    <View style={[s.row, s.level]}>
      <Text style={s.text}>{strLine}</Text>
      <Text style={s.text}>{showDate}</Text>
    </View>
  );
};

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const SunriseLine: FC<IProps> = ({ navigation }) => {
  const [t] = useTranslation('Sunrise');
  const line = useStore($selectedLine);
  const haveDinamic = useStore($haveDynamic);
  const disable = useStore(openBSFx.pending || closeBSFx.pending);

  useEffect(() => {
    navigation.addListener('focus', focusSunriseLineScreen);
    navigation.addListener('blur', blurSunriseLineScreen);
  }, [navigation]);

  if (!line) return null;

  const { level, current, min, increase } = line;
  const formatedCurrent = current
    ? withSpaceAndComma(fixToUsdt(current)) + ' USDT'
    : null;
  const formatedMin = withSpaceAndComma(fixToUsdt(min));

  const title = `${t('the')} ${level}${t('lineScreenTitle')}`;
  return (
    <SafeAreaView style={s.sav}>
      <ScrollView style={s.sv}>
        <BackButton text={title} />
        <View style={s.box}>
          <View style={[s.row, s.header]}>
            <View style={s.row}>
              {!!current && <Text style={s.title}>{formatedCurrent}</Text>}
              <Triangle increase={increase} width={20} />
            </View>
            {haveDinamic && (
              <TouchableOpacity
                disabled={disable}
                onPress={() => openBS('SunriseDetailWithDatePicker')}
              >
                <Donut />
              </TouchableOpacity>
            )}
          </View>
          <Text style={s.subTitle}>Min: {formatedMin} USDT</Text>
        </View>

        <SunriseLineChart />

        <View style={s.box}>
          <SelectedMonthDetail level={level} />
          <SunriseChildrenByLevel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
