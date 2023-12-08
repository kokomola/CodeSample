import { AppDomain } from "@store/app";

export const $deviceId = AppDomain.createStore<string | null>(null);

export const getAndSaveDeviceIdFx = AppDomain.createEffect<void, string>();

export const removeDeviceIdFx = AppDomain.createEffect<void, void>();