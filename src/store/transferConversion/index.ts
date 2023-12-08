import * as React from 'react';
import { combine, createEffect, createEvent, createStore } from 'effector';
import {
  LeadingField,
  TransferConversionFxDone,
  TransferConversionPayload,
} from '@store/transferConversion/types';
import { $wallets } from '@store/wallets';
import { Saving, Wallet } from '@store/wallets/types';
import { NormalizedCourses } from '@store/user/types';
import { $courses } from '@store/user';
import { fundToCurrency, fundToTicker } from '@utils/maps';
import { fix } from '@utils/numbers/fix';
import { bn } from '@utils/numbers/bn';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { AMOUNT_REGEX } from '@utils/regexes';

export const fromAccountCarouselRef = React.createRef();
export const toAccountCarouselRef = React.createRef();

// form
export const $fromIdx = createStore<number>(0);
export const changeFromIdx = createEvent<number>();
export const $from = combine(
  $wallets,
  $fromIdx,
  (wallets, idx) => wallets[idx]
);

export const $toIdx = createStore<number>(1);
export const changeToIdx = createEvent<number>();
export const $to = combine($wallets, $toIdx, (wallets, idx) => wallets[idx]);

export const $amount = createStore<string>('');
export const onChangeAmount = createEvent<string>();
export const changeAmount = onChangeAmount.map(amountNormalizer);
export const $amountTouched = createStore(false);
export const $amountInFocus = createStore(false);
export const focusAmount = createEvent<React.SyntheticEvent>();
export const blurAmount = createEvent<React.SyntheticEvent>();

export const $destinationAmount = createStore<string>('');
export const onChangeDestinationAmount = createEvent<string>();
export const changeDestinationAmount = onChangeDestinationAmount.map(
  amountNormalizer
);
export const $destinationAmountTouched = createStore(false);
export const $destinationAmountInFocus = createStore(false);
export const focusDestinationAmount = createEvent<React.SyntheticEvent>();
export const blurDestinationAmount = createEvent<React.SyntheticEvent>();
export const $leadingField = createStore<LeadingField>('spent');

// calc
export const calcAmountFx = createEffect<
  {
    to: Wallet;
    from: Wallet;
    destinationAmount: string;
    courses: NormalizedCourses;
  },
  { amount: string }
>();
export const calcDestinationAmountFx = createEffect<
  {
    to: Wallet | Saving;
    from: Wallet | Saving;
    amount: string;
    courses: NormalizedCourses;
  },
  { destinationAmount: string }
>();

// course
export const $course = combine($courses, $from, $to, (courses, from, to) => {
  const fromCurrency = fundToCurrency[from.fund];
  const toCurrency = fundToCurrency[to.fund];
  const price = fix(courses[fromCurrency][toCurrency], {
    currency: toCurrency,
  });
  return {
    from: `1 ${fundToTicker[from.fund]}`,
    to: `${price} ${fundToTicker[to.fund]}`,
  };
});

// xhr
export const $payload = combine(
  {
    amount: $amount,
    destinationAmount: $destinationAmount,
    from_fund: $from.map((account) => account.fund),
    to_fund: $to.map((account) => account.fund),
    leading_field: $leadingField,
  },
  ({ amount, destinationAmount, from_fund, to_fund, leading_field }) => ({
    amount: leading_field === 'target' ? destinationAmount : amount,
    from_fund,
    to_fund,
    leading_field,
  })
);

export const pressSubmit = createEvent<React.SyntheticEvent>();
export const transferConversionFx = createEffect<
  TransferConversionPayload,
  TransferConversionFxDone
>();

// validation
export const $fromErrors = combine(
  {
    uselessTransfer: combine($from, $to, (from, to) => {
      if (from.fund === to.fund)
        return 'transferConversionStore:uselessTransfer';
      return null;
    }),
  },
  ({ uselessTransfer }) => [uselessTransfer].filter(Boolean)
);

export const $amountErrors = combine(
  {
    required: combine($amount, $leadingField, (amount, leadingField) => {
      if (leadingField !== 'spent') return null;
      if (amount.length < 1)
        return 'transferConversionStore:amountIsRequiredError';
      return null;
    }),
    invalid: $amount.map((amount) =>
      !AMOUNT_REGEX.test(amount) ? 'UIErrors:amountIsInvalidError' : null
    ),
    notEnoughFunds: combine($amount, $from, (amount, from) => {
      if (!amount || !from) return null;
      if (bn(amount).isGreaterThan(from.balance.sum))
        return 'transferConversionStore:notEnoughFundsError';

      return null;
    }),
  },
  ({ required, invalid, notEnoughFunds }) => [required, invalid, notEnoughFunds].filter(Boolean)
);

export const $destinationAmountErrors = combine(
  {
    required: combine(
      $destinationAmount,
      $leadingField,
      (destinationAmount, leadingField) => {
        if (leadingField !== 'target') return null;
        if (destinationAmount.length < 1)
          return 'transferConversionStore:destinationAmountIsRequiredError';

        return null;
      }
    ),
  },
  ({ required }) => [required].filter(Boolean)
);

export const $isFormValid = combine(
  [$amountErrors, $destinationAmountErrors, $fromErrors],
  (errors) => !errors.flat().length
);
