import { AppDomain } from "@store/app";

export const setTimeoutFx = AppDomain.createEffect<{ time?: number, fn: () => void }, void>()