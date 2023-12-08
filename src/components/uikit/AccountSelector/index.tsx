import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Account } from './Account';

import { AccountSelectorProps, Account as AccountType } from './types';

export const AccountSelector: React.FC<AccountSelectorProps> = (props) => {
  const {
    accounts,
    sliderWidth,
    itemWidth,
    onSnapToItem,
    carouselRef,
    activeSlide,
    scrollEnabled = true,
    textBeforeTitle,
  } = props;

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={accounts}
        renderItem={({ item, index }: { item: AccountType; index: number }) => (
          <Account
            item={item}
            index={index}
            textBeforeTitle={textBeforeTitle}
          />
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
