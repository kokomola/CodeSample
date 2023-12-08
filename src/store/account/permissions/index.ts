import { $userV2 } from "@store/user";

export const $accountPermissions = $userV2.map(user => user.permissions);

export const $isBlockedSavingAccount = $accountPermissions.map(permissions => !permissions.withdraw_savings);