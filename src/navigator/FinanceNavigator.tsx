import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StableAllAccounts} from 'src/screens/StableAllAccounts';
import {StableAllClosedAccounts} from '../screens/StableAllClosedAccounts';
import {Stable} from 'src/screens/Stable';
import {StableCreate} from 'src/screens/StableCreate';
import {Saving} from 'src/screens/Saving';
import {SavingTxHistory} from 'src/screens/SavingTxHistory';
import {RequestHistory} from 'src/screens/RequestHistory';
import {routes} from './routes';
import {AmirFinance} from 'src/screens/AmirFinance';
import {ScreenOptions} from '@components/ScreenOptions';

export type FinanceStackParamList = {
  Accounts: undefined;
  Saving: {fund: 'btc' | 'eth' | 'usdt'};
  SavingTxHistory: {fund: 'btc' | 'eth' | 'usdt'};
  StableCreate: undefined;
  StableAllAccounts: undefined;
  Stable: {id: number};
  RequestHistory: undefined;
  StableAllClosedAccounts: undefined;
};

type RoutesType = {
  amirFinance: {
    [key in keyof FinanceStackParamList]: key;
  };
};

export const FinanceNamedRoutes = routes as RoutesType;

const FinanceStack = createStackNavigator<FinanceStackParamList>();

export const FinanceNavigator: React.FC = () => {
  return (
    <FinanceStack.Navigator
      initialRouteName={FinanceNamedRoutes.amirFinance.Accounts}
      screenOptions={ScreenOptions}>
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.Accounts}
        component={AmirFinance}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.Saving}
        component={Saving}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.StableCreate}
        component={StableCreate}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.Stable}
        component={Stable}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.StableAllAccounts}
        component={StableAllAccounts}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.RequestHistory}
        component={RequestHistory}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.StableAllClosedAccounts}
        component={StableAllClosedAccounts}
      />
      <FinanceStack.Screen
        name={FinanceNamedRoutes.amirFinance.SavingTxHistory}
        component={SavingTxHistory}
      />
    </FinanceStack.Navigator>
  );
};
