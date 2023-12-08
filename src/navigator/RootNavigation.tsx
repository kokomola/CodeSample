import * as React from 'react';
import { StackActions } from '@react-navigation/native';
import { logline } from '@utils/debug';

export const navigationRef = React.createRef<any>();

export const navigate = (name: string, params?: any): void => {
  navigationRef.current?.navigate(name, params);
};

export const addListener = (event: any, handler: any): void => {
  navigationRef.current?.addListener(event, handler);
};

export const dispatch = (action: any): void => {
  navigationRef.current?.dispatch(action);
};

export const reset = (state: any): void => {
  navigationRef.current?.reset(state);
};

export const popToTop = (): void => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

export const canGoBack = (): boolean => navigationRef.current?.canGoBack();

export const goBack = (): void => {
  navigationRef.current?.goBack();
};

export const getCurrentRoute = () => navigationRef.current?.getCurrentRoute();

export const getCurrentOptions = () =>
  navigationRef.current?.getCurrentOptions();

export const resetRoot = (name: string, params?: any): void => {
  logline('RootNavigation', { name, params });
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name, params }],
  });
};

export const goBackOrToScreen = (screenName: string): void =>
  navigationRef.current?.canGoBack()
    ? navigationRef.current?.goBack()
    : navigationRef.current?.navigate(screenName, null);
