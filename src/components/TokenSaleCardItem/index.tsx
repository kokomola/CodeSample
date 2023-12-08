import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { InfoRow } from '@components/uikit/InfoRow';
import { Button } from '@components/uikit';
import { styles as s } from './styles';
import { StyleProp, ViewStyle } from 'react-native';
import { TokenSaleOffers } from '@store/tokenSale/type';
import { format } from 'date-fns';
import { routes } from 'src/navigator/routes';
import { useStore } from 'effector-react';
import { $isVerifiedAnd2fa } from '@store/user';

interface IProps {
  token: TokenSaleOffers;
  onPress: () => void;
  imageURI: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TokenSaleCardItem: React.FC<IProps> = ({
  token,
  imageURI,
  containerStyle,
  onPress,
}) => {
  const {
    id,
    code,
    title,
    description,
    price,
    totalSupply,
    isOwner,
    isBuyable,
    sold,
  } = token;

  const navigation = useNavigation();
  const isVerifiedAnd2fa = useStore($isVerifiedAnd2fa);

  const { tokenSaleNav } = routes;

  const [t] = useTranslation('TokenSale');

  return (
    <TouchableOpacity style={[s.cardWrapper, containerStyle]} onPress={onPress}>
      <InfoRow
        imageURI={imageURI}
        leftTextTop={code}
        leftTextBottom={title}
        containerStyle={s.infoRow}
      />

      <View style={s.infoBox}>
        <Text>{t('price')}</Text>
        <Text style={s.value}>{`1 ${code} = ${price} USDT`}</Text>
      </View>

      <View style={s.infoBox}>
        <Text>{t('salesStart')}</Text>
        <Text style={s.value}>
          {token?.startAt ? format(token?.startAt, 'DD.MM.YY / HH:mm') : '-'}
        </Text>
      </View>

      <View style={s.infoBox}>
        <Text>{t('salesEnd')}</Text>
        <Text style={s.value}>
          {token?.endAt ? format(token?.endAt, 'DD.MM.YY / HH:mm') : '-'}
        </Text>
      </View>

      <View style={s.infoBox}>
        <Text>{t('tokensAvailable')}</Text>
        <Text style={s.value}>
          {totalSupply - sold} {code}
        </Text>
      </View>

      {isVerifiedAnd2fa && isBuyable && (
        <Button
          text={`${t('buttonBuy')} ${code}`}
          customStyle={s.button}
          onPress={() =>
            navigation.navigate(tokenSaleNav.TokenSaleBuy, {
              id,
            })
          }
        />
      )}

      {isOwner && (
        <Button
          text={`${t('buttonEdit')} ${code}`}
          customStyle={s.button}
          onPress={() =>
            navigation.navigate(tokenSaleNav.TokenSaleEdit, {
              id,
            })
          }
        />
      )}
    </TouchableOpacity>
  );
};
