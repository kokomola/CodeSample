import { ResponseDone } from '@store/api/types';
import { SunriseDomain } from '@store/app';
import { $user } from '@store/user';
import { logline } from '@utils/debug';

/** join Sunrise */

//export const $isJoinedToSunrise = $user.map(user => user.loyalty_programs.sunrise.joined);
export const $isJoinedToSunrise = $user.map(user => user.refferal_agree);

export const joinSunriseFx = SunriseDomain.createEffect<
  void,
  ResponseDone<{ code: 'ok' }>
>();

// debug
//$isJoinedToSunrise.watch((isJoined) => logline('[sunriseLandingScreen]/refferal_agree', isJoined));