import { TokenSaleOffers } from '@store/tokenSale/type';

export type TokenSaleForSOLProps = {
  availablePayments: TokenSaleOffers['availablePayments'];
  tokenId: TokenSaleOffers['id'];
};
