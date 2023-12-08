import {Route, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'src/navigator/AuthNavigator';

type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'SignIn'>;

export type SignInScreenProps = {
  navigation: SignInScreenNavigationProp;
  //route: SignInScreenRouteProp;
  route: Route<string, any>;
};
