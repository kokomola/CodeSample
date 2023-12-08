import { endpoints } from '@constants/endpoints';
import { selectFund } from '@store/account/fund';
import {
  blurTokenSaleWalletScreen,
  focusTokenSaleWalletScreen,
} from '@store/app';
import { signedRequest } from '@utils/agent';
import { is } from '@utils/common/condition';
import * as D from 'date-fns';
import { guard } from 'effector';

import {
  $purchasedTokens,
  fetchPurchasedTokensFx,
  fetchPurchasedTokensOperationsFx,
  $purchasedTokensOperations,
  $isOwnedTokensLoaded,
  $sortedTokensOperations,
  $selectedTokenId,
  selectTokenId,
} from './index';
import { OwnedTokenOperation } from './types';

/** fetch bought tokens from token sale offer */

$purchasedTokens.on(
  fetchPurchasedTokensFx.doneData,
  (_, response) => response.data.tokens
);

fetchPurchasedTokensFx.use(async () => {
  const url = endpoints.tokenSale.purchasedTokens;
  return await signedRequest({ url });
});

$isOwnedTokensLoaded.on(fetchPurchasedTokensFx.done, () => true);

// get operations by token id

$selectedTokenId
  .on(selectTokenId, (_, tokenId) => tokenId)
  .on(selectFund, () => null);

guard({
  clock: focusTokenSaleWalletScreen,
  source: $selectedTokenId,
  filter: (tokenId) => is.exist(tokenId),
  target: fetchPurchasedTokensOperationsFx,
});

$purchasedTokensOperations.on(
  fetchPurchasedTokensOperationsFx.doneData,
  (_, response) => response.data.operations
);

fetchPurchasedTokensOperationsFx.use((id) => {
  const url = endpoints.tokenSale.getOwnTokenOperations(id);
  return signedRequest({ url });
});

$sortedTokensOperations.on(
  $purchasedTokensOperations.updates,
  (_, operations) => {
    const sortDesc = (a: OwnedTokenOperation, b: OwnedTokenOperation) =>
      D.compareDesc(a.createdAt, b.createdAt);
    return operations.sort(sortDesc);
  }
);

// deubg

//$selectedTokenId.watch(selectedTokenId => logline('[store/tokenSaleWallet]', { selectedTokenId }));
