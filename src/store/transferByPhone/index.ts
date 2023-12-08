import { combine } from 'effector';
import { ResponseDone } from '@store/api/types';
import { TransferByP2PPayload } from '@store/transfer/types';
import { bn } from '@utils/numbers/bn';
import { TransferDomain } from '@store/app';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { AMOUNT_REGEX } from '@utils/regexes';
import i18n from '@utils/i18n';
import { Sign } from '@constants/funds';
import { $from } from '@store/transfer';
import { $chosendAccount } from '@store/account/fund';

// amount input
export const $amount = TransferDomain.createStore<string>('');
export const onChangeAmount = TransferDomain.createEvent<string>();
export const changeAmount = onChangeAmount.map(amountNormalizer);
export const $amountTouched = TransferDomain.createStore(false);
export const $amountInFocus = TransferDomain.createStore(false);
export const focusAmount = TransferDomain.createEvent<unknown>();
export const blurAmount = TransferDomain.createEvent<unknown>();

// phone input
export const $phone = TransferDomain.createStore<string>('');
export const onChangePhone = TransferDomain.createEvent<string>();
export const changePhone = onChangePhone.map((phone: string) =>
  phone.replace(/[^0-9+]+/, '')
);

export const $phoneTouched = TransferDomain.createStore(false);
export const $phoneInFocus = TransferDomain.createStore(false);
export const focusPhone = TransferDomain.createEvent<unknown>();
export const blurPhone = TransferDomain.createEvent<unknown>();

// message input
export const $message = TransferDomain.createStore<string>('');
export const onChangeMessage = TransferDomain.createEvent<string>();

export const $messageTouched = TransferDomain.createStore(false);
export const $messageInFocus = TransferDomain.createStore(false);
export const focusMessage = TransferDomain.createEvent<unknown>();
export const blurMessage = TransferDomain.createEvent<unknown>();

export const $payload = combine({
  amount: $amount,
  message: $message,
  fund: $from?.map((selector) => selector?.fund || selector?.id),
  to: $phone,
});

export const pressSubmit = TransferDomain.createEvent();
export const transferByPhoneRequest =
  TransferDomain.createEvent<TransferByP2PPayload>();

export const transferByPhoneRequestFx = TransferDomain.createEffect<
  TransferByP2PPayload,
  ResponseDone<{ code: 'ok' }>
>();

// phone errors
export const $phoneErrors = combine(
  {
    required: combine($phone, (phone: string) => {
      return phone[0] !== '+' || phone.length < 12
        ? 'TransferByPhone:invalidFormat'
        : null;
    }),
  },
  ({ required }) => [required].filter(Boolean)
);

//amount errors
export const $amountErrors = combine(
  {
    required: combine($amount, (amount: string) => {
      return amount.length === 0 || bn(amount).isLessThanOrEqualTo(0)
        ? 'TransferFromSaving:amountIsRequiredError'
        : null;
    }),
    invalid: $amount.map((amount) =>
      !AMOUNT_REGEX.test(amount) ? 'UIErrors:amountIsInvalidError' : null
    ),
    notEnoughFunds: combine($amount, $from, (amount, from) => {
      if (!amount || !from) return null;
      if (bn(amount).isGreaterThan(from.sum))
        return 'TransferFromSaving:notEnoughFundsError';

      return null;
    }),
  },
  ({ required, invalid, notEnoughFunds }) =>
    [required, invalid, notEnoughFunds].filter(Boolean)
);

export const $isFormValid = combine(
  [$amountErrors, $phoneErrors],
  (errors) => !errors.flat().length
);

export const successTransfer = TransferDomain.createEvent();

export const chooseForFullAmount = TransferDomain.createEvent();

// ask

export const askTransferByPhone = TransferDomain.createEvent<unknown>();

export const $questionToTransfer = combine(
  $from,
  $amount,
  $phone,
  $chosendAccount,
  (from, amount, phone, account) => {
    const coin = from?.coin ? Sign[from?.coin] : from?.token;
    const tAccount = i18n.t(`UI:from${account}`);
    return i18n.t('TransferByPhone:confirmMessage', {
      replace: { coin, amount, phone, account: tAccount },
    });
  }
);

// debug

//changeIdx.watch(idx => logline('$store/transferByPhone', { idx }))
