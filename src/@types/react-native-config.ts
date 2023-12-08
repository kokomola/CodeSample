declare module 'react-native-config' {
  export interface NativeConfig {
    API_VERSION: string;
    API_HOST: string;
    IS_PRODUCTION: string;
    RECAPTCHA_KEY: string;
    RECAPTCHA_KEY_TEST: string;
    RECAPTCHA_HOST: string;
    SENTRY_DSN: string;
    GLOBALPASS_URL: string;
    GLOBALPASS_KYC: string;
    GLOBALPASS_BIO: string;
    TEST_ACCOUNT_EMAIL: string;
    TEST_ACCOUNT_CODE: string;
    REFERRAL_LINKS_HOST_OLD: string;
    REFERRAL_LINKS_HOST_NEW: string;
    YOUTUBE_CONTACT: string;
    TELEGRAM_CONTACT_EN: string;
    TELEGRAM_CONTACT_RU: string;
    INSTAGRAM_CONTACT_EN: string;
    INSTAGRAM_CONTACT_RU: string;
    TWITTER_CONTACT: string;
    TIKTOK_CONTACT: string;
    FAQ_RU: string;
    FAQ_EN: string;
    SHOP_AGREE_RU: string;
    SUNRISE_AGREE_RU: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
