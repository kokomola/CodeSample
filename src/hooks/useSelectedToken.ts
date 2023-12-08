import { $purchasedTokens, $selectedTokenId } from '@store/tokenSaleWallet';
import { useStore, useStoreMap } from 'effector-react';

export const useToken = () => {
  const tokenId = useStore($selectedTokenId);
  if (!tokenId) return null;
  const foundToken = useStoreMap({
    store: $purchasedTokens,
    keys: [tokenId],
    fn: (purchasedTokens, [key]) =>
      purchasedTokens.find(({ token }) => token.id === key),
  });
  return foundToken;
};
