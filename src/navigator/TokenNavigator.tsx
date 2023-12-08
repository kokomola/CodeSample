import React from 'react';
import { ScreenOptions } from '@components/ScreenOptions';
import { createStackNavigator } from '@react-navigation/stack';
import { TokenSale } from 'src/screens/TokenSale';
import { TokenSaleBuy } from 'src/screens/TokenSaleBuy';
import { TokenSaleEdit } from 'src/screens/TokenSaleEdit';
import { TokenSaleEditChoice } from 'src/screens/TokenSaleEditChoice';
import { TokenSaleOfferDetails } from 'src/screens/TokenSaleOfferDetails';
import { routes } from './routes';
import { TokenSaleWallet } from 'src/screens/TokenSaleWallet';

const Token = createStackNavigator();

export const TokenNavigator: React.FC = () => {
  const { tokenSaleNav } = routes;
  return (
    <Token.Navigator screenOptions={ScreenOptions}>
      <Token.Screen name={tokenSaleNav.TokenSale} component={TokenSale} />
      <Token.Screen name={tokenSaleNav.TokenSaleBuy} component={TokenSaleBuy} />
      <Token.Screen
        name={tokenSaleNav.TokenSaleEdit}
        component={TokenSaleEdit}
      />
      <Token.Screen
        name={tokenSaleNav.TokenSaleEditChoice}
        component={TokenSaleEditChoice}
      />
      <Token.Screen
        name={tokenSaleNav.TokenSaleOfferDetails}
        component={TokenSaleOfferDetails}
      />
      <Token.Screen
        name={tokenSaleNav.TokenSaleWallet}
        component={TokenSaleWallet}
      />
    </Token.Navigator>
  );
};
