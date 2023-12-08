import * as React from 'react';
import {useGate, useStore} from 'effector-react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import * as colors from '@constants/colors';
import {bn} from '@utils/numbers/bn';

import {
  $ambassadorActivityMoneyGrowth,
  $ambassadorActivityPartnersGrowth,
  $sunriseUserData,
  sunriseGate,
} from '@store/sunrise';

import {BackButton} from '@components/layout/BackButton';
import {ActionsPanelBoxVertical} from '@components/layout/ActionsPanelBoxVertical';
import {AccountDetailsRow} from '@components/AccountDetailsRow';
import {DetailsBox} from '@components/AccountLayout';
import {Button} from '@components/uikit';

import {styles as s} from './styles';
import arrowUp from './images/arrowUp';
import arrowDown from './images/arrowDown';

const IconArrowUp: React.FC = () => {
  return (
    <SvgXml xml={arrowUp({color: colors.oceanGreen})} width={12} height={8} />
  );
};

const IconArrowDown: React.FC = () => {
  return (
    <SvgXml xml={arrowDown({color: colors.fieryRose})} width={12} height={8} />
  );
};

const Row: React.FC<{
  name: string;
  max: string;
  current: string;
  diff: string;
  received: string;
}> = props => {
  const [t] = useTranslation('SunriseAmbassadorActivity');
  const {name, max, current, diff, received} = props;
  const isDiffZero = bn(diff).isZero();
  const isDiffPositive = bn(diff).isPositive();

  const renderIcon = () => {
    if (isDiffZero) return null;
    if (isDiffPositive) return <IconArrowUp />;
    return <IconArrowDown />;
  };

  const renderDiff = () => {
    if (isDiffZero) return null;
    if (isDiffPositive) return `(+${diff})`;
    return `(${diff})`;
  };

  return (
    <View style={s.row}>
      <View>
        <View style={s.current}>
          <Text style={s.currentText}>
            {name}: {current} {renderDiff()}
          </Text>
          {renderIcon()}
        </View>

        <Text style={s.max}>
          {t('max')}: {max}
        </Text>
      </View>

      <Text style={s.income}>+ {received} SGC</Text>
    </View>
  );
};

export const SunriseAmbassadorActivity: React.FC = () => {
  useGate(sunriseGate);
  const [t] = useTranslation('SunriseAmbassadorActivity');

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const data = useStore($sunriseUserData);
  const partnerGrowth = useStore($ambassadorActivityPartnersGrowth);
  const moneyGrowth = useStore($ambassadorActivityMoneyGrowth);

  const snapPoints = React.useMemo(() => {
    return [1, '80%'];
  }, []);

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('backButtonText')} />

      <ScrollView>
        <ActionsPanelBoxVertical>
          <Button
            text={t('helpButtonText')}
            onPress={() => bottomSheetRef.current?.expand()}
          />
        </ActionsPanelBoxVertical>

        <DetailsBox>
          <AccountDetailsRow
            label={t('sollarCondition')}
            value={`${data.activity_stats.solar_condition} SGC`}
          />
          <AccountDetailsRow
            label={t('totalReceived')}
            value={`${data.activity_stats.total_received} SGC`}
          />
        </DetailsBox>

        <DetailsBox title={t('partnersDetailsTitle')}>
          {partnerGrowth.map(({name, max, current, diff, received}) => (
            <Row
              key={`partner_${name}`}
              name={name}
              max={max}
              current={current}
              diff={diff}
              received={received}
            />
          ))}
        </DetailsBox>

        <DetailsBox title={t('cashDetailsTitle')}>
          {moneyGrowth.map(({name, max, current, diff, received}) => (
            <Row
              key={`money_${name}`}
              name={name}
              max={max}
              current={current}
              diff={diff}
              received={received}
            />
          ))}
        </DetailsBox>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        index={-1}
        topInset={100}
        enablePanDownToClose={true}>
        <BottomSheetScrollView>
          <View style={s.help}>
            <Text style={s.helpTitle}>{t('helpTitle')}</Text>
            <Text style={s.helpSubTitle}>{t('rule1Title')}</Text>
            <Text style={s.helpText}>{t('rule1Text')}</Text>
            <Text style={s.helpSubTitle}>{t('rule2Title')}</Text>
            <Text style={s.helpText}>{t('rule2Text')}</Text>
            <Text style={s.helpSubTitle}>{t('rule3Title')}</Text>
            <Text style={s.helpText}>{t('rule3Text')}</Text>
            <Text style={s.helpSubTitle}>{t('rule4Title')}</Text>
            <Text style={s.helpText}>{t('rule4Text')}</Text>
            <Text style={s.helpSubTitle}>{t('rule5Title')}</Text>
            <Text style={s.helpText}>{t('rule5Text')}</Text>
            <Text style={s.helpSubTitle}>{t('rule6Title')}</Text>
            <Text style={s.helpText}>{t('rule6Text')}</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};
