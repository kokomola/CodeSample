import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView } from 'react-native';
import { useStoreMap } from 'effector-react';
import { format } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

import { Button } from '@components/uikit';
import { BackButton } from '@components/layout/BackButton';
import { $tokenSaleOffers } from '@store/tokenSale';

import { ambassadorStatusMap, sunriseNewStatusMap } from '@utils/sunriseMaps';
import { widthScreen as ws } from '@constants/platform';
import * as colors from '@constants/colors';

import { MaintenanceView } from '@components/MaintenanceView';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import WebView from 'react-native-webview';

interface TokenSaleOfferDetailsProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: { params: { id: number } };
}

export const TokenSaleOfferDetails: React.FC<TokenSaleOfferDetailsProps> = (
  props
) => {
  const { navigation, route } = props;
  const { id = null } = route.params;

  const { t } = useTranslation('TokenSale');

  const token = useStoreMap({
    store: $tokenSaleOffers,
    keys: [id],
    fn: (offer, [f]) => offer.find((o) => o.id === f) || null,
  });

  if (token === null) return <MaintenanceView />;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Web View</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=${ws - 18}, user-scalable=no">
          <style type="text/css">
          html{
              height: 100%;
            }
            body {
              margin: 0;
              padding: 0;
              min-height: 100%;
              font-family: sans-serif;
            }
            p {
              margin: 5px;
              color: ${colors.space900};
              font-size: 14px;
            }
            strong {
              display: block;
              margin: 22px 0 14px;
              color: #14121e;
              font-size: 14.4px;
            }
            .title {
              margin: 20px 0 20px;
              font-weight: bold;
            }
            .info {
              font-weight: bold;
              color: ${colors.space900};
              /* border: solid;
              border-width: 1px;
              border-color: green; */
            }
            .row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              //border: 1px solid yellow;
            }
            .icon {
              border-radius: 50%;
            }
            .icon-info {
              display: flex;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="icon-info">
            <img class="icon" src=${token.image} width="50" height="50" >
            <div>
              <p class="info">${token.code}</p>
              <p>${token.title}</p>
            </div>
          </div>
          <div class="row">
            <p class="info">${t('price')}</p>
            <p class="info">${`1 ${token.code} = ${token.price} USDT`}</p>
          </div>
          <div class="row">
            <p class="info">${t('tokensAvailable')}</p>
            <p class="info">${token.totalSupply - token.sold} ${token.code}</p>
          </div>
          <div class="row">
            <p class="info">${t('salesStart')}</p>
            <p class="info">${
              token?.startAt
                ? format(token?.startAt, 'DD.MM.YYYY / HH:mm')
                : '-'
            }</p>
          </div>
          <div class="row">
            <p class="info">${t('participants')}</p>
            <p class="info">${token.availableUserSunriseStatus.map(
              (o) =>
                sunriseNewStatusMap[o]?.charAt(0).toUpperCase() +
                sunriseNewStatusMap[o]?.slice(1)
            )}</p>
          </div>
          <div class="row">
            <p/>
            <p class="info">${token?.availableUserAmbassadorLevel?.map(
              (o) => ambassadorStatusMap[o]
            )}</p>
          </div>
          <p class="title">${t('description')}</p>
          <p>${token.description.replace(
            '<strong>',
            '<strong class="title">'
          )}</p>
        </body>
      </html>`;

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={'details'} />
      <ScrollView style={s.sv} contentContainerStyle={{ flexGrow: 1 }}>
        <WebView source={{ html }} />

        {token.isBuyable && (
          <Button
            text={`${t('buttonBuy')} ${token.code}`}
            customStyle={s.button}
            onPress={() =>
              navigation.navigate(routes.tokenSaleNav.TokenSaleBuy, { id })
            }
          />
        )}

        {token.isOwner && (
          <Button
            text={`${t('buttonEdit')} ${token.code}`}
            customStyle={s.button}
            onPress={() =>
              navigation.navigate(routes.tokenSaleNav.TokenSaleEdit, { id })
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
