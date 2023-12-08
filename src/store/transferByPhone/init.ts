import { endpoints } from '@constants/endpoints';
import { forward, sample } from 'effector';
import {
  blurTransferByPhoneScreen,
  focusTransferByPhoneScreen,
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
  $phone,
  $phoneInFocus,
  focusPhone,
  blurPhone,
  $phoneTouched,
  $message,
  $messageInFocus,
  $messageTouched,
  focusMessage,
  blurMessage,
  transferByPhoneRequestFx,
  onChangeMessage,
  successTransfer,
  changePhone,
  askTransferByPhone,
  $questionToTransfer,
} from './index';
import { fetchRequests } from '@store/requests';
import { fix } from '@utils/numbers/fix';
import { signedRequest } from '@utils/agent';
import { Currency, mapFundToCurrency } from '@constants/funds';
import { showSuccess } from '@store/alert';
import { $from, changeIdx } from '@store/transfer';

//amount input
$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurTransferByPhoneScreen, changeIdx, successTransfer);

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurTransferByPhoneScreen, successTransfer);
$amountTouched
  .on(blurAmount, () => true)
  .reset(blurTransferByPhoneScreen, successTransfer);

// phone input
$phone
  .on(changePhone, (_, number) => number)
  .on(focusPhone, (amount) => (!amount ? '+' : amount))
  .reset(blurTransferByPhoneScreen, successTransfer);
// successTransfer
$phoneInFocus
  .on(focusPhone, () => true)

  .reset(blurPhone, blurTransferByPhoneScreen, successTransfer);
$phoneTouched
  .on(blurAmount, () => true)
  .reset(blurTransferByPhoneScreen, successTransfer);

//meassage input
$message
  .on(onChangeMessage, (_, amount) => amount)
  .reset(blurTransferByPhoneScreen, successTransfer);
// successTransfer
$messageInFocus
  .on(focusMessage, () => true)
  .reset(blurMessage, blurTransferByPhoneScreen, successTransfer);
$messageTouched
  .on(blurMessage, () => true)
  .reset(blurTransferByPhoneScreen, successTransfer);

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

// ask

sample({
  clock: askTransferByPhone,
  source: $questionToTransfer,
  target: showSuccess.prepend((question: string) => ({
    domain: 'TransferByPhone',
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
  target: transferByPhoneRequestFx,
});

transferByPhoneRequestFx.use(async (body) => {
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
  to: [fetchWalletsFx, fetchRequests],
});

// Setting verification
forward({
  from: focusTransferByPhoneScreen,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.transfer.byP2PVerify),
    changeVerifyRequestDomain.prepend(() => 'TransferByPhone'),
  ],
});

forward({
  from: blurTransferByPhoneScreen,
  to: resetVerifyCode,
});

forward({
  from: transferByPhoneRequestFx.done,
  to: openVerifyBottomSheet,
});
