const availableUserSunriseStatus = [
  'zero',
  'bronze',
  'silver',
  'gold',
  'platinum',
  'brilliant',
] as const;

export type AvailableUserSunriseStatus = typeof availableUserSunriseStatus[number];

const availableUserAmbassadorLevel = [100, 200, 300, 400, 500] as const;

export type AvailableUserAmbassadorLevel = typeof availableUserAmbassadorLevel[number];

export type TokenSaleOffers = {
  availablePayments: string[];
  availableUserAmbassadorLevel: AvailableUserAmbassadorLevel[];
  availableUserSunriseStatus: AvailableUserSunriseStatus[];
  code: string;
  createdAt: string;
  description: string;

  earned_sol: number;
  earned_usdt: number;
  endAt: string;
  id: number;
  image: string; //url;

  isBuyable: boolean;
  meta: {
    availableOperations: string[];
    fee: number;
    noFeeTreshold: number;
  };
  isOwner: boolean;
  isPublished: boolean;
  ownerId: number;
  percent_sold: number;
  price: number;

  sold: number;
  startAt: string;
  title: string; //name;
  totalSupply: number;
  updatedAt: string;
};

export type ResponseDone<T = any> = {
  code?: 'ok' | 'error';
  data: {
    tokens: T;
  };
};

export type AmountToGet = { amount: number; isPaySol: boolean };

export enum Currencies {
  USDT = 'USDT',
  SOL = 'SOL',
  BTC = 'BTC',
  ETH = 'ETH',
  SGC = 'SGC',
}

export type BuyTokenPayload = {
  id: number;
  amount: number;
  fund: keyof typeof Currencies;
};
