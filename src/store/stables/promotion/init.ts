import { endpoints } from "@constants/endpoints";
import { focusAmirFinanceScreen } from "@store/app";
import { signedRequest } from "@utils/agent";
import { log, logline } from "@utils/debug";
import { forward } from "effector";
import { $promotionConfig, fetchPromotionConfigRequestFx } from "./index";

$promotionConfig.on(fetchPromotionConfigRequestFx.doneData, (_, response) => response?.data?.data);

fetchPromotionConfigRequestFx.use(() => {
	const url = endpoints.settings.fetchPromotion;

	return signedRequest({ url });
});

forward({
	from: focusAmirFinanceScreen,
	to: [fetchPromotionConfigRequestFx],
});

//$promotionConfig.watch(promotionConfig => log('', { promotionConfig }))