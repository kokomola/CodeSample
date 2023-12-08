import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const WEB_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:106.0) Gecko/20100101 Firefox/106.0';

export const MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36';

export const USER_AGENT = `${DeviceInfo.getApplicationName()} for ${Platform.OS
	} v${DeviceInfo.getReadableVersion()}`;