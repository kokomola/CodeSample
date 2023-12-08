import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './routes';
import { SunriseDiscountHistory } from 'src/screens/SunriseDiscountHistory';
import { SunriseLandingScreen } from 'src/screens/SunriseProgramsLandingScreens/SunriseLandingScreen';
import { LoyaltyLandingScreen } from 'src/screens/SunriseProgramsLandingScreens/LoyaltyLandingScreen';
import { SunriseProgram } from 'src/screens/SunriseProgram';
import { AmbassadorLandingScreen } from 'src/screens/SunriseProgramsLandingScreens/AmbassadorLandingScreen';
import { SunriseAmbassadorActivity } from 'src/screens/SunriseAmbassadorActivity';
import { SunrisePartner } from 'src/screens/SunrisePartner';
import { SunriseLine } from 'src/screens/SunriseLine';
import { ScreenOptions } from '@components/ScreenOptions';

export type SunriseStackParamList = {
  SunriseProgram: undefined;
  LoyaltyLandingScreen: undefined;
  DiscountHistoryScreen: undefined;
  SunriseLandingScreen: undefined;
  AmbassadorLandingScreen: undefined;
  AmbassadorActivity: undefined;
  SunrisePartner: { id: number };
  SunriseLineScreen: undefined;
};
const SunriseStack = createStackNavigator();

export const SunriseNavigator: React.FC<SunriseStackParamList> = () => {
  const { sunriseTab } = routes;
  return (
    <SunriseStack.Navigator
      initialRouteName={sunriseTab.program}
      screenOptions={ScreenOptions}
    >
      <SunriseStack.Screen
        name={sunriseTab.program}
        component={SunriseProgram}
      />
      <SunriseStack.Screen
        name={sunriseTab.ambassadorLanding}
        component={AmbassadorLandingScreen}
      />
      <SunriseStack.Screen
        name={sunriseTab.landing}
        component={SunriseLandingScreen}
      />
      <SunriseStack.Screen
        name={sunriseTab.loyaltyLanding}
        component={LoyaltyLandingScreen}
      />
      <SunriseStack.Screen
        name={sunriseTab.discountHistory}
        component={SunriseDiscountHistory}
      />
      <SunriseStack.Screen
        name={sunriseTab.ambassadorActivity}
        component={SunriseAmbassadorActivity}
      />
      <SunriseStack.Screen
        name={sunriseTab.partner}
        component={SunrisePartner}
      />
      <SunriseStack.Screen name={sunriseTab.line} component={SunriseLine} />
    </SunriseStack.Navigator>
  );
};
