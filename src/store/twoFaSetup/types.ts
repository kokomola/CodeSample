export type LaunchFaceAuthSDKResp = any;

export type Step =
  | 'requires_kyc'
  | 'init_enable'
  | 'google_qr'
  | 'google_code'
  | 'sms_phone'
  | 'sms_code';

export type SNSToken = {
  externalActionId: string;
  token: string;
  userId: string;
};

export type EnableGoogle2faResponse = {
  qrCode: string; // base64
  secret: string;
  token: SNSToken;
};

export type EnableSms2faResponse = {
  token: SNSToken;
};

export enum TwoFaType {
  Google = 'google',
  Sms = 'sms',
}
