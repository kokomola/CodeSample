import { TokenSaleOffers } from '@store/tokenSale/type';

export type TokenSaleAvailablePaymentsProps = {
  availablePayments: TokenSaleOffers['availablePayments'];
  tokenId: TokenSaleOffers['id'];
};
