import { forward } from "effector";

import { initAndOpenBSFx } from "@store/bottomSheetCommon";
import { showRequestInfo } from "./index";

forward({
	from: showRequestInfo,
	to: initAndOpenBSFx.prepend(() => ({
		fcKey: 'RequestDetails',
		height: 380,
	}))
});