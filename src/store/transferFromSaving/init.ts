import { endpoints } from '@constants/endpoints';
import { forward, guard, sample } from 'effector';
import {
  blurTransferFromSavingScreen,
  focusTransferFromSavingScreen,
} from '@store/app';

import {
  $verifyEndpoint,
  changeVerifyEndpoint,
  changeVerifyRequestDomain,
  initVerifyBottomSheet,
  openVerifyBottomSheet,
  resetVerifyCode,
  successVerifyCode,
} from '@store/verify';
import { fetchWalletsFx } from '@store/wallets';
import {
  $amount,
  $amountInFocus,
  $amountTouched,
  $idx,
  $payload,
  $from,
  blurAmount,
  changeAmount,
  changeIdx,
  focusAmount,
  pressSubmit,
  transferFromSavingRequestFx,
  chooseForFullAmount,
  redirectToTransferFromSavingFx,
  redirectToTransferFromSaving,
  successTransfer,
} from './index';
import { fetchRequests } from '@store/requests';
import { fix } from '@utils/numbers/fix';
import { Saving, AccountSelectors } from '@store/wallets/types';
import * as RootNavigation from '../../navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { signedRequest } from '@utils/agent';

$idx
  .on(changeIdx, (_, idx) => idx)
  .on(redirectToTransferFromSaving, (_, fund) => AccountSelectors.indexOf(fund))
  .reset(/*blurTransferFromSavingScreen,*/ successTransfer);

$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurTransferFromSavingScreen, changeIdx, successTransfer);
//.watch((amount) => logline('[tranferFromSaving] amount', amount));

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurTransferFromSavingScreen, successTransfer);
$amountTouched
  .on(blurAmount, () => true)
  .reset(blurTransferFromSavingScreen, successTransfer);

sample({
  clock: chooseForFullAmount,
  source: $from,
  fn: (from) => {
    const { balance, fund } = from as Saving;
    return fix(balance.sum, { currency: fund });
  },
  target: changeAmount,
});

/************ Request *************/

sample({
  clock: pressSubmit,
  source: $payload,
  target: transferFromSavingRequestFx,
});

transferFromSavingRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.transfer.do;

  return signedRequest({ method, url, body });
});


guard({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  filter: (endpoint) => endpoint === endpoints.transfer.verify,
  target: successTransfer,
});

forward({
  from: successTransfer,
  to: [fetchWalletsFx, fetchRequests],
});

// Setting verification

forward({
  from: focusTransferFromSavingScreen,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.transfer.verify),
    changeVerifyRequestDomain.prepend(() => 'TransferFromSaving'),
    //changeVerifyRedirectScreen.prepend(() => ''),
  ],
});

forward({
  from: blurTransferFromSavingScreen,
  to: resetVerifyCode,
});

forward({
  from: transferFromSavingRequestFx.done,
  to: openVerifyBottomSheet,
});

/************** Redirect ********/

forward({
  from: redirectToTransferFromSaving,
  to: redirectToTransferFromSavingFx,
});

redirectToTransferFromSavingFx.use(() => {
  RootNavigation.reset({
    index: 0,
    routes: [
      {
        name: routes.transfers.TransferFromSaving,
      },
    ],
  });
});
