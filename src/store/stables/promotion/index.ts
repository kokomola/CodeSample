import { AppDomain } from "@store/app";
import { PromotionConfig } from "@store/settings/types";
import { AxiosResponse } from "axios";
export const $promotionConfig = AppDomain.createStore<PromotionConfig[]>([]);

export const fetchPromotionConfigRequestFx = AppDomain.createEffect<void, AxiosResponse<{ data: PromotionConfig[] }>>();