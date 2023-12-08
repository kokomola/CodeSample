import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { FlatList, SafeAreaView, Text } from 'react-native';

import { TokenSaleCardItem } from '@components/TokenSaleCardItem';
import { $tokenSaleOffers, tokensGate } from '@store/tokenSale';

import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { styles as s } from './styles';
import { Header } from '@components/Header';
import { routes } from 'src/navigator/routes';

interface TokenSaleProgramProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const TokenSale: React.FC<TokenSaleProgramProps> = (props) => {
  useGate(tokensGate);

  const tokenSaleOffers = useStore($tokenSaleOffers);

  const { navigation } = props;

  const [t] = useTranslation('TokenSale');

  return (
    <SafeAreaView style={s.sav}>
      <Header style={s.header} />
      <Text style={s.title}>{t('title')}</Text>
      <Text style={s.text}>{t('welcome')}</Text>

      <FlatList
        data={tokenSaleOffers}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TokenSaleCardItem
            imageURI={item.image}
            containerStyle={s.cardContainer}
            token={item}
            onPress={() =>
              navigation.navigate(routes.tokenSaleNav.TokenSaleOfferDetails, {
                id: item.id,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};
