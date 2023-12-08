import { combine, forward, guard, merge, sample } from 'effector';
import {
  $amount,
  $from,
  $to,
  $fromIdx,
  $payload,
  $toIdx,
  calcDestinationAmountFx,
  changeFromIdx,
  changeToIdx,
  pressSubmit,
  transferConversionFx,
  $destinationAmount,
  changeAmount,
  changeDestinationAmount,
  $leadingField,
  calcAmountFx,
  $amountInFocus,
  focusAmount,
  blurAmount,
  $amountTouched,
  $destinationAmountInFocus,
  focusDestinationAmount,
  blurDestinationAmount,
  $destinationAmountTouched,
} from '@store/transferConversion/index';
import { $courses } from '@store/user';

import { bn } from '@utils/numbers/bn';
import { fundToCurrency } from '@utils/maps';
import {
  blurTransferConversionScreen,
  focusTransferConversionScreen,
} from '@store/app';
import { fix } from '@utils/numbers/fix';
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
import { endpoints } from '@constants/endpoints';
import { fetchWalletsFx } from '@store/wallets';
import { signedRequest } from '@utils/agent';
import { routes } from 'src/navigator/routes';

$fromIdx.on(changeFromIdx, (_, idx) => idx);
$toIdx.on(changeToIdx, (_, idx) => idx);
$amount
  .on(changeAmount, (_, amount) => amount)
  .reset(blurTransferConversionScreen);
$destinationAmount.on(changeDestinationAmount, (_, amount) => amount);
$leadingField
  .on(changeAmount, () => 'spent')
  .on(changeDestinationAmount, () => 'target');

$amountInFocus.on(focusAmount, () => true).reset(blurAmount);
$amountTouched.on(blurAmount, () => true);
$destinationAmountInFocus
  .on(focusDestinationAmount, () => true)
  .reset(blurDestinationAmount);
$destinationAmountTouched.on(blurDestinationAmount, () => true);

sample({
  clock: pressSubmit,
  source: $payload,
  target: transferConversionFx,
});

transferConversionFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.transfer.do;

  return signedRequest({ method, url, body });
});

// calc
sample({
  clock: guard({
    clock: merge([
      $courses.updates,
      $amount.updates,
      $to.updates,
      $from.updates,
      $leadingField.updates,
    ]),
    source: $leadingField,
    filter: (leadingField) => leadingField === 'spent',
  }),
  source: combine({
    courses: $courses,
    amount: $amount,
    to: $to,
    from: $from,
  }),
  target: calcDestinationAmountFx,
});

calcDestinationAmountFx.use(({ courses, from, to, amount }) => {
  if (!courses || !from || !to)
    throw new Error('cant calculate destination amount');
  if (!amount) return { destinationAmount: '' };

  const fromCurrency = fundToCurrency[from.fund];
  const toCurrency = fundToCurrency[to.fund];
  const destinationAmount = bn(amount)
    .multipliedBy(courses[fromCurrency][toCurrency])
    .toString();

  return {
    destinationAmount: fix(destinationAmount, { currency: toCurrency }),
  };
});

$destinationAmount.on(
  calcDestinationAmountFx.doneData,
  (_, { destinationAmount }) => destinationAmount
);

sample({
  clock: guard({
    clock: merge([
      $courses.updates,
      $destinationAmount.updates,
      $to.updates,
      $from.updates,
      $leadingField.updates,
    ]),
    source: $leadingField,
    filter: (leadingField) => leadingField === 'target',
  }),
  source: combine({
    courses: $courses,
    destinationAmount: $destinationAmount,
    to: $to,
    from: $from,
  }),
  target: calcAmountFx,
});

calcAmountFx.use(({ courses, from, to, destinationAmount }) => {
  if (!courses || !from || !to)
    throw new Error('cant calculate destination amount');
  if (!destinationAmount) return { amount: '' };

  const fromCurrency = fundToCurrency[from.fund];
  const toCurrency = fundToCurrency[to.fund];
  const amount = bn(destinationAmount)
    .multipliedBy(courses[toCurrency][fromCurrency])
    .toString();

  return { amount: fix(amount, { currency: fromCurrency }) };
});

$amount.on(calcAmountFx.doneData, (_, { amount }) => amount);

/******  Verify code settings ******/

// init
forward({
  from: focusTransferConversionScreen,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(() => endpoints.transfer.verify),
    changeVerifyRequestDomain.prepend(() => 'transferConversionStore'),
    changeVerifyRedirectScreen.prepend(() => routes.tabs.AmirWallet),
  ],
});

// reset
forward({
  from: blurTransferConversionScreen,
  to: resetVerifyCode,
});

// open
forward({
  from: transferConversionFx.done,
  to: openVerifyBottomSheet,
});

// done
const doneVerifyRequest = guard({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  filter: (endpoint) => endpoint === endpoints.withdraw.verify,
});

forward({
  from: doneVerifyRequest,
  to: fetchWalletsFx,
});
