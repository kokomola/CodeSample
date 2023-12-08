import { combine } from 'effector';

import { TokenSale } from '@store/app';

import { amountNormalizer } from '@utils/numbers/amountNormalizer';
import { bn } from '@utils/numbers/bn';

import { UpdateTokenPayload } from './types';

/** price input */

export const $price = TokenSale.createStore<string>('0');

export const $priceInFocus = TokenSale.createStore<boolean>(false);

export const focusPrice = TokenSale.createEvent<React.SyntheticEvent>();
export const blurPrice = TokenSale.createEvent<React.SyntheticEvent>();

export const onChangePrice = TokenSale.createEvent<string>();
export const changePrice = onChangePrice.map(amountNormalizer);

export const $priceErrors = combine(
  {
    required: combine($price, (amount: string) => {
      return amount.length === 0 || bn(amount).isLessThanOrEqualTo(0)
        ? 'TransferFromSaving:amountIsRequiredError'
        : null;
    }),
    decimals: combine($price, (price: string) => {
      return [...price].filter((char) => char === '.').length > 1
        ? 'TokenSaleStore:invalidDecimal'
        : null;
    }),
  },

  ({ required, decimals }) => [required, decimals].filter(Boolean)
);

export const $isFormValid = combine(
  [$priceErrors],
  (errors) => !errors.flat().length
);

/** update token sale offer */

export const updateToken = TokenSale.createEvent<UpdateTokenPayload>();
export const updateTokenFx = TokenSale.createEffect<
  UpdateTokenPayload,
  { code: 'ok' }
>();

export const successUpdateTokenOffer = TokenSale.createEvent();
