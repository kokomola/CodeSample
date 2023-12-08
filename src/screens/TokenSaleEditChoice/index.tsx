import React from 'react';
import { useStoreMap } from 'effector-react';

import {
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';

import { MaintenanceView } from '@components/MaintenanceView';
import { BackButton } from '@components/layout/BackButton';
import { TokenSaleParticipants } from '@components/TokenSaleParticipants';
import { TokenSalePriceInput } from '@components/TokenSalePriceInput';
import { TokenSaleAvailablePayments } from '@components/TokenSaleAvailablePayments';
import { TokenSalePublished } from '@components/TokenSalePublished';
import { VerifyCodeBottomSheet } from '@components/VerifyCodeBottomSheet';

import { $tokenSaleOffers } from '@store/tokenSale';

import { styles as s } from './styles';
import { TokenSaleEditProgramProps } from './types';
import { TokenSaleForSOL } from '@components/TokenSaleForSOL';

export const TokenSaleEditChoice: React.FC<TokenSaleEditProgramProps> = (
  props
) => {
  const { navigation, route } = props;
  const { id, editChoice } = route.params;

  const tokenSaleOffer = useStoreMap({
    store: $tokenSaleOffers,
    keys: [id],
    fn: (offer, [f]) => offer.find((o) => o.id === f) || null,
  });

  if (tokenSaleOffer === null) return <MaintenanceView />;

  return (
    <TouchableWithoutFeedback style={s.sav} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={s.sav}>
        <BackButton />

        <View style={s.wrapper}>
          {editChoice === 'price' && (
            <TokenSalePriceInput
              price={tokenSaleOffer.price}
              tokenId={tokenSaleOffer.id}
            />
          )}

          {editChoice === 'participants' && (
            <TokenSaleParticipants
              availableUserAmbassadorLevel={
                tokenSaleOffer.availableUserAmbassadorLevel
              }
              availableUserSunriseStatus={
                tokenSaleOffer.availableUserSunriseStatus
              }
              tokenId={tokenSaleOffer.id}
              navigation={navigation}
            />
          )}

          {editChoice === 'availablePayments' && (
            <TokenSaleAvailablePayments
              availablePayments={tokenSaleOffer.availablePayments}
              tokenId={tokenSaleOffer.id}
            />
          )}

          {editChoice === 'availablePaySol' && (
            <TokenSaleForSOL
              availablePayments={tokenSaleOffer.availablePayments}
              tokenId={tokenSaleOffer.id}
            />
          )}

          {editChoice === 'isPublished' && (
            <TokenSalePublished
              isPublished={tokenSaleOffer.isPublished}
              tokenId={tokenSaleOffer.id}
            />
          )}
        </View>

        <VerifyCodeBottomSheet />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
