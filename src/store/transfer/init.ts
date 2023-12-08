import {
  $availableTransfers,
  $selectedTokenSaleId,
  redirectToTransferMenuFx,
  updateAvailableTransfers,
  updateSelectedTokenSaleId,
  resetTransfer,
  $selectorFundCoins,
  changeIdx,
  $idx,
} from './index';
import * as RootNavigation from '../../navigator/RootNavigation';
import { routes } from 'src/navigator/routes';
import { sample, split } from 'effector';

import { $fund, selectFundAndCoin } from '@store/account/fund';
import { selectCoin } from '@store/coin-network';
import { SELECTOR_INDEXES } from './types';
import {
  focusTransferByEmailScreen,
  focusTransferByPhoneScreen,
} from '@store/app';
import { changeVerifyRedirectScreen } from '@store/verify';
import { isSavings, isWallet } from '@constants/funds';

$selectedTokenSaleId
  .on(updateSelectedTokenSaleId, (_, id) => id)
  .reset(resetTransfer);

$availableTransfers
  .on(updateAvailableTransfers, (_, payload) => payload)
  .reset(resetTransfer);

redirectToTransferMenuFx.use(() => {
  RootNavigation.resetRoot(routes.transfers.TransferMenu);
});

//account selector
$idx
  .on(changeIdx, (_, idx) => idx)
  .on(selectCoin, (_, coin) =>
    SELECTOR_INDEXES.findIndex((selector) => selector === coin)
  );

sample({
  clock: changeIdx,
  source: $selectorFundCoins,
  fn: (selectors, idx) => ({
    fund: selectors[idx]?.fund,
    coin: selectors[idx]?.coin,
  }),
  target: selectFundAndCoin,
});

split({
  source: sample({
    clock: [focusTransferByEmailScreen, focusTransferByPhoneScreen],
    source: $fund,
  }),
  match: {
    wallet: (fund) => !!fund && isWallet(fund),
    savings: (fund) => !!fund && isSavings(fund),
  },
  cases: {
    wallet: changeVerifyRedirectScreen.prepend(
      () => routes.amirWallet.CryptoWallet
    ),
    savings: changeVerifyRedirectScreen.prepend(
      () => routes.amirFinance.Saving
    ),
    __: changeVerifyRedirectScreen.prepend(
      () => routes.tokenSaleNav.TokenSaleWallet
    ),
  },
});

/* $selectedTokenSaleId.watch((selectedTokenSaleId) =>
  logline('[store/transfer]', { selectedTokenSaleId })
);
$selectorCoins.watch((selectorCoins) =>
  log('[store/transfer]', { selectorCoins })
);
 */
