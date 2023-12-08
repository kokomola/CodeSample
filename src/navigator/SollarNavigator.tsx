import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SollarWallet,
  SollarWalletBuy,
  SollarWalletTxHistory,
} from 'src/screens';
import { ScreenOptions } from '@components/ScreenOptions';
import { routes } from './routes';

const Sollar = createStackNavigator();

export const SollarNavigator: React.FC = () => {
  const { sollarNav } = routes;
  return (
    <Sollar.Navigator screenOptions={ScreenOptions}>
      <Sollar.Screen name={sollarNav.SollarWallet} component={SollarWallet} />
      <Sollar.Screen
        name={sollarNav.SollarWalletBuy}
        component={SollarWalletBuy}
      />
      <Sollar.Screen
        name={sollarNav.SollarWalletTxHistory}
        component={SollarWalletTxHistory}
      />
    </Sollar.Navigator>
  );
};
