import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { TokenSaleOffers } from '@store/tokenSale/type';

export type ParticipantsProps = {
  availableUserAmbassadorLevel: TokenSaleOffers['availableUserAmbassadorLevel'];
  availableUserSunriseStatus: TokenSaleOffers['availableUserSunriseStatus'];
  tokenId: number;
  navigation: StackNavigationProp<ParamListBase, string>;
};
