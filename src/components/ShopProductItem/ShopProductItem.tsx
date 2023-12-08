import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ShopNoPictureIcon } from '@components/ShopNoPictureIcon/ShopNoPictureIcon';
import { ShopProductBadge } from '@components/ShopProductBadge/ShopProductBadge';
import { AFastImage } from '@components/AFastImage';

import crownIcon from './images/crown';
import { ShopProductItemProps } from './types';
import { styles as s } from './styles';

export const ShopProductItem: React.FC<ShopProductItemProps> = ({
  title,
  isNew = false,
  isVip,
  children,
  imageUri,
  small,
}) => {
  const [validImg, setValidImg] = useState(true);
  const [t] = useTranslation('ProductItem');

  const image = (
    <AFastImage
      onError={() => setValidImg(false)}
      style={[s.image, small && s.small]}
      uri={imageUri || ''}
    />
  );

  const picture = (
    <View style={[s.noPicture, small && s.small]}>{ShopNoPictureIcon}</View>
  );

  return (
    <>
      <View style={s.wrapper}>
        <View style={s.imageWrapper}>
          {!!imageUri && validImg ? image : picture}
        </View>
        <View style={s.contentWrapper}>
          <View style={s.labels}>
            {!!isVip && <SvgXml style={s.vipIcon} xml={crownIcon()} />}
            {isNew && (
              <ShopProductBadge styleWrapper={isNew ? s.titleForNew : null}>
                {t('newLabel')}
              </ShopProductBadge>
            )}
          </View>
          <Text style={s.title}>{title}</Text>
          {children}
        </View>
      </View>
      <View style={s.divider} />
    </>
  );
};
