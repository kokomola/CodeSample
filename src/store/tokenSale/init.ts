import { forward, guard } from 'effector';

import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';

import {
  $amount,
  $currency,
  $tokenSaleOffers,
  fetchTokenSaleOffersFx,
  tokensGate,
  changeAmount,
  $amountInFocus,
  focusAmount,
  blurAmount,
  buyToken,
  buyTokenFx,
  successBuyToken,
  $tokenId,
  setTokenId,
  changeCurrency,
  $currentToken,
} from './index';

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

import { blurTokenSaleBuyScreen } from '@store/app';
import { fetchPurchasedTokensFx } from '@store/tokenSaleWallet';
import { fetchSollar } from '@store/sollars';
import { routes } from 'src/navigator/routes';
import { log } from '@utils/debug';

forward({
  from: tokensGate.open,
  to: fetchTokenSaleOffersFx,
});

/** fetch token sale offers */

$tokenSaleOffers.on(
  fetchTokenSaleOffersFx.doneData,
  (_, response) => response.data.tokens
);

fetchTokenSaleOffersFx.use(async () => {
  const method = 'get';
  const url = endpoints.tokenSale.token;

  return await signedRequest({ method, url });
});

/** currency to buy tokens */

$currency
  .on(changeCurrency, (_, currency) => currency)
  .reset(blurTokenSaleBuyScreen);

/** current token */

$tokenId.on(setTokenId, (_, payload) => payload);

/** amount input to buy tokens */

$amount.on(changeAmount, (_, amount) => amount).reset(blurTokenSaleBuyScreen);
$amount.on(focusAmount, () => '');
$amount.reset(successBuyToken);

$amountInFocus
  .on(focusAmount, () => true)
  .reset(blurAmount, blurTokenSaleBuyScreen);

/** buy tokens from token sale offer */

forward({
  from: buyToken,
  to: buyTokenFx,
});

buyTokenFx.use(async ({ id, amount, fund }) => {
  const method = 'post';
  const body = { amount, fund: fund.toLowerCase() };

  const url = endpoints.tokenSale.tokenBuy(id);

  return await signedRequest({ method, url, body });
});

/** set token buy verification */

forward({
  from: buyTokenFx.done,
  to: openVerifyBottomSheet,
});

forward({
  from: buyToken,
  to: [
    initVerifyBottomSheet,
    changeVerifyEndpoint.prepend(({ id }) =>
      endpoints.tokenSale.tokenBuyVerify(id)
    ),
    changeVerifyRequestDomain.prepend(() => 'TokenSale'),
    changeVerifyRedirectScreen.prepend(() => routes.tabs.AmirInvest),
  ],
});

guard({
  clock: successVerifyCode,
  source: $verifyEndpoint,
  filter: (endpoint) => {
    const regex = /^(?=.*tokens)(?=.*buy)(?=.*verify).*$/m;
    return regex.test(endpoint);
  },
  target: successBuyToken,
});

forward({
  from: successBuyToken,
  to: [fetchPurchasedTokensFx, fetchSollar],
});

forward({
  from: blurTokenSaleBuyScreen,
  to: resetVerifyCode,
});

//$currentToken.watch((currentToken) => log('tokenSale', { currentToken }));
