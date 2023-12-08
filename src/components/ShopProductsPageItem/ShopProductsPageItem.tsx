import React from 'react';
import { View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ShopProductItem } from '@components/ShopProductItem/ShopProductItem';
import { Button } from '@components/uikit';
import { ShopPriceText } from '@components/ShopPriceText/ShopPriceText';
import { styles } from './styles';
import { ShopProductsPageItemProps } from './types';

export const ShopProductsPageItem: React.FC<ShopProductsPageItemProps> = ({
  title,
  isNew,
  price,
  onPress,
  onCartPress,
  cart = false,
  imageUri,
  small,
  isVip,
}) => {
  const [t] = useTranslation('ProductsPageItem');

  return (
    <Pressable onPress={onPress}>
      <ShopProductItem
        title={title}
        isNew={isNew}
        isVip={isVip}
        imageUri={imageUri}
        small={small}
      >
        <View style={styles.wrapper}>
          <View>
            <ShopPriceText>{price}</ShopPriceText>
          </View>
          <View>
            <Button
              customStyle={styles.button}
              onPress={onCartPress}
              text={cart ? t('alreadyInCart') : t('addToCart')}
              disabled={cart}
            />
          </View>
        </View>
      </ShopProductItem>
    </Pressable>
  );
};
