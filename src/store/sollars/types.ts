export type Sollar = {
  amountRealSolars: number;
  potentialSolars: number;
  solarHistory: any[];
  solarIncomes: SollarIncome[];
};

export type SollarIncome = {
  id: string;
  account_id: string;
  amount: number;
  //type: 'buy' | 'order_decrease' | 'sollar_gift' | ''
  type: string;
  meta: {
    course: number;
    income_id: string;
  };
  order_id: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SollarStore = {
  amount: number;
};

export type CanBuyAmound = {
  sollarCourse: string;
  amount: string;
  usdtBalance: string;
};
