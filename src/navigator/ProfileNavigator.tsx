import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileMenu } from 'src/screens/ProfileMenu';
import { LanguageSettings } from 'src/screens/LanguageSettings';
import { KYCScreen } from 'src/screens/KYCScreen';
import { TwoFactorAuthSettings } from 'src/screens/TwoFactorAuthSettings';
import { ReinvestmentSettings } from 'src/screens/ReinvestmentSettings';
import { ChangePassword } from 'src/screens/ChangePassword';
import { ChangeEmail } from 'src/screens/ChangeEmail';
import { AboutApp } from 'src/screens/AboutApp';
import { ProfileSocialNetworks } from 'src/screens/ProfileSocialNetworks';
import { DeleteAccount } from 'src/screens/DeleteAccount';
//import { GlobalPassKycScreen } from 'src/screens/GlobalPassKycScreen';
import { routes } from './routes';

const ProfileStack = createStackNavigator();

export const ProfileNavigator: React.FC = () => {
  const { profileTab } = routes;

  return (
    <ProfileStack.Navigator
      initialRouteName={profileTab.profileMenu}
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: '#fff' },
      }}>
      <ProfileStack.Screen
        name={profileTab.profileMenu}
        component={ProfileMenu}
      />
      <ProfileStack.Screen
        name={profileTab.languageSettings}
        component={LanguageSettings}
      />
      <ProfileStack.Screen name={profileTab.kycScreen} component={KYCScreen} />
      <ProfileStack.Screen
        name={profileTab.twoFactorAuthSettings}
        component={TwoFactorAuthSettings}
      />
      <ProfileStack.Screen
        name={profileTab.reinvestmentSettings}
        component={ReinvestmentSettings}
      />
      <ProfileStack.Screen
        name={profileTab.changePassword}
        component={ChangePassword}
      />
      <ProfileStack.Screen
        name={profileTab.changeEmail}
        component={ChangeEmail}
      />
      <ProfileStack.Screen
        name={profileTab.deleteAccount}
        component={DeleteAccount}
      />
      <ProfileStack.Screen name={profileTab.aboutApp} component={AboutApp} />
      <ProfileStack.Screen
        name={profileTab.socialNetworks}
        component={ProfileSocialNetworks}
      />
      {/*       <ProfileStack.Screen
        name={profileTab.PassKyc}
        component={GlobalPassKycScreen}
      /> */}
    </ProfileStack.Navigator>
  );
};
