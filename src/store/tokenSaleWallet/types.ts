import {
  AvailableUserAmbassadorLevel,
  AvailableUserSunriseStatus,
} from '@store/tokenSale/type';

export type OwnedTokens = {
  balance: number;
  token: {
    id: number;
    title: string;
    description: string;
    image: string;
    code: string;
    startAt: string;
    endAt: string;
    totalSupply: number;
    isPublished: boolean;
    price: number;
    ownerId: number;
    availablePaySol: boolean;
    availableUserSunriseStatus: AvailableUserSunriseStatus[];
    availableUserAmbassadorLevel: AvailableUserAmbassadorLevel[];
    createdAt: string;
    updatedAt: string;
  };
};


export type OwnedTokenOperation = {
  accountId: number;
  amount: number;
  createdAt: string;
  id: number;
  isHold: boolean;
  meta: {
    isPaySol: boolean;
    toEmail?: string;
    fromEmail?: string;
    message?: string;
  };
  tokenId: number;
  type: 'buy';
  updatedAt: string;
};

export type ResponseDoneTokens<T = any> = {
  code?: 'ok' | 'error';
  data: {
    tokens: T;
  };
};

export type ResponseDoneOperations<T = any> = {
  code?: 'ok' | 'error';
  data: {
    operations: T;
  };
};
