import { AccountDomain } from "@store/app";
import { AxiosResponse } from "axios";

export const askDelete = AccountDomain.createEvent();

export const deleteAccount = AccountDomain.createEvent();

export const deleteAccountFx = AccountDomain.createEffect();
