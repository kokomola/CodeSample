/* eslint-disable camelcase */
import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import * as Navigate from '../../navigator/RootNavigation';

import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button } from '@components/uikit';
import { Icon } from '@components/uikit/Icon';
import { ScreenTitle } from '@components/ScreenTitle';
import { ShopProductsPageItem } from '@components/ShopProductsPageItem/ShopProductsPageItem';

import {
  $currentSearchRequest,
  $isDataLoading,
  filtersGate,
  ShopGate,
} from '@store/shop';
import { $bookmarks, ShopBookmarksGate } from '@store/shopFavourites';
import {
  $basket,
  $basketCount,
  addItemToBasket,
  addItemToBasketRequestFx,
} from '@store/shopBasket';
import { selectProduct } from '@store/shopProduct';

import { $filteredProducts, productsGate } from '@store/shop';
import { $banners, CarouselRef } from '@store/shopBanner';

import { Banner } from '@store/shopBanner/types';
import { Product } from '@store/shop/types';

import { purple500 } from '@constants/colors';
import { ShopSearchInput } from '@components/ShopSearchInput';
import { focusShopListScreen } from '@store/app';
import FastImage from 'react-native-fast-image';
import { $didUserAgreeShop } from '@store/shop/agreement';
import { IScreenProps } from 'src/common/types';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import { ShopAgreeScreen } from '../ShopAgreeScreen';

const ITEM_HEIGHT = 130.2;

export const Badge = (): JSX.Element | null => {
  const count = useStore($basketCount);
  if (!count) {
    return null;
  }
  return (
    <View style={s.badge}>
      <Text style={s.badgeText}>{count}</Text>
    </View>
  );
};

const ShopScreenTitle = () => {
  const bookmarks = useStore($bookmarks);

  const { shopNav } = routes;

  const isBookmarks = bookmarks.length > 0;
  const color = isBookmarks ? purple500 : undefined;
  const icon = isBookmarks ? 'likeFill' : 'like';

  return (
    <ScreenTitle
      title="Sollar Gifts"
      back
      buttons={
        <View style={s.titleButtonsBox}>
          <TouchableOpacity
            style={s.titleButton}
            key="like"
            onPress={() => Navigate.navigate(shopNav.ShopFavourites)}
          >
            <Icon color={color} icon={icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={s.titleButton}
            key="history"
            onPress={() => Navigate.navigate(shopNav.ShopHistory)}
          >
            <Icon icon="history" />
          </TouchableOpacity>

          <TouchableOpacity
            style={s.titleButton}
            key="shoppingCart"
            onPress={() => Navigate.navigate(shopNav.ShopBasket)}
          >
            <Icon icon="shoppingCart" />
            <Badge />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const ShopBanner = () => {
  const banners = useStore($banners);
  const currentSearchRequest = useStore($currentSearchRequest);

  /* useEffect(() => {
    logline('', { banners, length: currentSearchRequest.length });
  }, []); */

  const getProductIdFromURL = (url: Banner['url']) => {
    const array = url.split('/');
    const id = array[array.length - 1];
    return Number(id);
  };

  if (!banners?.length || currentSearchRequest.length) {
    return <View />;
  }
  return (
    <View style={s.bannerBox}>
      <Carousel
        ref={CarouselRef}
        data={banners}
        renderItem={(i: { item: Banner; index: number }) => (
          <TouchableOpacity
            onPress={() => {
              const productId = getProductIdFromURL(i.item.url);
              selectProduct({ id: productId });
            }}
          >
            <FastImage
              style={[
                s.bannerImage,
                { width: Dimensions.get('screen').width - 32 },
              ]}
              onProgress={() => (
                <ActivityIndicator size="small" color={purple500} />
              )}
              source={{
                uri: i.item.mobile_image,
                priority: FastImage.priority.normal,
              }}
            />
          </TouchableOpacity>
        )}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width - 32}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const ShopTitlePanel = () => {
  const [t] = useTranslation('Showcase');
  const { shopNav } = routes;
  return (
    <View style={s.titlePanelBox}>
      <View style={s.titlePanelButton}>
        <Button
          type="secondary"
          icon="sortAsc"
          text={t('buttonSort')}
          onPress={() => Navigate.navigate(shopNav.ShopSort)}
        />
      </View>
      <View style={s.titlePanelButton}>
        <Button
          type="secondary"
          icon="filter"
          text={t('buttonFilter')}
          onPress={() => Navigate.navigate(shopNav.ShopFilters)}
        />
      </View>
    </View>
  );
};

type CarouselBanner = { id: 'banner' };

export const ShopList: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [t] = useTranslation('Showcase');

  useGate(ShopGate);
  useGate(productsGate);
  useGate(ShopBookmarksGate);
  useGate(filtersGate);

  const isLoading = useStore($isDataLoading);
  const products = useStore($filteredProducts);
  const basket = useStore($basket);
  const isLoadingBasket = useStore(addItemToBasketRequestFx.pending);
  const didUserAgree = useStore($didUserAgreeShop);

  React.useEffect(
    () => navigation.addListener('focus', () => focusShopListScreen()),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product | CarouselBanner }) => {
      if ('title' in item) {
        function hasItem(productId: number) {
          return basket.find((b) => b.product_id === productId) !== undefined;
        }

        // Если у товара есть опции или цвет, то выбираем базовые(первые)
        function handleCartPress(product: Product) {
          const hasColors = !!product?.colors[0];
          const hasOptions = !!product?.options[0];
          const itemForBasket = {
            product_id: product.id,
            title: product.title,
            quantity: 1,
            color: hasColors ? product.colors[0].id : null,
            option: hasOptions ? product.options[0].id : null,
          };
          return !isLoadingBasket && addItemToBasket(itemForBasket);
        }

        return (
          <ShopProductsPageItem
            title={item.title}
            isNew={item.is_new}
            isVip={item.is_vip}
            imageUri={item.picture_mobile || item.picture}
            /* @ts-ignore */
            price={parseFloat(item.price)}
            cart={hasItem(item.id)}
            onCartPress={() => handleCartPress(item)}
            onPress={() => {
              selectProduct({ id: item.id });
            }}
          />
        );
      }

      return null;
    },
    [basket, isLoadingBasket]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

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

  if (isLoading) {
    return (
      <View style={s.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color={purple500} />
        <Text style={s.loadingIndicatorText}>{t('pendingText')}</Text>
      </View>
    );
  }

  const ShopEmpty = () =>
    products.length === 0 ? (
      <Text style={s.emptyText}>{t('notFound')}</Text>
    ) : null;

  return (
    <SafeAreaView style={s.sav}>
      <FlatList
        style={s.flatList}
        data={[...products]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true} // Unmount components when outside of window
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={7} // Reduce the window size
        ItemSeparatorComponent={() => <View style={s.separator} />}
        ListHeaderComponent={() => (
          <View style={s.screenTitleBox}>
            <ShopScreenTitle />
            <ShopSearchInput />
            <ShopBanner />
            <ShopTitlePanel />
            <ShopEmpty />
          </View>
        )}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
};
