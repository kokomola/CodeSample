import { StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@components/uikit/Button';
import { useStore } from 'effector-react';
import { $isConnected, setConnected } from '@store/app/connection';

export function TestConnection() {
  // temp
  const isConnected = useStore($isConnected);
  return (
    <Button text="Toggle Internet" onPress={() => setConnected(!isConnected)} />
  );
}

const styles = StyleSheet.create({});
