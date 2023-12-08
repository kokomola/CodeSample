import { forward, guard, sample } from 'effector';

import {
  $price,
  $priceInFocus,
  changePrice,
  focusPrice,
  updateToken,
  updateTokenFx,
  blurPrice,
  successUpdateTokenOffer,
} from './index';

import { $tokenSaleOffers, fetchTokenSaleOffersFx } from '@store/tokenSale';

import {
  $verifyEndpoint,
  changeVerifyEndpoint,
  changeVerifyMethod,
  changeVerifyRedirectScreen,
  changeVerifyRequestDomain,
  initVerifyBottomSheet,
  openVerifyBottomSheet,
  successVerifyCode,
} from '@store/verify';

import { signedRequest } from '@utils/agent';
import { TokenSaleOffers } from '@store/tokenSale/type';
import { endpoints } from '@constants/endpoints';
import { fetchPurchasedTokensFx } from '@store/tokenSaleWallet';
import { UpdateTokenPayload } from './types';

/** helpers */

const getTokenCurrentValues = (
  tokenSaleOffers: TokenSaleOffers[],
  id: TokenSaleOffers['id']
) => {
  const token = tokenSaleOffers.find((o) => o.id === id);
  return token;
};

/** price input */

$price.on(changePrice, (_, price) => price);
$price.on(focusPrice, () => '');

$priceInFocus.on(focusPrice, () => true).reset(blurPrice);

/** update token sale offer  */

sample({
  source: $tokenSaleOffers,
  clock: updateToken,
  fn: (tokenSaleOffers, { id, body: newTokenValues }): UpdateTokenPayload => {
    const currentTokenValues = getTokenCurrentValues(tokenSaleOffers, id)!;

    return { id, body: { ...currentTokenValues, ...newTokenValues } };
  },
  target: updateTokenFx,
});

updateTokenFx.use(async ({ id, body }) => {
  const method = 'patch';
  const url = endpoints.tokenSale.patchTokenSaleOffer(id);

  return await signedRequest({ method, url, body });
});

/** set update token verification */

forward({
  from: updateTokenFx.done,
  to: openVerifyBottomSheet,
});

forward({
  from: updateToken,
  to: [
    initVerifyBottomSheet,
    changeVerifyMethod.prepend(() => 'patch'),
    changeVerifyEndpoint.prepend(({ id }) =>
      endpoints.tokenSale.patchTokenSaleOfferVerify(id)
    ),
    changeVerifyRequestDomain.prepend(() => 'TokenSaleEdit'),
    changeVerifyRedirectScreen.prepend(() => 'goBack'),
  ],
});

guard({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  filter: (endpoint) => {
    const regex = /^(?=.*token_sale)(?=.*tokens)(?=.*verify).*$/m;
    return regex.test(endpoint);
  },
  target: successUpdateTokenOffer,
});

forward({
  from: successUpdateTokenOffer,
  to: [fetchPurchasedTokensFx, fetchTokenSaleOffersFx],
});
