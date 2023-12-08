import { $promotionConfig } from "@store/stables/promotion";;
import { useStoreMap } from "effector-react";

export const usePromo = (promo = '') => {
	return useStoreMap({
		//store: $walletsAndSavings,
		store: $promotionConfig,
		keys: [promo],
		fn: (cnfgs, [promo]) => cnfgs.find(cnfg => promo && cnfg.name === promo)
	})
};
/* export const useWalletByFund = (keys: WalletFund[]) => {}; */