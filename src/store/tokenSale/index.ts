/* eslint-disable camelcase */
import { combine } from 'effector';
import { createGate } from 'effector-react';

import { TokenSale } from '@store/app';
import { $sollarBalance, $sollarCourse } from '@store/sollars';

import { bn } from '@utils/numbers/bn';

import { BuyTokenPayload, Currencies, TokenSaleOffers } from './type';
import { ResponseDone } from './type';
import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { $user } from '@store/user';
import { AMOUNT_REGEX, NUMBER_REGEX } from '@utils/regexes';
import { $accountBalances, $balances } from '@store/balance';
import { $selectedAccount } from '@store/withdraw';
import { logline } from '@utils/debug';
import { Fund, isWallet } from '@constants/funds';

/** fetch token sale offers */

export const tokensGate = createGate();

export const $tokenSaleOffers = TokenSale.createStore<TokenSaleOffers[]>([]);

export const fetchTokenSaleOffersFx = TokenSale.createEffect<
  undefined,
  ResponseDone<TokenSaleOffers[]>
>();

/** currency to buy tokens */

export const $currency = TokenSale.createStore<keyof typeof Currencies>('USDT');
export const changeCurrency = TokenSale.createEvent<keyof typeof Currencies>();

/** current token sale offer */

export const $tokenId = TokenSale.createStore<number>(0);
export const setTokenId = TokenSale.createEvent<number>();

export const $currentToken = combine(
  $tokenId,
  $tokenSaleOffers,
  (tokenId, tokenSaleOffers) => tokenSaleOffers.find((o) => o.id === tokenId),
);

/** amount input to buy tokens */

export const $amount = TokenSale.createStore<string>('0');

export const $amountInFocus = TokenSale.createStore<boolean>(false);

export const focusAmount = TokenSale.createEvent<React.SyntheticEvent>();
export const blurAmount = TokenSale.createEvent<React.SyntheticEvent>();

export const onChangeAmount = TokenSale.createEvent<string>();
export const changeAmount = onChangeAmount.map(amountNormalizer);

/** cources with solar */
export const $usdCources = combine(
  $user,
  $sollarCourse,
  (user, sollarCourse) => ({
    usdt: 1,
    btc: user.course.bitcoin_usd,
    eth: user.course.ethereum_usd,
    sol: sollarCourse,
  }),
);

/** amount in tokens of offer */

export const $amountToGet = combine(
  $amount,
  $usdCources,
  $currency,
  $currentToken,
  (amount, usdCources, currency, currentToken) => {
    if (currentToken === undefined) return;

    const result = { amount: 0, fund: 'USDT' };
    result.amount = +(
      (Number(usdCources[currency.toLowerCase() as keyof typeof usdCources]) *
        Number(amount)) /
      currentToken.price
    ).toFixed(8);
    result.fund = currency;

    return result;
  },
);

export const $balanceByCurrency = combine(
  $accountBalances,
  $currency,
  $sollarBalance,
  (balances, currency, sollar) => {
    if (currency === Currencies.SOL) {
      return sollar;
    }
    return balances.find(
      (balance) =>
        balance?.fund &&
        isWallet(balance?.fund) &&
        balance?.coin.toLowerCase() === currency.toLowerCase(),
    )?.sum;
  },
);

export const $amountErrors = combine(
  {
    required: combine($amount, (amount: string) => {
      return amount.length === 0 || bn(amount).isLessThanOrEqualTo(0)
        ? 'TransferFromSaving:amountIsRequiredError'
        : null;
    }),
    invalid: $amount.map((amount) =>
      !AMOUNT_REGEX.test(amount) ? 'UIErrors:amountIsInvalidError' : null,
    ),
    minPrice: combine(
      $amount,
      $currency,
      $usdCources,
      $currentToken,
      (amount, currency, usdCources, currentToken) => {
        if (currentToken === undefined) return;

        const courseKey = currency.toLowerCase() as keyof typeof usdCources;
        return +amount < currentToken.price / +usdCources[courseKey]
          ? 'TokenSaleStore:minPrice'
          : null;
      },
    ),
    maxPrice: combine(
      $amount,
      $currency,
      $usdCources,
      $currentToken,
      (amount, currency, usdCources, currentToken) => {
        if (currentToken === undefined) return;

        const availableTokens = currentToken.totalSupply - currentToken.sold;

        const courseKey = currency.toLowerCase() as keyof typeof usdCources;
        const maxPrice =
          availableTokens * (currentToken.price / +usdCources[courseKey]);

        return +amount > maxPrice ? 'TokenSaleStore:maxPrice' : null;
      },
    ),
    notEnoughFunds: combine($balanceByCurrency, $amount, (sum, amount) =>
      bn(sum || '0').lt(amount) ? 'withdrawStore:notEnoughFundsError' : null,
    ),
  },

  ({ required, invalid, minPrice, maxPrice, notEnoughFunds }) =>
    [required, invalid, minPrice, maxPrice, notEnoughFunds].filter(Boolean),
);

export const $isFormValid = combine(
  [$amountErrors],
  (errors) => !errors.flat().length,
);

/** buy tokens  */

export const buyToken = TokenSale.createEvent<BuyTokenPayload>();
export const buyTokenFx = TokenSale.createEffect<
  BuyTokenPayload,
  ResponseDone<{ code: 'ok' }>
>();

export const successBuyToken = TokenSale.createEvent();

/** logs */

// buyTokenFx.fail.watch((res) => console.log(res));
// buyTokenFx.done.watch((res) => console.log(res));

// buyTokenFx.watch((res) => console.log(res));

$balanceByCurrency.watch((balancesByCurrency) =>
  logline('', { balancesByCurrency }),
);
