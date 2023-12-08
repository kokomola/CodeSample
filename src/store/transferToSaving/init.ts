import { endpoints } from '@constants/endpoints';
import { forward, sample, guard } from 'effector';
import {
  blurTransferToSavingScreen,
  focusTransferToSavingScreen,
} from '@store/app';
import {
  $verifyEndpoint,
  changeVerifyEndpoint,
  changeVerifyRedirectScreen,
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
  transferToSavingRequestFx,
  chooseForFullAmount,
  redirectToTransferToSaving,
  redirectToTransferToSavingFx,
  successTransfer,
} from './index';
import { fetchRequests } from '@store/requests';
import { fix } from '@utils/numbers/fix';
import { Wallet, AccountSelectors } from '@store/wallets/types';
import * as RootNavigation from '../../navigator/RootNavigation';
import { fundToCurrency } from '@utils/maps';
import { routes } from 'src/navigator/routes';
import { signedRequest } from '@utils/agent';

$idx
  .on(changeIdx, (_, idx) => idx)
  .on(redirectToTransferToSaving, (_, fund) => AccountSelectors.indexOf(fund))
  .reset(/*blurTransferToSavingScreen,*/ successTransfer);

$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurTransferToSavingScreen, changeIdx, successTransfer);
//.watch((amount) => logline('[tranferToSaving] amount', amount));

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurTransferToSavingScreen, successTransfer);
$amountTouched
  .on(blurAmount, () => true)
  .reset(blurTransferToSavingScreen, successTransfer);

sample({
  clock: chooseForFullAmount,
  source: $from,
  fn: (from) => {
    const { balance, fund } = from as Wallet;
    const currency = fundToCurrency[fund];
    return fix(balance.sum, { currency });
  },
  target: changeAmount,
});

/************ Request *************/

sample({
  clock: pressSubmit,
  source: $payload,
  target: transferToSavingRequestFx,
});

transferToSavingRequestFx.use(async (body) => {
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

forward({
  from: focusTransferToSavingScreen,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.transfer.verify),
    changeVerifyRequestDomain.prepend(() => 'TransferToSaving'),
    changeVerifyRedirectScreen.prepend(() => 'TransferMenu'),
  ],
});

forward({
  from: blurTransferToSavingScreen,
  to: resetVerifyCode,
});

forward({
  from: transferToSavingRequestFx.done,
  to: openVerifyBottomSheet,
});

/******* Redirect ********/

forward({
  from: redirectToTransferToSaving,
  to: redirectToTransferToSavingFx,
});

redirectToTransferToSavingFx.use(() => {
  RootNavigation.reset({
    index: 0,
    routes: [
      {
        name: routes.transfers.TransferToSaving,
      },
    ],
  });
});

//errors in store/@app
