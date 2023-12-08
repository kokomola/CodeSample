import React from 'react';
import {
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import { useGate, useStore } from 'effector-react';
/* eslint-disable camelcase */
import { ShopNoPictureIcon } from '@components/ShopNoPictureIcon/ShopNoPictureIcon';
import { ShopPriceText } from '@components/ShopPriceText/ShopPriceText';
import {
  $filteredProducts,
  filtersGate,
  productsGate,
  ShopGate,
} from '@store/shop';
import { ShopBookmarksGate } from '@store/shopFavourites';
import { selectProduct } from '@store/shopProduct';
import { AFastImage } from '@components/AFastImage';
import { ScreenTitle } from '@components/ScreenTitle';
import { redirectToScreenFx } from '@store/redirect';
import { routes } from 'src/navigator/routes';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components/uikit/Icon';
import * as colors from '@constants/colors';
import { styles as s } from './styles';

const Image: React.FC<{ imageUri: string; style?: StyleProp<ImageStyle> }> = ({
  imageUri,
  style,
}) => {
  const [validImg, setValidImg] = React.useState(true);

  if (!imageUri || !validImg)
    return <View style={style}>{ShopNoPictureIcon}</View>;

  return (
    <AFastImage
      onError={() => setValidImg(true)}
      style={style}
      uri={imageUri}
    />
  );
};

export const SollarGiftsRow: React.FC = () => {
  const [t] = useTranslation('Accounts');

  useGate(ShopGate);
  useGate(productsGate);
  useGate(ShopBookmarksGate);
  useGate(filtersGate);

  const products = useStore($filteredProducts);
  const fewProducts = products.slice(0, 10);

  const shopButton = (
    <TouchableOpacity
      style={s.titleButton}
      onPress={() => {
        redirectToScreenFx({
          rootNav: routes.tabs.AmirWallet,
          screen: routes.navigators.Shop,
        });
      }}
    >
      <Text style={s.titleButtonText}>
        {t('sollarGiftsSectionTitleButton')}
      </Text>
      <Icon icon="chevronRight" color={colors.purple500} />
    </TouchableOpacity>
  );

  return (
    <>
      <ScreenTitle title={t('sollarGiftsSectionTitle')} buttons={shopButton} />
      <ScrollView horizontal style={s.sv}>
        {fewProducts.map(({ title, picture, picture_mobile, price, id }, i) => (
          <TouchableOpacity
            style={[s.card, i === 0 && s.first, i === 9 && s.last]}
            key={id}
            onPress={() => {
              selectProduct({ id });
            }}
          >
            <AFastImage style={s.bannerImage} uri={picture_mobile || picture} />
            <Text numberOfLines={2} style={s.title}>
              {title}
            </Text>

            <ShopPriceText style={s.price}>
              {parseFloat(price.toString())}
            </ShopPriceText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};
