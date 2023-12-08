import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';
import { BackButton } from '@components/layout/BackButton';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { SortMethod } from '@store/shopSort/types';
import { $sortMethod, submitSort } from '@store/shopSort';
import { Button } from '@components/uikit';
import { styles as s } from './styles';
import { CircleRadioButton } from '@components/uikit/CircleRadioButtons';

interface IShopSort {
  navigation: StackNavigationProp<ParamListBase>;
}

export const ShopSort: React.FC<IShopSort> = ({ navigation }) => {
  const usingMethod = useStore($sortMethod);

  const [sortMethod, setSortMethod] = useState(usingMethod);

  const [t] = useTranslation('ShopSort');

  const isSelected = (method: SortMethod) => sortMethod === method;

  const radioButtons = [
    {
      label: t('byPopularity'),
      onPress: () => setSortMethod(SortMethod.Default),
      selected: isSelected(SortMethod.Default),
    },
    {
      label: t('byPriceAsc'),
      onPress: () => setSortMethod(SortMethod.PriceAsc),
      selected: isSelected(SortMethod.PriceAsc),
    },
    {
      label: t('byPriceDesc'),
      onPress: () => setSortMethod(SortMethod.PriceDesc),
      selected: isSelected(SortMethod.PriceDesc),
    },
    {
      label: t('byNovelty'),
      onPress: () => setSortMethod(SortMethod.Novelty),
      selected: isSelected(SortMethod.Novelty),
    },
  ];

  return (
    <SafeAreaView style={s.v}>
      <BackButton text="Sollar Gifts" />

      <View style={s.box}>
        <Text style={s.titleText}>{t('screenTitle')}</Text>

        <View style={s.group}>
          {radioButtons.map((item, index) => {
            const id = `item-${index}`;
            return <CircleRadioButton key={id} id={id} {...item} />;
          })}
        </View>

        <Button
          text={t('submitButton')}
          onPress={() => {
            submitSort(sortMethod);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
