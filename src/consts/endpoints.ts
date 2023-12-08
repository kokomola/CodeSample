import { Fund } from '@constants/funds';

export const MAX_LIMIT_ROWS = 10000;

interface IParams {
  limit: number;
  offset: number;
  page: number;
}

export type Params = Partial<IParams>;

export const endpoints /* : TMethods */ = {
  app: {
    /** get -> '/api/v1/server/config' */
    fetchServerConfig: `/api/v1/server/config`,
  },
  referral: {
    getName: (id: string) => `/refferal_name?refferal=${id}`,
  },
  settings: {
    fetchAll: 'settings?type=all',
    fetchDefault: '/settings',
    fetchPromotion: '/settings?type=promotionCfg',
  },
  sollar: {
    buy: '/account/solars/buy',
    verify: '/account/solars/verify',
    fetchSollars: '/account/v2/solars',
    fetchOffsetSollars: ({ limit = 10, offset = 1 }: Params): string =>
      `/account/v2/solars?limit=${limit}&offset=${offset}`,
  },
  twoFa: {
    /** post -> '/account/2fa/enable' */
    enable: '/account/2fa/enable',
    /** post -> '/account/2fa/enable_verify' */
    enableVerify: '/account/2fa/enable_verify',
    /** post -> '/account/2fa/disable' */
    disable: '/account/2fa/disable',
  },
  stable: {
    fetch: '/account/new_stable',
    legacyFetch: '/account/stable/me',
    create: '/account/new_stable/create',
    verify: '/account/new_stable/create/verify',
    close: '/account/new_stable/refund',
    verifyClose: '/account/new_stable/refund/verify',
    rename: '/account/new_stable/title',
    fetchRates: '/settings?type=mapInterestRatesWithoutCapitalization',
    fetchRatesWithCap: '/settings?type=mapInterestRatesCapitalization',
  },
  transfer: {
    do: '/account/transfer',
    verify: '/account/transfer/verify',
    byP2P: '/account/p2ptransfer',
    byP2PVerify: '/account/p2ptransfer_verify',
    cancel: (id: number): string => `/account/transfer/${id}/cancel`,
  },
  withdraw: {
    /** get -> '/tx_fees/{btc || eth || trc || ...}' */
    fees: (coin: string): string => `/tx_fees/${coin}`,
    feesAll: (): string => '/tx_fees/all',
    verify: '/account/withdraw_verify',
  },
  account: {
    login: '/account/login',
    changePassword: '/account/change_password',
    changeEmail: '/account/change_email',
    delete: '/account/delete/current',
    getKycToken: '/account/kyc_token',
    loginPinCode: '/account/pin_code_login',
    registerDevice: '/account/acquire_device_token',
    register: '/account/register',
    reinvest: '/account/reinvest',
    setupPin: '/account/pin_code',
    //fetchWallets: '/account/me/wallets_accounts',
    me: '/account/me',
    fetchWallets: '/account/v2/me/wallets',
    fetchMe: '/account/v2/me',
    subscribeForGetMessage: '/account/fcm/subscribe',
    unsubscribeForGetMessage: '/account/fcm/unsubscribe',
    fetchRequests: '/account/v2/me/requests',
    getLimitPerDay: '/account/v2/withdraw_limits',
    courses: '/account/courses',
    //fetchOperations: (fund: Funds) => `account/v2/me/operations?fund=${fund}`,
    fetchOperations: ({
      fund,
      limit = 100,
      offset = 0,
    }: { fund: Fund } & Params): string =>
      `/account/v2/me/operations?fund=${fund}&limit=${limit}&offset=${offset}`,
  },
  kyc: {
    /** get -> 'security-service/api/v1/kyc/screening-token', { header: token } */
    getScreeningToken: '/security-service/api/v1/kyc/screening-token',
    /** get -> 'security-service/api/v1/kyc/screening-status', { header: token } */
    getScreeningStatus: '/security-service/api/v1/kyc/initial-screening-status',
  },
  shop: {
    products: '/shop/product',
    brands: '/shop/brands',
    /* post -> '/shop/product/shop_agree', { header: token, body: { shop_agree } } */
    agreeTerms: '/shop/product/shop_agree',
    categories: '/shop/categories',
    ordersHistory: '/v2/shop/order',
    bookmarks: '/v2/shop/bookmarks',
    addBookmark: '/v2/shop/bookmarks/add',
    removeBookmark: '/v2/shop/bookmarks/remove',
    createOrder: '/v2/shop/order',
    basket: '/v2/shop/basket',
    basketAdd: '/v2/shop/basket/add',
    basketRemove: '/v2/shop/basket/remove',
    basketRemoveAll: '/v2/shop/basket/remove/all',
    basketQuantity: '/v2/shop/basket/quantity',
    banners: '/v1/shop/banner',
  },
  sunrise: {
    cumulativeDiscount: '/account/cumulative_discount/balance',
    sunriseUserInfo: '/account/loyalty_programs/sunrise/info',
    partnerTree: '/account/loyalty_programs/sunrise/tree',
    agreeSunrise: '/account/loyalty_programs/sunrise/sunrise_agree',
    joinSunrise: '/account/loyalty_programs/sunrise/join',
    agreeAmbassador: '/account/loyalty_programs/sunrise/ambassador_agree',
    referralData: '/account/refferal',
    addReferralByEmail: '/account/add_refferal_email',
    fetchTreeToDate: (to: number): string =>
      `/account/loyalty_programs/sunrise/tree?to=${to}`,
    allowShowContacts: '/account/loyalty_programs/allow_show_contacts',
    fetchDiscountHistory: '/account/cumulative_discount/log',
    fetchDynamicStructureByLevel: (
      from: number,
      to: number,
      level: number
    ): string =>
      `/account/loyalty_programs/sunrise/structure_dynamics?from=${from}&to=${to}&level=${level}`,
  },
  securityService: {
    /** post -> 'security-service/api/v1/verify',{ body: { type, data }}, { header: token } */
    verify: '/security-service/api/v1/verify',
  },
  tokenSale: {
    token: '/token_sale/tokens',
    tokenBuy: (id: number): string => `/token_sale/tokens/${id}/buy`,
    tokenBuyVerify: (id: number): string =>
      `/token_sale/tokens/${id}/buy/verify`,
    purchasedTokens: '/token_sale/own/tokens',
    getOwnTokenOperations: (id: number): string =>
      `/token_sale/own/tokens/${id}/operations`,
    patchTokenSaleOffer: (id: number): string => `/token_sale/tokens/${id}`,
    patchTokenSaleOfferVerify: (id: number): string =>
      `/token_sale/tokens/${id}/verify`,
  },
  banners: {
    getBanners: '/public/banners?type=mobile',
  },
};
