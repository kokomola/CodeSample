import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Initial} from 'src/screens/Initial';
import {SignIn} from 'src/screens/SignIn';
import {RegisterDevice} from 'src/screens/RegisterDevice';
import {SetupPIN} from 'src/screens/SetupPIN';
import {LoginPIN} from 'src/screens/LoginPIN';
import {SignUp} from 'src/screens/SignUp';
import {routes} from './routes';

const AuthStack = createStackNavigator();

export const AuthNavigator: React.FC = () => {
  const {auth} = routes;
  return (
    <AuthStack.Navigator
      initialRouteName={auth.Initial}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <AuthStack.Screen name={auth.Initial} component={Initial} />
      <AuthStack.Screen
        options={{animationEnabled: false}}
        name={auth.SignIn}
        component={SignIn}
      />
      <AuthStack.Screen name={auth.RegisterDevice} component={RegisterDevice} />
      <AuthStack.Screen name={auth.SetupPIN} component={SetupPIN} />
      <AuthStack.Screen name={auth.LoginPIN} component={LoginPIN} />
      <AuthStack.Screen name={auth.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};
