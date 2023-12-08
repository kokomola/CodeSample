import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TokenSaleOffers } from '@store/tokenSale/type';

export interface TokenSaleBuyProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: { params: { id: number } };
}

export type TotalAmountInputProps = {
  code: TokenSaleOffers['code'];
  price: TokenSaleOffers['price'];
};

export type AvailabilityBoxProps = {
  totalSupply: TokenSaleOffers['totalSupply'];
  sold: TokenSaleOffers['sold'];
  code: TokenSaleOffers['code'];
};
