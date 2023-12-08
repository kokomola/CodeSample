import { SunriseDomain } from '@store/app';
import { ResponseDone } from '@store/api/types';

/** agree Ambassador terms */

export const agreeAmbassadorTerms = SunriseDomain.createEvent<void>();
export const agreeAmbassadorTermsFx = SunriseDomain.createEffect<
  void,
  ResponseDone<{ code: 'ok' }>
>();
