import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './routes';
import { ScreenOptions } from '@components/ScreenOptions';
import { TokenNavigator } from './TokenNavigator';

const InvestStack = createStackNavigator();

export const InvestNavigator: React.FC = () => {
  return (
    <InvestStack.Navigator
      initialRouteName={routes.navigators.TokenSale}
      screenOptions={ScreenOptions}
    >
      <InvestStack.Screen
        name={routes.navigators.TokenSale}
        component={TokenNavigator}
      />
    </InvestStack.Navigator>
  );
};
