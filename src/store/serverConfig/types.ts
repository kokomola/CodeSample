/* eslint-disable camelcase */
export type ServerConfig = {
  btc_fee_deactivation_threshold: string;
  btc_sender_minimum: string;
  createdAt: string;
  eth_fee_deactivation_threshold: string;
  eth_sender_minimum: string;
  id: number;
  notify_admin_id: number | null;
  sms_service_global_override: string;
  sunnybook_id: null | number;
  updatedAt: string;
  usdt_erc20_fee_deactivation_threshold: string;
  usdt_erc20_sender_minimum: string;
  usdt_trc20_fee_deactivation_threshold: string;
  usdt_trc20_sender_minimum: string;

  usdt_omni_sender_minimum: string;
  usdt_omni_fee_deactivation_threshold: string;
  usdt_trc_20_fee: string;
  btc_withdraw_limit: string;
  eth_withdraw_limit: string;
  usdt_withdraw_limit: string;
  allowed_email_changing: string;
  allowed_phone_changing: string;
};

export type FetchServerConfigDone = ServerConfig;
