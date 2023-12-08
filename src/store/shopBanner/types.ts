import { AxiosResponse } from 'axios';

export type Banner = {
  url: string;
  desktop_image: string;
  mobile_image: string;
};

export type BannersObj = Record<string, Banner> | null;

export type BannersArray = Banner[];

export type FetchBannersFxParams = void;
export type FetchBannersFxDone = AxiosResponse<{
  code: 'ok';
  data: BannersObj;
}>;
