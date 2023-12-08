import { initAndOpenBSFx } from "@store/bottomSheetCommon";
import { forward } from "effector";
import { showSavingsAccountAlert } from "./index";

forward({
	from: showSavingsAccountAlert,
	to: initAndOpenBSFx.prepend(() => ({
		fcKey: 'SavingAccountAlert',
		height: 240,
	}))
})