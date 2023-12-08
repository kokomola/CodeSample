import { PERMISSIONS } from "react-native-permissions"

export enum PermRESULT {
  denied = "DENIED",
  unavailable = "UNAVAILABLE",
  blocked = "BLOCKED",
  granted = "GRANTED",
  limited = "LIMITED",
}

/*** Declare some permissions */

const PLATFORM_CAMERA_PERMISSIONS = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const PLATFORM_PHOTO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  //ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // && PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

const PLATFORM_ACCESS_BACKGROUND_PERMISSIONS = {
  ios: null,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

export const REQUEST_PERMISSION_TYPE = {
  camera: PLATFORM_CAMERA_PERMISSIONS,
  storage: PLATFORM_PHOTO_PERMISSIONS,
  location: PLATFORM_LOCATION_PERMISSIONS,
  background: PLATFORM_ACCESS_BACKGROUND_PERMISSIONS,
};

/* Generate types */

// const r = REQUEST_PERMISSION_TYPE.camera.ios;

type REQUEST_KEYS = keyof typeof REQUEST_PERMISSION_TYPE;

export type AppPermissions = {
  camera?: PermRESULT;
  storage?: PermRESULT;
  location?: PermRESULT;
  background?: PermRESULT;
};


export const defaultPermissions: AppPermissions = {
  camera: PermRESULT.denied,
  storage: PermRESULT.denied,
  location: PermRESULT.denied,
  background: PermRESULT.denied,
};