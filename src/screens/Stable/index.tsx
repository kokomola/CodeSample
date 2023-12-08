import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, useStoreMap } from 'effector-react';

import { SafeAreaView, View, Text, BackHandler } from 'react-native';
import { BottomSheet } from '@components/BottomSheet';

import { Icon } from '@components/uikit/Icon';
import { IconButton } from '../../components/uikit/IconButton';
import Layout from '../../components/common/Layout';
import { BackButton } from '@components/layout/BackButton';
import { AccountTitle } from '@components/AccountTitle';
import { BalanceBox, DetailsBox, TxsBox } from '@components/AccountLayout';
import { AccountDetailsRow } from '@components/AccountDetailsRow';
import { ActionsPanel } from '@components/uikit/ActionsPanel';

import StableIncomes from '../../components/StableIncomes';
import { StableCloseBottomSheet } from '@components/StableCloseBottomSheet';
import { StableRename } from '@components/StableRename';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';
import { StableTermsBottomSheet } from '@components/StableTermsBottomSheet';

import { fixNumber } from '../../utils/numbers';
import { format } from 'date-fns';

import { blurStableScreen, focusStableScreen } from '@store/app';

import { $stables } from '@store/stables';
import { $name, changeId, changeName, changeTitle } from '@store/stablesRename';

import { openBottomSheetForm } from '@store/stablesClose/index';
import { openBottomSheet } from '@store/bottomSheet';
import {
  closeStableTermsBottomSheetFx,
  openStableTermsBottomSheet,
} from '@store/stables';

import { s } from './styles';

import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { log, logline } from '@utils/debug';
import { $promotionConfig } from '@store/stables/promotion';
import { Currency, mapFundToCurrency, Sign } from '@constants/funds';
import { fix } from '@utils/numbers/fix';

export type StableScreenProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: { params: { id: number } };
};

export const Stable: React.FC<StableScreenProps> = (props) => {
  const { route, navigation } = props;
  const { id } = route.params;

  const { t } = useTranslation('StableScreen');

  React.useEffect(() => {
    changeId(String(id));
  }, [id]);

  React.useEffect(() => {
    if (stable) {
      changeName(stable.title || `Stable #${stable.id}`);
    }

    //log('[Stable]', { ...stable, paymentChart: [] });
  }, [stable]);

  React.useEffect(() => {
    navigation.addListener('focus', () => focusStableScreen());
    navigation.addListener('blur', () => blurStableScreen());
  }, [navigation]);

  // close all bottomsheets on pressing hardware back button (only for Android)
  React.useEffect(() => {
    const backAction = () => {
      blurStableScreen();
      closeStableTermsBottomSheetFx();

      navigation.goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  });

  const name = useStore($name);
  const stable = useStoreMap({
    store: $stables,
    keys: [id],
    fn: (stables) => stables.find((w) => w.id === id) || null,
  });
  const promotions = useStore($promotionConfig);
  const promotion = promotions.find(
    (promotion) => promotion.name === stable?.promotion
  );
  const isClosable = !!promotion?.manual_closing;

  if (stable === null) return null;

  const currency = mapFundToCurrency[stable.currency] || Currency.USDT; // TODO Currency like lowcase

  const stableDetailsRowMap = [
    {
      label: t('deposit'),
      value: `${fixNumber(stable.base_amount, currency)} ${Sign[currency]}`,
    },
    {
      label: t('monthIncome'),
      value: `${(+stable.month_income).toFixed(2)}%`,
    },
    {
      label: t('hasCapitalization'),
      value: stable.is_capitalization ? t('capTrue') : t('capFalse'),
    },
    {
      label: t('term'),
      value: `${stable.term} ${t('termMonthUnit')}`,
    },
    {
      label: t('totalPayout'),
      value: `${fix(stable.total_amount, { currency })} ${Sign[currency]}`,
    },
  ];

  return (
    <>
      <SafeAreaView style={s.wrapper}>
        <View style={s.buttonsBox}>
          <BackButton text={t('appTopbarTitle')} />
          <IconButton
            icon="warning"
            onPress={openStableTermsBottomSheet}
            color="#8c46ff"
            styles={s.iconBox}
          />
        </View>

        <BalanceBox>
          <AccountTitle icon="flare" iconColor={'plain'} title={name} />
        </BalanceBox>

        <Layout.Wrapper>
          <Layout.Section>
            {!stable.is_ended ? (
              <ActionsPanel
                actions={[
                  {
                    icon: 'pencil',
                    onPress: () => {
                      changeTitle(name);
                      openBottomSheet();
                    },
                    label: t('controlEdit'),
                    disabled: false,
                  },
                  {
                    icon: 'cross',
                    onPress: () => openBottomSheetForm(),
                    label: t('controlClose'),
                    disabled: false,
                  },
                ]}
              />
            ) : (
              <View style={s.closedAccountBox}>
                <Icon icon={'sadFace'} color="#ffff" />
                <Text style={s.closedAccountlabel}>{t('closedAccount')}</Text>
              </View>
            )}
          </Layout.Section>

          <DetailsBox title={t('controlInfo')}>
            {stableDetailsRowMap.map((o) => (
              <AccountDetailsRow
                key={o.label}
                value={o.value}
                label={o.label}
              />
            ))}

            {!stable.is_ended ? (
              <AccountDetailsRow
                label={t('netIncome')}
                value={`${fix(stable.income, { currency })} ${Sign[currency]}`}
              />
            ) : (
              <AccountDetailsRow
                label={t('dateClose')}
                value={format(stable.date_end, 'DD.MM.YYYY')}
              />
            )}

            <AccountDetailsRow
              key="promo"
              label={isClosable ? t(stable.promotion!) : t('NoPromo')}
              value={t('Promo')}
            />
          </DetailsBox>

          <TxsBox title={t('paymentSchedule')}>
            <StableIncomes {...stable} />
          </TxsBox>
        </Layout.Wrapper>

        <BottomSheet name="stableRename" hasKeyboard>
          <StableRename />
        </BottomSheet>

        <StableTermsBottomSheet />

        <StableCloseBottomSheet stableId={stable.id} isClosable={isClosable} />
      </SafeAreaView>

      <VerifyCodeBottomSheet />
    </>
  );
};
