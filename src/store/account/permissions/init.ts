import { log, logline } from "@utils/debug";
import { combine } from "effector";
import { $isBlockedSavingAccount, $accountPermissions } from "./index";


// debug

//$accountPermissions.watch(restrictions => logline('$store/resctiction', { restrictions }));
//combine($isBlockedSavingAccount, (isBlocked) => log('****$store/restirction', { isBlocked }));