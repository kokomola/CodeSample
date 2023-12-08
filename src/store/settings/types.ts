export type ResponseSettings = {
  autoEnabled: boolean;
  maxWithdrawal: string;
  maxUnverifiedWithdrawal: string;
  minTransfer: string;
  minWithdrawal: string;
  solar_course: string;
  solar_max_failed_attempts: number;
  solar_multiplier_own: number;
  solar_multiplier_referral: number;
  transferComissionRate: number;
  transfersDisabled: boolean;
  interest_accrual_on_btc_wallet: string;
  interest_accrual_on_eth_wallet: string;
  interest_accrual_on_usdt_wallet: string;
};

export type Settings = {
  sollarCourse: string;
  transferComissionRate: number;
};

export type PromotionConfig = {
  name: string;
  title: string;
  userReinvest: boolean;
  manual_closing: boolean;
  money_after_closing: string;
  partnerIncome_fund_prefix: string;
  userIncome_fund_prefix: string;
};
