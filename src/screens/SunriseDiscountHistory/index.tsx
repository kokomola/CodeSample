import React, {useEffect} from 'react';
import {BackButton} from '@components/layout/BackButton';
import {SafeAreaView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {focusSunriseDiscountHistoryScreen} from '@store/app';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';
import {DiscountProduct} from '@store/sunriseDiscountHistory/types';
import {useStore} from 'effector-react';
import {
  $guardDiscountHistory,
  $smartDiscountHistory,
  $travelDiscountHistory,
  selectDiscountProduct,
} from '@store/sunriseDiscountHistory';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles as s} from './styles';
import {SunriseDiscountHistoryByProduct} from '@components/SunriseDiscountHistoryByProduct';

const SmartScreen = () => {
  const history = useStore($smartDiscountHistory);
  return <SunriseDiscountHistoryByProduct history={history} />;
};
const GuardScreen = () => {
  const history = useStore($guardDiscountHistory);
  return <SunriseDiscountHistoryByProduct history={history} />;
};

const TravelScreen = () => {
  const history = useStore($travelDiscountHistory);
  return <SunriseDiscountHistoryByProduct history={history} />;
};

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
  const {Smart, Guard, Travel} = DiscountProduct;

  const listenerTabPress = (product: DiscountProduct) => ({
    tabPress: () => {
      selectDiscountProduct(product);
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: s.labelStyle,
        tabBarIndicatorStyle: s.indicatorStyle,
      }}
      sceneContainerStyle={s.screen}>
      <Tab.Screen
        listeners={() => listenerTabPress(Travel)}
        name={Travel}
        component={TravelScreen}
      />
      <Tab.Screen
        listeners={() => listenerTabPress(Guard)}
        name={Guard}
        component={GuardScreen}
      />
      <Tab.Screen
        listeners={() => listenerTabPress(Smart)}
        name={Smart}
        component={SmartScreen}
      />
    </Tab.Navigator>
  );
}

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const SunriseDiscountHistory: React.FC<IProps> = ({navigation}) => {
  const [t] = useTranslation('Sunrise');

  useEffect(
    () => navigation.addListener('focus', focusSunriseDiscountHistoryScreen),
    [navigation],
  );

  return (
    <SafeAreaView style={s.sav}>
      <BackButton text={t('discountHistoryTitle')} />
      <View style={s.box}>
        <TopTabs />
      </View>
    </SafeAreaView>
  );
};
