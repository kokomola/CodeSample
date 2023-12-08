import { TokenSaleOffers } from '@store/tokenSale/type';

export type TokenSalePublishedProps = {
  isPublished: TokenSaleOffers['isPublished'];
  tokenId: TokenSaleOffers['id'];
};
