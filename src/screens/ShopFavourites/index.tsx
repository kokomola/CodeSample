import * as React from 'react';
import {
  SafeAreaView,
  View,
  Pressable,
  ActivityIndicator,
  Text,
  FlatList,
} from 'react-native';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

import {
  $bookmarks,
  fetchBookmarksFx,
  removeBookmark,
  ShopBookmarksGate,
} from '@store/shopFavourites';
import { BackButton } from '@components/layout/BackButton';
import { ShopProductItem } from '@components/ShopProductItem/ShopProductItem';
import { IconButton } from '@components/uikit/IconButton';

import { styles as s } from './styles';
import { purple500 } from '@constants/colors';

import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';
import { selectProduct } from '@store/shopProduct';
import { ShopPriceText } from '@components/ShopPriceText/ShopPriceText';

interface IShopFavourites {
  navigation: StackNavigationProp<ParamListBase>;
}

export const ShopFavourites: React.FC<IShopFavourites> = () => {
  useGate(ShopBookmarksGate);

  const bookmarks = useStore($bookmarks);

  const isLoading = useStore(fetchBookmarksFx.pending);

  const [t] = useTranslation('ShopFavourites');

  if (isLoading) {
    return (
      <View style={s.centerContainer}>
        <ActivityIndicator size="large" color={purple500} />
        <Text style={s.centerText}>{t('pendingText')}</Text>
      </View>
    );
  }

  if (!bookmarks.length) {
    return (
      <SafeAreaView style={s.sav}>
        <BackButton text={t('screenTitle')} />
        <View style={s.centerContainer}>
          <Text style={s.centerText}>{t('noFavourites')}</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('screenTitle')} />
      <FlatList
        data={bookmarks}
        keyExtractor={(item, index) => `${item.id}${index}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              selectProduct({ id: item.product.id });
            }}
          >
            <ShopProductItem
              title={item.product.title}
              isNew={item.product.is_new}
              imageUri={item.product.picture_mobile}
            >
              <View style={s.wrapper}>
                <ShopPriceText>{Number(item.product.price)}</ShopPriceText>
                <IconButton
                  icon="likeFill"
                  color={purple500}
                  onPress={() => removeBookmark(item.product)}
                  styles={s.icon}
                />
              </View>
            </ShopProductItem>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={s.separator} />}
      />
    </SafeAreaView>
  );
};
