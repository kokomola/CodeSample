import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Coin } from './Coin';
import { CoinSelect, CoinSelectorProps } from './types';

export const CoinSelector: React.FC<CoinSelectorProps> = (props) => {
  const {
    coins,
    sliderWidth,
    itemWidth,
    onSnapToItem,
    carouselRef,
    activeSlide,
    scrollEnabled = true,
  } = props;

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={coins}
        renderItem={({ item, index }: { item: CoinSelect; index: number }) => (
          <Coin item={item} index={index} />
        )}
        onSnapToItem={onSnapToItem}
        sliderWidth={sliderWidth || Dimensions.get('window').width}
        itemWidth={itemWidth || Dimensions.get('window').width}
        removeClippedSubviews={false}
        firstItem={activeSlide}
        initialScrollIndex={activeSlide}
        getItemLayout={(_, index: number) => ({
          length: itemWidth || Dimensions.get('window').width,
          offset: itemWidth
            ? itemWidth * index
            : Dimensions.get('window').width * index,
          index,
        })}
        scrollEnabled={scrollEnabled}
      />
    </View>
  );
};

export * from './Pagination';
