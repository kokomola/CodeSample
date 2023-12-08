import React, { useContext } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { NavigationContext } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  SectionList,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import { Button, CheckBox } from '@components/uikit';
import { BackButton } from '@components/layout/BackButton';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
  // filtersGate,
  $categories,
  $brands,
  $filterCategories,
  $filterBrands,
  selectCategoryEvent,
  selectBrandEvent,
  confirmFilters,
  changePriceFilterEvent,
  $filterPrices,
  resetFilters,
  $priceInterval,
  $isFiltersLoading,
} from '@store/shop';

import { styles } from './styles';
import { purple400, purple500 } from '@constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';
import { ShopFilterPriceSliderMarker } from '@components/ShopFilterSliderMarker/ShopFilterPriceSliderMarker';

interface IShopFilters {
  navigation: StackNavigationProp<ParamListBase>;
}
export const ShopFilters: React.FC<IShopFilters> = () => {
  // useGate(filtersGate)

  const navigation = useContext(NavigationContext);

  const isLoading = useStore($isFiltersLoading);

  const categories = useStore($categories);
  const brands = useStore($brands);

  const selectedCategories = useStore($filterCategories);
  const selectedBrands = useStore($filterBrands);

  const [minPrice, maxPrice] = useStore($filterPrices);
  const [startPoint, endPoint] = useStore($priceInterval);

  const [t] = useTranslation('FiltersPage');

  if (isLoading) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="large" color={purple500} />
        <Text style={styles.loadingIndicatorText}>{t('pendingText')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <BackButton
        text={t('screenTitle')}
        onPress={() => {
          navigation?.goBack();
          // resetFilters([startPoint, endPoint]);
        }}
      />

      <SafeAreaView style={styles.sv}>
        <SectionList
          sections={[
            {
              title: 'categories',
              data: categories,
              displayTitle: t('categories'),
            },
            { title: 'brands', data: brands, displayTitle: t('brands') },
          ]}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, section }) => (
            <View style={styles.item}>
              <CheckBox
                checked={
                  section.title === 'categories'
                    ? selectedCategories.includes(item.id)
                    : selectedBrands.includes(item.id)
                }
                onPress={() => {
                  const selected =
                    section.title === 'categories'
                      ? selectedCategories.includes(item.id)
                      : selectedBrands.includes(item.id);

                  return section.title === 'categories'
                    ? selectCategoryEvent({ id: item.id, selected: !selected })
                    : selectBrandEvent({ id: item.id, selected: !selected });
                }}
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { displayTitle } }) => (
            <Text style={styles.sectionHeader}>{displayTitle}</Text>
          )}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.titleText}>{t('sollarCostTitle')}</Text>
              <Text style={styles.pricesText}>
                {minPrice} soll - {maxPrice} soll
              </Text>
              <MultiSlider
                min={startPoint}
                max={endPoint || 1} // need separate values since in case of usage minPrice/maxPrice after "apply" and going back to current page - indicator cuts off start and end points.
                values={[minPrice, maxPrice]} // not obligatory
                sliderLength={Dimensions.get('screen').width - 34}
                onValuesChange={changePriceFilterEvent}
                selectedStyle={{ backgroundColor: purple400 }}
                trackStyle={styles.trackStyle}
                minMarkerOverlapDistance={10}
                step={10}
                allowOverlap={false}
                snapped
                customMarker={() => <ShopFilterPriceSliderMarker />}
              />
            </View>
          }
          stickySectionHeadersEnabled={false}
        />
      </SafeAreaView>

      <View style={styles.bottomWrapper}>
        <View style={styles.btnContainer}>
          <Button
            text={t('resetFilters')}
            type="secondary"
            onPress={() => {
              resetFilters([startPoint, endPoint]);
            }}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            text={t('applyFilters')}
            onPress={() => {
              confirmFilters();
              navigation?.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
