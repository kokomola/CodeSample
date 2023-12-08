import { getAccount } from '@constants/funds';
import { selectTokenId } from '@store/tokenSaleWallet';
import { selectFund, $fund, $chosendAccount, selectFundAndCoin } from './index';

$fund
  .on(selectFund, (_, fund) => fund)
  .on(selectFundAndCoin, (_, selector) => selector?.fund)
  .on(selectTokenId, () => null);

$chosendAccount.on(selectFund, (_, fund) => fund && getAccount(fund));
