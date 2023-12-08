import React from 'react';
import {
  ActivityIndicator,
  SectionList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { OrdersHistoryListHeaderItem } from '@components/ShopHistoryListHeaderItem';
import { OrdersHistoryListItem } from '@components/ShopHistoryListItem';
import { BackButton } from '@components/layout/BackButton';
import { RadioButton } from '@components/uikit/RadioButtons';
import { Button } from '@components/uikit';
import { NothingFoundLabel } from '@components/NothingFoundLabel/NothingFoundLabel';

import {
  $filteredOrders,
  $ordersHistory,
  fetchOrdersHistoryFx,
  filterOrders,
  historyGate,
  resetOrdersFilter,
} from '@store/shopHistory';

import { styles as s } from './styles';
import { IShopHistory, OrderStatusTypes } from './types';
import { purple500 } from '@constants/colors';
import { getProductOrderValues } from '@utils/getOrderValues';
import { AmirWalletNamedRoutes } from 'src/navigator/WalletNavigator';
import { routes } from 'src/navigator/routes';

export const ShopHistory: React.FC<IShopHistory> = (props) => {
  useGate(historyGate);
  const { navigation } = props;

  const [t] = useTranslation('ShopHistory');

  const orders = useStore($ordersHistory);
  const isLoading = useStore(fetchOrdersHistoryFx.pending);
  const filteredOrders = useStore($filteredOrders);

  const statuses: OrderStatusTypes[] = [
    { key: 'default', label: `${t('default')}` },
    { key: 'new', label: `${t('new')}` },
    { key: 'processing', label: `${t('processing')}` },
    { key: 'approved', label: `${t('approved')}` },
    { key: 'shipping', label: `${t('shipping')}` },
    { key: 'done', label: `${t('done')}` },
    { key: 'cancelled', label: `${t('cancelled')}` },
  ];

  const [activeCategory, setActiveCategory] = React.useState(statuses[0].key);

  if (isLoading) {
    return (
      <View style={s.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color={purple500} />
        <Text style={s.loadingIndicatorText}>{t('pendingText')}</Text>
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <SafeAreaView style={s.main}>
        <BackButton text={t('screenTitle')} />
        <View style={s.ordersNotFound}>
          <NothingFoundLabel title={t('empty')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.main}>
      <BackButton text={t('screenTitle')} />

      <View style={s.radioButtonsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {statuses.map((status) => (
            <RadioButton
              key={status.key}
              text={`${status.label} (${
                status.key === 'default'
                  ? orders.length
                  : orders.filter((order) => order.status === status.key).length
              })`}
              active={activeCategory === status.key}
              onPress={() => {
                setActiveCategory(status.key);
                return status.key === 'default'
                  ? resetOrdersFilter()
                  : filterOrders(status.key);
              }}
            />
          ))}
        </ScrollView>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={s.ordersNotFound}>
          <NothingFoundLabel title={t('empty')} />
        </View>
      ) : null}

      <SafeAreaView style={s.main}>
        <SectionList
          sections={filteredOrders.map((o) => ({
            title: { date: o.createdAt, status: o.status, id: o.id },
            data: o.order_products.map((obj) => {
              const productOrder = getProductOrderValues(obj);

              return {
                id: productOrder.id,
                price: productOrder.price,
                quantity: productOrder.quantity,
                title: productOrder.title,
                colorName: productOrder.colorName,
                colorOption: productOrder.colorOption,
                picture: productOrder.picture,
              };
            }),
          }))}
          keyExtractor={(_, index) => `${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <OrdersHistoryListHeaderItem status={title.status} id={title.id} />
          )}
          renderItem={({ item }) => (
            <OrdersHistoryListItem
              optionName={item.colorOption}
              colorName={item.colorName}
              key={item.id}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              imageUri={item.picture}
            />
          )}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          renderSectionFooter={({ section: { title } }) => (
            <View style={s.buttonWrapper}>
              <Button
                text={t('orderDetailsBtn')}
                type="secondary"
                onPress={() =>
                  navigation.navigate(routes.shopNav.ShopOrderDetails, {
                    id: title.id,
                  })
                }
              />
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};
