import { endpoints } from '@constants/endpoints';
import { forward, sample } from 'effector';
import {
  blurTransferByEmailScreen,
  focusTransferByEmailScreen,
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
  $payload,
  blurAmount,
  changeAmount,
  focusAmount,
  pressSubmit,
  chooseForFullAmount,
  $email,
  $emailInFocus,
  focusEmail,
  blurEmail,
  $emailTouched,
  $message,
  $messageInFocus,
  $messageTouched,
  focusMessage,
  blurMessage,
  transferByEmailRequestFx,
  onChangeMessage,
  onChangeEmail,
  successTransfer,
  askTransferByEmail,
  $questionToTransfer,
} from './index';
import { fetchRequests } from '@store/requests';
import { fix } from '@utils/numbers/fix';
import { signedRequest } from '@utils/agent';
import { Currency, mapFundToCurrency } from '@constants/funds';
import { showSuccess } from '@store/alert';
import { fetchPurchasedTokensFx } from '@store/tokenSaleWallet';
import { $from, changeIdx } from '@store/transfer';

//amount input
$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurTransferByEmailScreen, changeIdx, successTransfer);

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurTransferByEmailScreen, successTransfer);
$amountTouched
  .on(blurAmount, () => true)
  .reset(blurTransferByEmailScreen, successTransfer);

// email input
$email
  .on(onChangeEmail, (_, email) => email.toLowerCase())
  .reset(blurTransferByEmailScreen, successTransfer);

$emailInFocus
  .on(focusEmail, () => true)
  .reset(blurEmail, blurTransferByEmailScreen, successTransfer);
$emailTouched
  .on(blurAmount, () => true)
  .reset(blurTransferByEmailScreen, successTransfer);

$message
  .on(onChangeMessage, (_, amount) => amount)
  .reset(blurTransferByEmailScreen, successTransfer);

$messageInFocus
  .on(focusMessage, () => true)
  .reset(blurMessage, blurTransferByEmailScreen, successTransfer);
$messageTouched
  .on(blurMessage, () => true)
  .reset(blurTransferByEmailScreen, successTransfer);

sample({
  clock: chooseForFullAmount,
  source: $from,
  fn: (from) => {
    const fund = from?.fund;
    const sum = from?.sum;
    const currency = fund ? mapFundToCurrency[fund] : Currency.USDT;
    return sum ? fix(sum, { currency }) : '0';
  },
  target: changeAmount,
});

// requests

sample({
  clock: askTransferByEmail,
  source: $questionToTransfer,
  target: showSuccess.prepend((question: string) => ({
    domain: 'TransferByEmail',
    title: 'confirmTitle',
    message: question,
    buttons: [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'confirm',
        onPress: () => pressSubmit(),
      },
    ],
  })),
});

// request
sample({
  clock: pressSubmit,
  source: $payload,
  target: transferByEmailRequestFx,
});

transferByEmailRequestFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.transfer.byP2P;

  return signedRequest({ method, url, body });
});

sample({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  fn: (endpoint) => endpoint === endpoints.transfer.byP2P,
  target: successTransfer,
});

forward({
  from: successTransfer,
  to: [fetchWalletsFx, fetchRequests, fetchPurchasedTokensFx],
});

// Setting verification
forward({
  from: focusTransferByEmailScreen,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.transfer.byP2PVerify),
    changeVerifyRequestDomain.prepend(() => 'TransferByEmail'),
  ],
});

forward({
  from: [blurTransferByEmailScreen],
  to: resetVerifyCode,
});

forward({
  from: transferByEmailRequestFx.done,
  to: openVerifyBottomSheet,
});

// debug

// $from.watch((from) => log('$store/transferByEmail', { from }));

/*$idx.watch((idx) => logline('$store/transferByEmail', { idx }));
changeIdx.watch((idx) => logline('$store/transferByEmail', { changeIdx: idx })); */

/*$payload.watch(payload => log('$sotre/transferByEmail', { payload })); */
