export type AccessToken = string | null;
export type DeviceToken = string | null;
export type PinSalt = string | null;

export type SaveDeviceTokenFxParams = {
  deviceToken: string;
};

export type SaveDeviceTokenFxDone = {
  deviceToken: string;
};

export type SavePinSaltFxParams = {
  pinSalt: string;
};

export type SavePinSaltFxDone = {
  pinSalt: string;
};

export type BootstrapFxDone = {
  deviceToken: string | null;
  pinSalt: string | null;
  deviceId: string | null;
};
