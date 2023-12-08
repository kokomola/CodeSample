import React from 'react';
import { SafeAreaView, ScrollView, View, Linking } from 'react-native';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Button } from '@components/uikit';
import { BackButton } from '@components/layout/BackButton';
import { AccountDetailsRow } from '@components/AccountDetailsRow';

import { alertFx } from '@store/app';

import { styles as s } from './styles';
import { log } from '@utils/debug';
import { $filteredOrders } from '@store/shopHistory';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';

interface IShopOrderDetails {
  navigation: StackNavigationProp<ParamListBase>;
  route: {
    params: { id: number };
  };
}

export const ShopOrderDetails: React.FC<IShopOrderDetails> = (props) => {
  const { route } = props;
  const { id } = route.params;

  const [t] = useTranslation('ShopOrderDetails');

  const currentOrder = useStoreMap({
    store: $filteredOrders,
    keys: [id],
    fn: (order) => order.find((w) => w.id === id) || null,
  });

  if (!currentOrder) return null;

  const information = [
    {
      name: `${t('date')}`,
      value: moment(currentOrder.createdAt).format(`DD.MM.YY / HH:mm`),
    },
    {
      name: `${t('transportCompany')}`,
      value: currentOrder.tracking_link || '-',
      hasCopyOnPress: true,
    },
    {
      name: `${t('trackingNumber')}`,
      value: currentOrder.tracking_number || '-',
      hasCopyOnPress: true,
    },
    { name: `${t('fullName')}`, value: currentOrder.recipient },
    { name: `${t('phone')}`, value: currentOrder.phone },
    { name: `${t('address')}`, value: currentOrder.address },
    {
      name: `${t('comment')}`,
      value: currentOrder.comment || `${t('noComment')}`,
    },
  ];

  return (
    <SafeAreaView style={s.mainWrapper}>
      <BackButton text={`${t('screenTitle')} № ${id}`} />
      <ScrollView>
        <View style={s.orderDetailsContainer}>
          {information.map((info) => (
            <AccountDetailsRow
              value={info.value}
              label={info.name}
              key={info.name}
              hasCopyOnPress={info.hasCopyOnPress}
            />
          ))}
        </View>
        <View style={s.buttonWrapper}>
          <Button
            text={t('linkToTransportCompany')}
            onPress={() => {
              if (!currentOrder.tracking_link)
                return alertFx({
                  title: `${t('error')}`,
                  message: `${t('errorNoLink')}`,
                });

              Linking.openURL(currentOrder.tracking_link).catch((err) => {
                log('Failed opening page because: ', err);
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
