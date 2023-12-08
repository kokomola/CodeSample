import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreMap } from 'effector-react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { $tokenSaleOffers } from '@store/tokenSale';

import { BackButton } from '@components/layout/BackButton';
import { MaintenanceView } from '@components/MaintenanceView';

import { Icon } from '@components/uikit/Icon';
import { space400 } from '@constants/colors';

import { styles as s } from './styles';
import { EditInfoRowProps } from './types';
import { TokenSaleEditProgramProps } from '../TokenSaleEditChoice/types';
import { routes } from 'src/navigator/routes';
import { Currencies } from '@store/tokenSale/type';

export const TokenSaleEdit: React.FC<TokenSaleEditProgramProps> = (props) => {
  const { navigation, route } = props;
  const { id } = route.params;

  const [t] = useTranslation('TokenSaleEdit');

  const tokenSaleOffer = useStoreMap({
    store: $tokenSaleOffers,
    keys: [id],
    fn: (offer, [f]) => offer.find((o) => o.id === f) || null,
  });

  if (tokenSaleOffer === null) return <MaintenanceView />;

  const participants =
    tokenSaleOffer.availableUserSunriseStatus.length === 6 &&
    tokenSaleOffer.availableUserAmbassadorLevel.length === 5
      ? t('all')
      : t('specific');

  const availablePaySol = tokenSaleOffer.availablePayments.includes(
    Currencies.SOL.toLowerCase()
  )
    ? t('yes')
    : t('no');

  const editInfoMap = [
    {
      title: t('price'),
      value: `${tokenSaleOffer.price}`,
      onPress: () =>
        navigation.navigate(routes.tokenSaleNav.TokenSaleEditChoice, {
          id: tokenSaleOffer.id,
          editChoice: 'price',
        }),
    },
    {
      title: t('participants'),
      value: participants,
      onPress: () =>
        navigation.navigate(routes.tokenSaleNav.TokenSaleEditChoice, {
          id: tokenSaleOffer.id,
          editChoice: 'participants',
        }),
    },
    {
      title: t('availablePaySol'),
      value: availablePaySol,
      onPress: () =>
        navigation.navigate(routes.tokenSaleNav.TokenSaleEditChoice, {
          id: tokenSaleOffer.id,
          editChoice: 'availablePaySol',
        }),
    },
    {
      title: t('isPublished'),
      value: `${tokenSaleOffer.isPublished ? t('yes') : t('no')}`,
      onPress: () =>
        navigation.navigate(routes.tokenSaleNav.TokenSaleEditChoice, {
          id: tokenSaleOffer.id,
          editChoice: 'isPublished',
        }),
    },
  ];

  return (
    <SafeAreaView style={s.sav}>
      <BackButton />

      <Text style={s.title}>{t('editTokenSale')}</Text>

      {editInfoMap.map((item, index) => (
        <EditInfoRow
          key={index}
          title={item.title}
          value={item.value}
          onPress={item.onPress}
        />
      ))}
    </SafeAreaView>
  );
};

const EditInfoRow: React.FC<EditInfoRowProps> = (props) => {
  const { value, title, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={s.infoBox}>
        <Text style={s.category}>{title}</Text>

        <View style={s.iconBox}>
          <Text style={s.iconBoxItemText}>{value}</Text>
          <Icon icon="chevronRight" color={space400} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
