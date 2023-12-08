export enum SecurityStage {
  Validation = 'validation',
  TwoFa = '2fa',
  GlobalPass = 'globalPass',
}

export enum SecurityOperation {
  None = 'None',
  Withdraw2fa = 'withdraw_2fa',
  WithdrawFaceCheck = 'withdraw_face',
}

export type ValidationStage = 'validation';
export type TwoFaStage = 'twofa';
export type KYCStage = 'kyc';
export type Stage = ValidationStage | TwoFaStage | KYCStage;

export type ActionId = number;
export type ApplicantActionId = string;
export type Token = {
  token: string;
  userId: string;
  externalActionId: string;
};

export enum AvailableVerifyActionTypes {
  withdraw = 'withdraw',
  ptop = 'p2p_exchange',
}

export type ValidationStageResponse = {
  code: 'ok';
  actionId: ActionId;
  nextStage: TwoFaStage;
};
