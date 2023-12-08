/* eslint-disable camelcase */
export type UserProgram = {
  programType: 'ambassador' | 'sunrise' | 'default';
  level: number;
  status_date: string;
  joined: boolean;
  // only for sunrise program
  available?: boolean;
  // only for ambassador
};

export type GetUserProgram = {
  programType: 'ambassador' | 'sunrise' | 'default';
  level: number;
  status_date: string;
  joined: boolean;
  name: string;
  icon: string | null;
  // only for sunrise program
  available?: boolean;
  // only for ambassador
  can_request?: boolean;
  status: string;
};

export type CumulativeDiscounts = {
  account_id: number;
  amount: string;
  product: 'Amir Smart' | 'Amir Guard' | 'Amir Travel';
}[];

export type SunriseUserData = {
  activity_stats: {
    activity_progress: number;

    partnerIncrease: {
      current: {
        kyc: number;
        light: number;
        ray: number;
        shine: number;
        spark: number;
        sun: number;
      };
      max: {
        light: number;
        ray: number;
        shine: number;
        spark: number;
        sun: number;
      };
      received: number;
    };

    solar_condition: number;

    structureIncrease: {
      current: {
        btc: string;
        eth: string;
        usdt: string;
      };
      max: {
        btc: string;
        eth: string;
        usdt: string;
      };
      received: {
        usdt: string;
        btc: string;
        eth: string;
      };
    };

    total_received: string;
  };
  deposit_structure: string;
  partner_structure: string;
  previous_month_income: {
    usdt: string;
    solar: string;
  };
  partners_length: string;
};

export type GetPartnerProgram = {
  icon: string | null;
  name: string;
};
