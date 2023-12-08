import { combine } from 'effector';
import { $savings, $wallets } from '@store/wallets';
import { ResponseDone } from '@store/api/types';
import { LeadingField, TransferPayload } from '@store/transfer/types';
import { TransferDomain } from '@store/app';
import { bn } from '@utils/numbers/bn';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { AMOUNT_REGEX } from '@utils/regexes';

export const $idx = TransferDomain.createStore<number>(0);
export const changeIdx = TransferDomain.createEvent<number>();

export const $from = combine($savings, $idx, (savings, idx) => savings[idx]);
export const $to = combine($wallets, $idx, (wallets, idx) => wallets[idx]);

export const $amount = TransferDomain.createStore<string>('');
export const onChangeAmount = TransferDomain.createEvent<string>();
export const changeAmount = onChangeAmount.map(amountNormalizer);

export const $amountTouched = TransferDomain.createStore(false);
export const $amountInFocus = TransferDomain.createStore(false);
export const focusAmount = TransferDomain.createEvent<React.SyntheticEvent>();
export const blurAmount = TransferDomain.createEvent<React.SyntheticEvent>();

export const $leadingField = TransferDomain.createStore<LeadingField>('spent');

export const $payload = combine<TransferPayload>({
  amount: $amount,
  from_fund: $from.map((account) => account.fund),
  to_fund: $to.map((account) => account.fund),
  leading_field: $leadingField,
});

//$payload.watch((s) => logline('[transferFromSaving] payload', s));

export const pressSubmit = TransferDomain.createEvent<React.SyntheticEvent>();
export const transferFromSavingRequest = TransferDomain.createEvent<
  TransferPayload
>();
export const transferFromSavingRequestFx = TransferDomain.createEffect<
  TransferPayload,
  ResponseDone<{ code: 'ok' }>
>();

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
      if (bn(amount).isGreaterThan(from.balance.sum))
        return 'TransferFromSaving:notEnoughFundsError';

      return null;
    }),
  },
  ({ required, invalid, notEnoughFunds }) => [required, invalid, notEnoughFunds].filter(Boolean)
);

export const $isFormValid = combine(
  $amountErrors,
  (errors) => !errors.flat().length
);

export const successTransfer = TransferDomain.createEvent();

export const chooseForFullAmount = TransferDomain.createEvent<
  React.SyntheticEvent
>();

export const redirectToTransferFromSaving = TransferDomain.createEvent<
  string
>();
export const redirectToTransferFromSavingFx = TransferDomain.createEffect();
