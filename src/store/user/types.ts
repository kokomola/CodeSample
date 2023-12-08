/* eslint-disable camelcase */
export type Course = Record<string, string>;

export type NormalizedCourses = Record<
  'btc' | 'eth' | 'usdt',
  Record<'btc' | 'eth' | 'usdt', string>
>;

export type KYCStatus = {
  status: 'success' | 'failure' | 'pending' | null;
};

export type LoyaltyPrograms = {
  ambassador: {
    level: number;
    joined: boolean;
    status_date: string;
  };
  default: {
    level: number;
    joined: boolean;
    status_date: string;
  };
  sunrise: {
    level: number;
    joined: boolean;
    available: boolean;
    status_date: string;
  };
};

export type LoyaltyProgramsV2 = {
  ambassador: {
    can_request: boolean;
    level: number;
    joined: boolean;
    status_date: string;
  };
  default: {
    level: number;
    joined: boolean;
    status_date: string;
  };
  sunrise: {
    level: number;
    joined: boolean;
    available: boolean;
    status_date: string;
  };
};

export type Reinvestment = {
  partner: number;
  savings: {
    btc: number;
    eth: number;
    usdt: number;
  };
  stable: number;
};

export type TwoFaStatus = 'enabled' | 'disabled' | 'pending' | 'error' | null;
export type TwoFaType = 'google' | 'sms' | null;

export type Fee = {
  bitcoin: string;
  ethereum: string;
  usdt: string;
};

export type User = {
  email: string;
  name: string;
  email_is_verified: boolean;
  phone: string;
  phone_is_verified: boolean;
  is_verified: boolean;
  level: number;
  last_status_change: string;
  refferal: string;
  refferal_agree: boolean;
  ref_tour_passed: null | any;
  balance_tour_passed: boolean | any;
  bonus_status: string | null;
  in_bonus_action: null | any;
  last_status: string;
  is_google_enabled: boolean;
  is_ambassador: boolean;
  is_reinvest: boolean;
  reinvestment: {
    savings: {
      btc: number;
      eth: number;
      usdt: number;
    };
    stable: number;
    partner: number;
  };
  ambassador_level: number;
  disabled_refferal_lines: [] | any;
  twofa_type: TwoFaType;
  twofa_status: TwoFaStatus;
  twofa_error_reason: null | any;
  allow_show_contacts: boolean;
  shop_agree: boolean;
  sunrise_agree: boolean;
  ambassador_agree: boolean;
  role_id: null | number;
  parent_name: string;
  is_verifier: boolean;
  is_mailer: boolean;
  is_amir_cell_support: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
  is_support: boolean;
  course: Course;
  fee: Fee;
  showKycBanner: boolean;
  kycStatus: KYCStatus;
  role: null | any;
  loyalty_programs: LoyaltyPrograms;
  withdraw_limits: {
    remnant: number;
    limitUSDT: number;
  };
};

export type User2 = {
  allow_show_contacts: boolean;
  ambassador_agree: boolean;
  ambassador_level: number;
  bonus_status: string | null;
  disabled_refferal_lines: [] | any;
  email: string;
  email_is_verified: boolean;
  in_bonus_action: boolean | null;
  is_admin: boolean;
  is_ambassador: boolean;
  is_amir_cell_support: boolean;
  is_google_enabled: boolean;
  is_mailer: boolean;
  is_reinvest: boolean;
  is_super_admin: boolean;
  is_support: boolean;
  is_verified: boolean;
  is_verifier: boolean;
  last_status: string;
  last_status_change: string;
  level: number;
  loyalty_programs: LoyaltyProgramsV2;
  name: string;
  parent_name: string;
  phone: string;
  phone_is_verified: boolean;
  refferal: string;
  refferal_agree: boolean;
  reinvestment: Reinvestment;
  role: any | null;
  role_id: any | null;
  shop_agree: boolean;
  sunrise_agree: boolean;
  twofa_error_reason: any | null;
  twofa_status: TwoFaStatus;
  twofa_type: TwoFaType;

  permissions: {
    withdraw_savings: boolean;
  };
  // removed from old request

  // balance_tour_passed: boolean | null;
  // course: Course;
  // fee: Fee;
  // kycStatus: KYCStatus;
  // showKycBanner: boolean;
  // ref_tour_passed: boolean | null;
};
