/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { Button, Stepper } from '@components/uikit';
import { ShopSlider } from '@components/ShopSlider';
import { BackButton } from '@components/layout/BackButton';
import { HtmlView } from '@components/HtmlView';
import {
  $images,
  $scrollViewRef,
  $selectedColorId,
  $selectedOptionId,
  $selectedProduct,
  $validImgs,
  selectColorId,
  selectOptionId,
} from '@store/shopProduct';
import { addItemToBasket, fetchBasketRequestFx } from '@store/shopBasket';
import { $isAdded } from '@store/shopProduct/init';
import { ShopLabel } from '@components/ShopLabel';
import { bn } from '@utils/numbers/bn';
import { ShopNoPictureIcon } from '@components/ShopNoPictureIcon/ShopNoPictureIcon';
import { blurShopProductScreen, focusShopProductScreen } from '@store/app';
import { Loader } from './Loader';
import { ShopOptions } from '../ShopOptions';
import { ShopFeaturedProducts } from '@components/ShopFeaturedProducts';
import { addBookmark, removeBookmark } from '@store/shopFavourites';
import { IconButton } from '@components/uikit/IconButton';
import { IScreenProps } from 'src/common/types';
import { logline } from '@utils/debug';
import { routes } from 'src/navigator/routes';
import { styles as s } from './styles';
import { $didUserAgreeShop } from '@store/shop/agreement';
import { ShopAgreeScreen } from '../ShopAgreeScreen';
import { is } from '@utils/common/condition';

export const ShopProduct: React.FC<IScreenProps> = (props) => {
  const { navigation } = props;

  const [count, setCount] = React.useState(1);

  const [t] = useTranslation('ShopProduct');

  const scrollViewRef = useStore($scrollViewRef);

  const product = useStore($selectedProduct);
  const colorId = useStore($selectedColorId);
  const optionId = useStore($selectedOptionId);
  const imgs = useStore($validImgs);
  const isAdded = useStore($isAdded);
  const basketLoading = useStore(fetchBasketRequestFx.pending);
  const didUserAgree = useStore($didUserAgreeShop);

  useEffect(() => {
    navigation.addListener('focus', () => focusShopProductScreen());
    return blurShopProductScreen;
  }, []);

  if (!product) {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    return null;
  }

  const renderImages = () => {
    const slider = <ShopSlider imgs={imgs} />;
    const picture = <View style={s.picture}>{ShopNoPictureIcon}</View>;
    return is.exist(imgs.length) ? slider : picture;
  };

  const renderLabel = () => {
    const labels = {
      new: product?.is_new,
      vip: product?.is_vip,
      [product!.certificate_type]: true,
    };

    return <ShopLabel {...labels} />;
  };

  const renderBottomView = () => {
    const goToBasket = (
      <View style={s.buttonBox}>
        <Button
          text={t('gotoBasket')}
          onPress={() => navigation.navigate(routes.shopNav.ShopBasket)}
        />
      </View>
    );

    const addToBasket = (
      <>
        <Stepper
          type="large"
          count={count}
          onIncrement={() => setCount(count + 1)}
          onDecrement={() => setCount(count <= 1 ? 1 : count - 1)}
        />
        <View style={s.buttonBox}>
          <Button
            text={`${t('add')} ${bn(product.price).multipliedBy(count)} SGC`}
            onPress={() => {
              const basketItem = {
                product_id: product.id,
                title: product.title,
                quantity: count,
                option: optionId,
                color: colorId,
              };
              addItemToBasket(basketItem);
            }}
          />
        </View>
      </>
    );

    if (basketLoading) return <Loader />;

    return isAdded ? goToBasket : addToBasket;
  };

  if (!didUserAgree) {
    return <ShopAgreeScreen />;
  }

  return (
    <SafeAreaView style={s.sav}>
      <View style={s.buttonWrapper}>
        <BackButton text="Sollar Gifts" />
        <IconButton
          icon={product.bookmark ? 'likeFill' : 'like'}
          onPress={() => {
            product.bookmark ? removeBookmark(product) : addBookmark(product);
          }}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={s.sv}
        snapToStart={true}
        scrollEnabled={true}
      >
        {renderImages()}

        {renderLabel()}
        <Text style={s.title}>{product.title}</Text>
        <ShopOptions
          options={product.colors}
          $selectedOptionId={$selectedColorId}
          selectOptionId={selectColorId}
          title="Цвет товара"
        />
        <ShopOptions
          options={product.options}
          $selectedOptionId={$selectedOptionId}
          selectOptionId={selectOptionId}
        />
        <HtmlView
          navigation={navigation}
          key={product.id}
          html={product.description + '<br />' + product.all_description}
        />

        <ShopFeaturedProducts />
      </ScrollView>
      <View style={s.bottomView}>{renderBottomView()}</View>
    </SafeAreaView>
  );
};
