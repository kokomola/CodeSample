import { TokenSaleOffers } from '@store/tokenSale/type';

// base of update token payload

interface BaseUpdatePayload {
  id: TokenSaleOffers['id'];
}

// update token payload variants

interface UpdatePrice extends BaseUpdatePayload {
  body: { price: TokenSaleOffers['price'] };
}

interface UpdateParticipants extends BaseUpdatePayload {
  body: {
    availableUserSunriseStatus: TokenSaleOffers['availableUserSunriseStatus'];
    availableUserAmbassadorLevel: TokenSaleOffers['availableUserAmbassadorLevel'];
  };
}

interface UpdateIsPublished extends BaseUpdatePayload {
  body: { isPublished: TokenSaleOffers['isPublished'] };
}

interface UpdateAvailablePayments extends BaseUpdatePayload {
  body: { availablePayments: TokenSaleOffers['availablePayments'] };
}

export type UpdateTokenPayload =
  | UpdatePrice
  | UpdateParticipants
  | UpdateIsPublished
  | UpdateAvailablePayments;
