import React, {useState, useEffect} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import Carousel from 'react-native-snap-carousel';
import {useTranslation} from 'react-i18next';

import {Button} from '@components/uikit';
import {Product} from '@store/shop/types';
import {Stepper} from '@components/uikit/Stepper';
import {addItemToBasket} from '@store/shopBasket';
import {ShopProductBadge} from '@components/ShopProductBadge/ShopProductBadge';

const styles = StyleSheet.create({
  headerWrapper: {
    height: 46,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    paddingTop: 22,
    backgroundColor: 'white',
  },
  bodyWrapper: {height: '100%', backgroundColor: 'white'},
  bodyBottomWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  stepperWrapper: {},
  buttonWrapper: {flexGrow: 1, paddingLeft: 12},
  webView: {
    marginBottom: 64,
  },
  carouselWrapper: {height: 200},
  carouselItem: {height: 200, width: 200},
});

type Props = {
  snapPoints: (string | number)[];
  initialSnap?: number;
  onClose?: () => void;
  product?: Product;
};

export const ShopProductBottomSheet = React.forwardRef<BottomSheet, Props>(
  ({snapPoints, initialSnap = 0, product, onClose}, ref) => {
    const [count, setCount] = useState(1);
    const [t] = useTranslation('ProductBottomSheet');

    useEffect(() => {
      setCount(1);
    }, [product]);

    return (
      <BottomSheet
        ref={ref}
        enabledContentGestureInteraction={false}
        enablePanDownToClose={true}
        renderHeader={() => (
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('./img/close.png')}
                width={24}
                height={24}
              />
            </TouchableOpacity>
            {product?.featured && (
              <ShopProductBadge>{t('new')}</ShopProductBadge>
            )}
          </View>
        )}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
        renderContent={() => (
          <View style={styles.bodyWrapper}>
            {product?.images && product.images.length > 0 && (
              <View style={styles.carouselWrapper}>
                <Carousel
                  data={product.images}
                  renderItem={({item}) => (
                    <View style={styles.carouselItem}>
                      <Image source={{uri: item}} style={styles.carouselItem} />
                    </View>
                  )}
                  sliderWidth={Dimensions.get('screen').width}
                  itemWidth={200}
                />
              </View>
            )}
            <WebView
              style={styles.webView}
              androidHardwareAccelerationDisabled={true}
              androidLayerType="hardware"
              source={{
                html: `<div>${product?.description ?? ''}</div><div>${
                  product?.all_description ?? ''
                }</div>`,
              }}
            />
            <View style={styles.bodyBottomWrapper}>
              <View style={styles.stepperWrapper}>
                <Stepper
                  type="large"
                  count={count}
                  onIncrement={() => setCount(count + 1)}
                  onDecrement={() => setCount(count <= 1 ? 1 : count - 1)}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  text={t('add')}
                  onPress={() => {
                    if (product) {
                      const basketItem = {
                        product_id: product.id,
                        title: product.title,
                        quantity: count,
                      };
                      addItemToBasket(basketItem);
                    }
                    onClose();
                  }}
                />
              </View>
            </View>
          </View>
        )}
      />
    );
  },
);
