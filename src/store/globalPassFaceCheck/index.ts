import { securityServiceDomain } from '@store/app';

export const finishFaceCheck = securityServiceDomain.createEvent();

export const showSuccessMessageFx = securityServiceDomain.createEffect();
