import React from 'react';
import {ProfileNavigator} from './ProfileNavigator';
import {AppGate} from '@store/app';
import {useGate} from 'effector-react';
import {useTranslation} from 'react-i18next';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from '@components/uikit/Icon';
import {WalletNavigator} from './WalletNavigator';
import {FinanceNavigator} from './FinanceNavigator';
import {View} from 'react-native';
import {BottomSheet} from '@components/common/BottomSheet';
import {SunriseNavigator} from './SunriseNavigator';
import {InvestNavigator} from './InvestNavigator';

import {routes} from './routes';
import * as colors from '@constants/colors';
import {IScreenProps} from 'src/common/types';
import {TransferNavigator} from './TransferNavigator';

const resetStackOnTabPress = ({navigation, route}: IScreenProps) => ({
  tabPress: (e: any) => {
    e.preventDefault();
    navigation.reset({index: 0, routes: [{name: route?.name}]});
  },
});

const AppTabs = createBottomTabNavigator();

const EmptyComponent = () => {
  return null;
};

export const BottomTabs: React.FC = () => {
  useGate(AppGate);
  const [t] = useTranslation('TabNavigator');

  return (
    <AppTabs.Navigator
      initialRouteName={routes.amirFinance.Accounts}
      screenOptions={{
        tabBarActiveTintColor: colors.purple500,
        tabBarInactiveTintColor: colors.independence500,
      }}>
      <AppTabs.Screen
        name={routes.tabs.AmirWallet}
        component={WalletNavigator}
        listeners={resetStackOnTabPress}
        options={{
          tabBarLabel: t('amirWallet'),
          tabBarIcon: ({color}) => <Icon icon="amirWallet" color={color} />,
        }}
      />
      <AppTabs.Screen
        name={routes.tabs.AmirFinance}
        component={FinanceNavigator}
        listeners={resetStackOnTabPress}
        options={{
          tabBarLabel: t('amirFinance'),
          tabBarIcon: ({color}) => <Icon icon="amirFinance" color={color} />,
        }}
      />
      <AppTabs.Screen
        name={routes.tabs.AmirInvest}
        component={InvestNavigator}
        listeners={resetStackOnTabPress}
        options={{
          tabBarLabel: t('amirInvest'),
          tabBarIcon: ({color}) => <Icon icon="amirInvest" color={color} />,
        }}
      />
      <AppTabs.Screen
        name={routes.tabs.Sunrise}
        component={SunriseNavigator}
        options={{
          tabBarLabel: t('sunrise'),
          tabBarButton: () => <View />,
          unmountOnBlur: true,
        }}
      />
      <AppTabs.Screen
        name={routes.tabs.Settings}
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Settings',
          tabBarButton: () => <View />,
          unmountOnBlur: true,
        }}
      />
      <AppTabs.Screen
        name={routes.tabs.Transfers}
        component={TransferNavigator}
        options={{
          tabBarLabel: 'Transfers',
          tabBarButton: () => <View />,
          unmountOnBlur: true,
        }}
      />
      <AppTabs.Screen
        name="BottomSheet"
        component={EmptyComponent}
        options={{
          tabBarButton: () => <BottomSheet />,
        }}
      />
    </AppTabs.Navigator>
  );
};
