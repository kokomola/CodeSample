export type Request = {
  id: number;
  spent_fund: 'usdt_wallet' | 'eth_wallet' | 'btc_wallet';
  transaction_type: 'withdraw' | 'transfer' | 'p2ptransfer';
  spent_amount: string;
};

export type RequestHistoryRowProps = {
  request: Request;
  loading?: boolean;
};
