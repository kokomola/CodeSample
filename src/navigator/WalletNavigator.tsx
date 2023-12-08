import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AwtFund, WalletFund} from '@store/wallets/types';

import {Accounts} from 'src/screens/Accounts';
import {CryptoWallet} from 'src/screens/CryptoWallet';
import {CryptoWalletTxHistory} from 'src/screens/CryptoWalletTxHistory';

import {SollarNavigator} from './SollarNavigator';
import {routes} from './routes';
import {ScreenOptions} from '@components/ScreenOptions';
import {ShopNavigator} from './ShopNavigator';

export type AmirWalletStackParamList = {
  Accounts: undefined;
  CryptoWallet: {fund: 'btc_wallet' | 'eth_wallet' | 'usdt_wallet'};
  CryptoWalletTxHistory: {fund: 'btc_wallet' | 'eth_wallet' | 'usdt_wallet'};
  SollarNavigator: undefined;
  Withdraw: {fund: WalletFund | AwtFund};
  Deposit: {fund: 'btc_wallet' | 'eth_wallet' | 'usdt_wallet'};
};

type RoutesType = {
  amirWallet: {
    [key in keyof AmirWalletStackParamList]: key;
  };
};

export const AmirWalletNamedRoutes = routes as RoutesType;
const {amirWallet} = routes;

const AmirWalletStack = createStackNavigator<AmirWalletStackParamList>();

export const WalletNavigator: React.FC = () => {
  return (
    <AmirWalletStack.Navigator
      initialRouteName={amirWallet.Accounts}
      screenOptions={ScreenOptions}>
      <AmirWalletStack.Screen
        name={AmirWalletNamedRoutes.amirWallet.Accounts}
        component={Accounts}
      />
      <AmirWalletStack.Screen
        name={AmirWalletNamedRoutes.amirWallet.CryptoWallet}
        component={CryptoWallet}
      />
      <AmirWalletStack.Screen
        name={AmirWalletNamedRoutes.amirWallet.CryptoWalletTxHistory}
        component={CryptoWalletTxHistory}
      />
      <AmirWalletStack.Screen
        name={routes.navigators.Sollar}
        component={SollarNavigator}
      />
      <AmirWalletStack.Screen
        name={routes.navigators.Shop}
        component={ShopNavigator}
      />
    </AmirWalletStack.Navigator>
  );
};
