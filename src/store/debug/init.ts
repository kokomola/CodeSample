import { $chosendAccount, $fund } from '@store/account/fund';
import { $selectedCoin, $selectedNetwork } from '@store/coin-network';
import { $selectedToken, $selectedTokenId } from '@store/tokenSaleWallet';
import { log } from '@utils/debug';
import { combine } from 'effector';

combine(
  $selectedCoin,
  $selectedNetwork,
  $fund,
  $selectedTokenId,
  $chosendAccount,
  (coin, network, fund, tokenId, $chosendAccount) =>
    log('$[$store/debug] selected', {
      coin,
      network,
      fund,
      tokenId,
      $chosendAccount,
    })
);

//$selectedToken.watch((selectedToken) => log('$debug', { selectedToken }));
