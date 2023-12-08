import { combine } from 'effector';
import { ResponseDone } from '@store/api/types';
import { TransferByP2PPayload } from '@store/transfer/types';
import { bn } from '@utils/numbers/bn';
import { AMOUNT_REGEX, EMAIL_REGEX } from '@utils/regexes';
import { TransferDomain } from '@store/app';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
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

// email input
export const $email = TransferDomain.createStore<string>('');
export const onChangeEmail = TransferDomain.createEvent<string>();
export const $emailTouched = TransferDomain.createStore(false);
export const $emailInFocus = TransferDomain.createStore(false);
export const focusEmail = TransferDomain.createEvent<unknown>();
export const blurEmail = TransferDomain.createEvent<unknown>();

// message input
export const $message = TransferDomain.createStore<string>('');
export const onChangeMessage = TransferDomain.createEvent<string>();
export const $messageTouched = TransferDomain.createStore(false);
export const $messageInFocus = TransferDomain.createStore(false);
export const focusMessage = TransferDomain.createEvent<unknown>();
export const blurMessage = TransferDomain.createEvent<unknown>();

//payload
export const $payload = combine({
  amount: $amount,
  message: $message,
  fund: $from?.map((selector) => selector?.fund || selector?.id),
  to: $email,
});

export const pressSubmit = TransferDomain.createEvent();
export const transferByEmailRequest =
  TransferDomain.createEvent<TransferByP2PPayload>();

export const transferByEmailRequestFx = TransferDomain.createEffect<
  TransferByP2PPayload,
  ResponseDone<{ code: 'ok' }>
>();

// email input errors
export const $emailErrors = combine(
  {
    required: combine($email, (email: string) => {
      return email.length === 0 ? 'TransferByEmail:emailRequired' : null;
    }),
    invalid: combine($email, (email: string) => {
      return !EMAIL_REGEX.test(email) ? 'TransferByEmail:invalidEmail' : null;
    }),
  },
  ({ required, invalid }) => [required, invalid].filter(Boolean)
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
  [$amountErrors, $emailErrors],
  (errors) => !errors.flat().length
);

export const successTransfer = TransferDomain.createEvent();

export const chooseForFullAmount = TransferDomain.createEvent();

// ask

export const askTransferByEmail = TransferDomain.createEvent<unknown>();

export const $questionToTransfer = combine(
  $from,
  $amount,
  $email,
  $chosendAccount,
  (from, amount, email, account) => {
    const coin = from?.coin ? Sign[from?.coin] : from?.token;
    const tAccount = i18n.t(`UI:from${account}`);
    return i18n.t('TransferByEmail:confirmMessage', {
      replace: { coin, amount, email, account: tAccount },
    });
  }
);
