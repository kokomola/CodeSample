import { redirectDomain } from '@store/app';

export const redirectToScreenFx = redirectDomain.createEffect<{ rootNav?: string, screen: string, params?: unknown }, void>();
export const redirectToBackOrScreenFx = redirectDomain.createEffect<{ rootNav?: string, screen: string, params?: unknown }, void>();
