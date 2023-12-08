import { createEvent, createEffect } from 'effector';

import { ShowErrorPayload, ShowSuccessPayload } from '@store/alert/types';

export const showError = createEvent<ShowErrorPayload>();
export const showErrorFx = createEffect<ShowErrorPayload, void, void>();

export const showSuccess = createEvent<ShowSuccessPayload>();
export const showSuccessFx = createEffect<ShowSuccessPayload, void, void>();
