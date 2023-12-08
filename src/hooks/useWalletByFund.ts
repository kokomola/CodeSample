import { $walletsAndSavings } from "@store/wallets";
import { Fund } from "@store/wallets/types";
import { useStoreMap } from "effector-react";

export const useWalletByFund = (fund: Fund) => {
	return useStoreMap({
		store: $walletsAndSavings,
		keys: [fund],
		fn: (wallets, [key]) => wallets.find(wallet => wallet.fund === key)
	})
};
/* export const useWalletByFund = (keys: WalletFund[]) => {}; */