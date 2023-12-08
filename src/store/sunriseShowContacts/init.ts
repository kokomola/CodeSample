import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { forward, sample } from 'effector';
import {
  $isShowInterface,
  $isShowAccount,
  toggleShowRequest,
} from '@store/sunriseShowContacts';
import { allowShowContactsRequestFx, toggleShowInterface } from './index';
import { fetchUserFx } from '@store/user';
import { showErrorFx } from '@store/alert';
import i18n from '@utils/i18n';

//$isShowAccount.watch((isShow) => logline('', { $isShowAccount: isShow }));

$isShowInterface
  .on(toggleShowRequest, (_, isShow) => isShow)
  .on(toggleShowInterface, (_, isShow) => isShow);
//.watch((isShow) => logline('', { $isShowInterface: isShow }));

sample({
  clock: toggleShowRequest,
  fn: (isShow) => ({ allow_show_contacts: isShow }),
  target: allowShowContactsRequestFx,
});

allowShowContactsRequestFx.use((body) => {
  const method = 'post';
  const url = endpoints.sunrise.allowShowContacts;
  //logline('', '***');
  //throw new Error('error: perm not specified');
  return signedRequest({ method, url, body });
});

// update $user
forward({
  from: [allowShowContactsRequestFx.done, allowShowContactsRequestFx.fail],
  to: fetchUserFx,
});

// sinchronization from DB and interface
sample({
  clock: [fetchUserFx.done, $isShowAccount.updates],
  source: $isShowAccount,
  target: toggleShowInterface,
});

forward({
  from: allowShowContactsRequestFx.fail,
  to: [
    showErrorFx.prepend(() => {
      return { title: '', message: i18n.t(`SunriseErrors:changeShowContacts`) };
    }),
  ],
});
