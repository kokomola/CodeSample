export type ReferralData = {
  code: string;
  refferal_link: string;
  refferals: {
    level: number;
    count: string;
  }[];
  refferalsMoney: {
    root_id: number;
    level: number;
    fund: string;
    sum: string;
  }[];
  commisionsMoney: {
    fund: string;
    date: string;
    type: string;
    sum: string;
  }[];
};

export type AddReferralPayload = {
  email: string;
  name: string;
};
