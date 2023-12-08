// See https://github.com/react-native-netinfo/react-native-netinfo#readme

export type Connection = {
  type?: unknown;
  isConnected: boolean | null;
  isInternetReachable?: boolean;
  isWifiEnabled?: boolean; // (Android only) Whether the device's WiFi is ON or OFF.
};
