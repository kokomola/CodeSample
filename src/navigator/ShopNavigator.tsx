import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ScreenOptions } from '@components/ScreenOptions';
import { ShopList } from 'src/screens/ShopList';
import { ShopProduct } from 'src/screens/ShopProduct';
import { ShopFilters } from 'src/screens/ShopFilters';
import { ShopHistory } from 'src/screens/ShopHistory';
import { ShopBasket } from 'src/screens/ShopBasket';
import { ShopCheckout } from 'src/screens/ShopCheckout';
import { ShopFavourites } from 'src/screens/ShopFavourites';
import { ShopOrderDetails } from 'src/screens/ShopOrderDetails';
import { ShopSort } from 'src/screens/ShopSort';
import { routes } from './routes';

const Shop = createStackNavigator();

export const ShopNavigator: React.FC = () => {
  const { shopNav } = routes;
  return (
    <Shop.Navigator
      screenOptions={ScreenOptions}
      initialRouteName={shopNav.ShopList}
    >
      <Shop.Screen name={shopNav.ShopList} component={ShopList} />
      <Shop.Screen name={shopNav.ShopProduct} component={ShopProduct} />
      <Shop.Screen name={shopNav.ShopFilters} component={ShopFilters} />
      <Shop.Screen name={shopNav.ShopHistory} component={ShopHistory} />
      <Shop.Screen name={shopNav.ShopBasket} component={ShopBasket} />
      <Shop.Screen name={shopNav.ShopCheckout} component={ShopCheckout} />
      <Shop.Screen name={shopNav.ShopFavourites} component={ShopFavourites} />
      <Shop.Screen
        name={shopNav.ShopOrderDetails}
        component={ShopOrderDetails}
      />
      <Shop.Screen name={shopNav.ShopSort} component={ShopSort} />
    </Shop.Navigator>
  );
};
