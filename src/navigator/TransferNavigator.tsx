import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletFund} from '@store/wallets/types';
import {TransferConversion} from 'src/screens/TransferConversion';
import {TransferMenu} from 'src/screens/TransferMenu';
import {TransferFromSaving} from 'src/screens/TransferFromSaving';
import {TransferToSaving} from 'src/screens/TransferToSaving';
import {TransferByEmail} from 'src/screens/TransferByEmail';
import {TransferByPhone} from 'src/screens/TransferByPhone';
import {routes} from './routes';
import {Deposit} from 'src/screens/Deposit';
import {Withdraw} from 'src/screens/Withdraw';
import {ScreenOptions} from '@components/ScreenOptions';
//import { GlobalPassBioScreen } from 'src/screens/GlobalPassBioScreen';
import {Fund} from '@constants/funds';

export type TransferStackParamList = {
  TransferMenu:
    | {
        availableTransfers: string[];
        selectedTokenSaleId: number;
      }
    | undefined;
  TransferConversion: {from?: WalletFund; to?: WalletFund} | undefined;
  TransferToSaving: any;
  TransferFromSaving: undefined;
  TransferByEmail: undefined;
  TransferByPhone: undefined;
  Deposit: {fund: Fund} | undefined;
  Withdraw: {fund: Fund} | undefined;
};

type RoutesType = {
  transfers: {
    [key in keyof TransferStackParamList]: key;
  };
};

export const TransferNamedRoutes = routes as RoutesType;

const TransferStack = createStackNavigator<TransferStackParamList>();

export const TransferNavigator: React.FC = () => {
  return (
    <TransferStack.Navigator screenOptions={ScreenOptions}>
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferMenu}
        component={TransferMenu}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferConversion}
        component={TransferConversion}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferToSaving}
        component={TransferToSaving}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferFromSaving}
        component={TransferFromSaving}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferByEmail}
        component={TransferByEmail}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.TransferByPhone}
        component={TransferByPhone}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.Deposit}
        component={Deposit}
      />
      <TransferStack.Screen
        name={TransferNamedRoutes.transfers.Withdraw}
        component={Withdraw}
      />
      {/*       <TransferStack.Screen
        name={routes.transfers.CheckFace}
        component={GlobalPassBioScreen}
      /> */}
    </TransferStack.Navigator>
  );
};
