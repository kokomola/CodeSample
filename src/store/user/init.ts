import { combine, forward } from 'effector';
import { CommonActions } from '@react-navigation/native';
import { bn } from '@utils/numbers/bn';
import { normalizeMeasurement } from '@utils/numbers/converters';
import {
  $user,
  delayBetweenUserPollsFx,
  fetchUserFx,
  normalizeCoursesFx,
  POLLING_INTERVAL,
  stopUserPolling,
  $courses,
  pollUserFx,
  redirectKycSetupFx,
  redirect2faSetupFx,
  $userV2,
  fetchUserV2Fx,
  $userHas2faSecurityAlert,
  $isVerifiedAnd2fa,
  $isTwoFa,
} from '@store/user/index';
import { NormalizedCourses } from '@store/user/types';

import * as RootNavigation from '../../navigator/RootNavigation';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';
import { agreeShopTermsFx } from '@store/shop/agreement';
import { agreeSunriseTermsFx } from '@store/sunrise/agreement';
import { log } from '@utils/debug';

fetchUserFx.use(async () => {
  const method = 'get';
  const url = endpoints.account.me;
  return signedRequest({ method, url });
});

$user
  .on(fetchUserFx.doneData, (_, response) => response.data.data)
  // join sunrise
  .on(agreeSunriseTermsFx.doneData, (user) => ({
    ...user,
    sunrise_agree: true,
  }))
  // join sollar gift
  .on(agreeShopTermsFx.doneData, (user) => ({ ...user, shop_agree: true }));

// polling
delayBetweenUserPollsFx.use(async () => {
  await new Promise((resolve, reject) => {
    const timeoutID = setTimeout(resolve, POLLING_INTERVAL);

    const unwatch = stopUserPolling.watch(() => {
      unwatch();
      clearTimeout(timeoutID);
      reject(new Error('Error in delay between user polls'));
    });
  });
});

forward({
  from: pollUserFx.done.map(({ params }) => params),
  to: delayBetweenUserPollsFx,
});

forward({
  from: delayBetweenUserPollsFx.done.map(({ params }) => params),
  to: pollUserFx,
});

// courses
forward({
  from: fetchUserFx.doneData.map((response) => response.data.data.course),
  to: normalizeCoursesFx,
});

normalizeCoursesFx.use((courses) => {
  const normalizedCourses: NormalizedCourses = {
    usdt: {
      usdt: '1',
    },
  };

  for (const courseName in courses) {
    const course = courseName.split('_');
    const from = normalizeMeasurement(course[0]);
    const to = normalizeMeasurement(course[1]);

    if (!normalizedCourses[from]) normalizedCourses[from] = {};
    normalizedCourses[from][to] = bn(courses[courseName]).toString();
  }

  for (const from in normalizedCourses) {
    for (const to in normalizedCourses[from]) {
      if (!normalizedCourses[to]) normalizedCourses[to] = {};

      if (!normalizedCourses[to][from]) {
        normalizedCourses[to][from] = bn(1)
          .div(normalizedCourses[from][to])
          .toString();
      }
    }
  }

  normalizedCourses.usdt.usdt = '1';
  return normalizedCourses;
});

$courses.on(normalizeCoursesFx.doneData, (_, courses) => courses);

redirectKycSetupFx.use(async () => {
  RootNavigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Settings',
          state: {
            index: 1,
            routes: [{ name: 'SettingsMenu' }, { name: 'KYCScreen' }],
          },
        },
      ],
    })
  );
});

redirect2faSetupFx.use(() => {
  RootNavigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Settings',
          state: {
            index: 1,
            routes: [
              { name: 'SettingsMenu' },
              { name: 'TwoFactorAuthSettings' },
            ],
          },
        },
      ],
    })
  );
});

// ===== TO DO - account/v2/me url ======
$userV2
  .on(fetchUserV2Fx.doneData, (_, response) => response.data.data)
  .on(agreeSunriseTermsFx.doneData, (user) => ({
    ...user,
    sunrise_agree: true,
  }))
  .on(agreeShopTermsFx.doneData, (user) => ({ ...user, shop_agree: true }));

fetchUserV2Fx.use(() => {
  const method = 'get';
  const url = endpoints.account.fetchMe;

  return signedRequest({ method, url });
});

//$user.watch(user => log('$store/user/courses', user.course));
//$courses.watch((courses) => log('$courses', courses))

combine(
  $userHas2faSecurityAlert,
  $isVerifiedAnd2fa,
  $isTwoFa,
  (userHas2faSecurity, isVarifeidAndKys, isTwoFa) =>
    log('$user', { userHas2faSecurity, isVarifeidAndKys, isTwoFa })
);
