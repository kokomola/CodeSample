import { guard, split } from 'effector';
import { PermissionDomain } from '@store/app/index';
import { AppPermissions, defaultPermissions, PermRESULT } from './types';

export const $permissions = PermissionDomain.createStore<AppPermissions>(defaultPermissions);

export const askPerm = PermissionDomain.createEvent<keyof AppPermissions>();
export const checkPermFx = PermissionDomain.createEffect<keyof AppPermissions, AppPermissions>();
export const requestPermFx = PermissionDomain.createEffect<keyof AppPermissions, AppPermissions>();

export const checkedPerm = split(checkPermFx.done, {
    unavailable: ({ params: key, result }) => result[key] === PermRESULT.unavailable,
    blocked: ({ params: key, result }) => result[key] === PermRESULT.blocked,
    denied: ({ params: key, result }) => result[key] === PermRESULT.denied,
})

export const requestedPerm = split(requestPermFx.done, {
    blocked: ({ params: key, result }) => result[key] === PermRESULT.blocked,
    denied: ({ params: key, result }) => result[key] === PermRESULT.denied,
})

export const $isCamera = $permissions.map((perms) => perms.camera === PermRESULT.granted);
export const $isLocation = $permissions.map((perms) => perms.location === PermRESULT.granted);

export const openSettingsEvent = PermissionDomain.createEvent<keyof AppPermissions>();
export const openSettingsFx = PermissionDomain.createEffect<keyof AppPermissions, void>();

export const showOpenSettings = PermissionDomain.createEvent();