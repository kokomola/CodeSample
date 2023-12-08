import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import { useGate, useStore } from 'effector-react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PortalProvider } from '@gorhom/portal';

import * as RootNavigation from './RootNavigation';
import { AuthNavigator } from './AuthNavigator';
import { BottomTabs } from './BottomTabs';
import { $canOpenApp, bootstrapFx } from '@store/auth';
import { $isConnected, RootGate } from '@store/app/connection';
import { AppHeader } from '@components/AppHeader';
import ModalManager from '@components/modals/ModalManager';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Connection = () => {
  const isConnected = useStore($isConnected);
  if (isConnected) return null;

  return <AppHeader key={Number(isConnected)} />;
};

const SubRoot: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useGate(RootGate);

  const canOpenApp = useStore($canOpenApp);

  //throw new Error('My first Sentry error!');

  const navigator = canOpenApp ? <BottomTabs /> : <AuthNavigator />;

  return (
    <SafeAreaProvider key={Number(canOpenApp)}>
      <Connection />
      <PortalProvider>
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <StatusBar />
          {navigator}
        </NavigationContainer>
        <ModalManager />
      </PortalProvider>
    </SafeAreaProvider>
  );
};

export const Root = gestureHandlerRootHOC(SubRoot);
