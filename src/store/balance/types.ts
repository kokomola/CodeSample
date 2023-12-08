import { Fund } from "@constants/funds";
import { Coin } from "@store/coin-network/types";
import { bn } from "@utils/numbers/bn";
import BigNumber from "bignumber.js"

export const FUND_BALANCES: Balance[] = [
	{ id: 0, sum: bn(0), fund: Fund.BtcWallet, coin: Coin.BTC },
	{ id: 1, sum: bn(0), fund: Fund.EthWallet, coin: Coin.ETH },
	{ id: 2, sum: bn(0), fund: Fund.UsdtWallet, coin: Coin.USDT },
	{ id: 3, sum: bn(0), fund: Fund.BtcSaving, coin: Coin.BTC },
	{ id: 4, sum: bn(0), fund: Fund.EthSaving, coin: Coin.ETH },
	{ id: 5, sum: bn(0), fund: Fund.UsdtSaving, coin: Coin.USDT },
]

export type Balance = {
	id: number,
	sum: BigNumber,
	fund?: Fund;
	coin: Coin;
	token?: string;
};

