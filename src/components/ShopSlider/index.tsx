import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, {
  Pagination as LibPagination,
} from 'react-native-snap-carousel';
import { styles as s } from './styles';
import * as colors from '@constants/colors';
import { ShopNoPictureIcon } from '@components/ShopNoPictureIcon/ShopNoPictureIcon';

interface IPaginationProps {
  activeSlide: number;
  length: number;
}

const Pagination = ({ activeSlide, length }: IPaginationProps) => {
  return (
    <LibPagination
      dotsLength={length}
      activeDotIndex={activeSlide}
      dotStyle={s.dotStyle}
      inactiveDotStyle={s.inactiveDotStyle}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.7}
    />
  );
};

interface IProps {
  imgs: string[];
}

export const ShopSlider: React.FC<IProps> = ({ imgs = [] }) => {
  const [activeSlide, setActiveSlice] = useState(0);
  const [validImg, setValidImg] = React.useState(true);

  if (!validImg) return <View>{ShopNoPictureIcon}</View>;

  return (
    <>
      <Carousel
        slideStyle={s.carousel}
        data={imgs}
        renderItem={({ item }) => (
          <FastImage
            style={s.carouselItem}
            resizeMode={FastImage.resizeMode.contain}
            onError={() => setValidImg(true)}
            source={{
              uri: item,
              priority: FastImage.priority.normal,
            }}
          />
        )}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={Dimensions.get('screen').width - 18 * 2}
        removeClippedSubviews={false}
        onSnapToItem={setActiveSlice}
      />
      <Pagination activeSlide={activeSlide} length={imgs.length} />
    </>
  );
};
