import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import { useTranslation } from "react-i18next";

export function useOpenUrl(url: string) {
	const [t] = useTranslation('UI');

	const handlePress = useCallback(
		async () => {
			const supported = await Linking.canOpenURL(url);

			if (supported) {
				await Linking.openURL(url);
			} else {
				Alert.alert(`${t('unsupportedURL')} ${url}`);
			}
		},
		[t]
	);

	return handlePress;
}