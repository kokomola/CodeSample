import React, { FC, useCallback, useEffect } from 'react';
import { useStore } from 'effector-react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  $basket,
  $basketPrice,
  $basketQuantity,
  fetchBasketRequestFx,
  removeItemFromBasket,
} from '@store/shopBasket';
import { $sollarBalance, fetchSollarRequestFx } from '@store/sollars';
import { focusShopBasketScreen } from '@store/app';

import { Button } from '@components/uikit';
import { ShopCartItem } from '@components/ShopCartItem';
import { BackButton } from '@components/layout/BackButton';

import { changeQuantityItem } from '../../store/shopBasket/index';
import { BasketItem } from '../../store/shopBasket/types';
import { selectProduct } from '@store/shopProduct';
import { purple500 } from '@constants/colors';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import { $didUserAgreeShop } from '@store/shop/agreement';
import { ShopAgreeScreen } from '../ShopAgreeScreen';

const ITEM_HEIGHT = 130.2;

interface IFooter {
  checkout: () => void;
}

const Footer: FC<IFooter> = ({ checkout }) => {
  const [t] = useTranslation('ShopBasket');

  const basketPrice = useStore($basketPrice);
  const basketQuantity = useStore($basketQuantity);
  const sollarBalance = useStore($sollarBalance);

  return (
    <View style={s.bottomWrapper}>
      <View style={s.pricesWrapper}>
        <Text style={s.pricesItemCount}>{t('yourBalance')}</Text>
        <Text style={s.pricesSum}>{sollarBalance} SGC</Text>
      </View>
      <View style={s.pricesWrapper}>
        <Text style={s.pricesItemCount}>
          {`${t('total')} ${basketQuantity} ${t('product')}`}
        </Text>
        <Text style={s.pricesSum}>{basketPrice} SGC</Text>
      </View>
      <View style={s.buttonWrapper}>
        <Button
          text={t('createOrder')}
          onPress={checkout}
          disabled={basketPrice > sollarBalance}
        />
      </View>
    </View>
  );
};

interface IShopBasket {
  navigation: StackNavigationProp<ParamListBase>;
}

export const ShopBasket: React.FC<IShopBasket> = ({ navigation }) => {
  const basket = useStore($basket);
  const isSollarLoading = useStore(fetchSollarRequestFx.pending);
  const isBasketLoading = useStore(fetchBasketRequestFx.pending);
  const didUserAgree = useStore($didUserAgreeShop);

  const [t] = useTranslation('ShopBasket');

  useEffect(
    () => navigation.addListener('focus', () => focusShopBasketScreen()),
    [navigation]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  if (!didUserAgree) {
    return <ShopAgreeScreen />;
  }

  if (isSollarLoading || isBasketLoading) {
    return (
      <SafeAreaView style={[s.mainWrapper, s.centerContent]}>
        <BackButton text="Sollar Gifts" />
        <View style={s.emptyWrapper}>
          <ActivityIndicator size="large" color={purple500} />
        </View>
      </SafeAreaView>
    );
  }

  if (basket.length === 0) {
    return (
      <SafeAreaView style={s.mainWrapper}>
        <BackButton text="Sollar Gifts" />

        <View style={s.emptyWrapper}>
          <Text style={s.emptyText}>{t('empty')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  function changeQuanity(item: BasketItem, digit: number) {
    if (digit < 0 && item.quantity <= 0) return;
    changeQuantityItem({ id: item.id, quantity: item.quantity + digit });
  }

  return (
    <SafeAreaView style={s.mainWrapper}>
      <BackButton text="Sollar Gifts" />

      <View style={s.divider} />
      <View style={s.listWrapper}>
        <FlatList
          data={basket}
          keyExtractor={(item) => `${item.id}`}
          getItemLayout={getItemLayout}
          renderItem={({ item }) => (
            <ShopCartItem
              onPress={() =>
                selectProduct({
                  id: item.product_id,
                  colorId: item.color,
                  optionId: item.option,
                })
              }
              title={item.title}
              color={item.color_title}
              option={item.option_name}
              price={item.price}
              count={item.quantity}
              imageUri={item.color_image || item.picture}
              onIncrement={() => changeQuanity(item, 1)}
              onDecrement={() => changeQuanity(item, -1)}
              onRemove={() => removeItemFromBasket(item.id)}
            />
          )}
        />
      </View>
      <Footer
        checkout={() => navigation.navigate(routes.shopNav.ShopCheckout)}
      />
    </SafeAreaView>
  );
};
