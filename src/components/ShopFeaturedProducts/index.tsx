import * as React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles as s } from './styles';
import { useStore } from 'effector-react';

import {
  $basket,
  addItemToBasket,
  addItemToBasketRequestFx,
} from '@store/shopBasket';
import { selectProduct, $featured } from '@store/shopProduct';
import { ShopProductsPageItem } from '@components/ShopProductsPageItem/ShopProductsPageItem';

export const ShopFeaturedProducts: React.FC = () => {
  const [t] = useTranslation('ShopFeaturedProducts');
  const basket = useStore($basket);
  const isLoadingBasket = useStore(addItemToBasketRequestFx.pending);

  function hasItem(productId: number) {
    return basket.find((b) => b.product_id === productId) !== undefined;
  }

  const featured = useStore($featured);
  return (
    <View style={s.box}>
      {featured.length ? (
        <>
          <Text style={s.recommendedProductTitle}>
            {t('recommendedProducts')}
          </Text>
          <View style={s.separator} />
        </>
      ) : null}

      {featured.map((recommendedProduct) => (
        <ShopProductsPageItem
          key={recommendedProduct.id}
          title={recommendedProduct.title}
          isNew={recommendedProduct.is_new}
          imageUri={
            recommendedProduct.picture_mobile || recommendedProduct.picture
          }
          price={parseFloat(recommendedProduct.price)}
          cart={hasItem(recommendedProduct.id)}
          onCartPress={() =>
            !isLoadingBasket &&
            addItemToBasket({
              product_id: recommendedProduct.id,
              title: recommendedProduct.title,
            })
          }
          onPress={() => {
            selectProduct({ id: recommendedProduct.id });
          }}
          small={true}
        />
      ))}
      <View style={s.separator} />
    </View>
  );
};
