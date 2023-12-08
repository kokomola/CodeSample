import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { logline } from '@utils/debug';
import { $deviceId, getAndSaveDeviceIdFx, removeDeviceIdFx } from './index';
import { DEVICE_UNIQUE_ID } from 'src/common/storageKey';
import { bootstrapFx } from '@store/auth';
import { guard } from 'effector';
import { focusLoginPinScreen } from '@store/loginPIN';
import { focusSetupPinScreen } from '@store/setupPIN';


guard({
	clock: [focusLoginPinScreen, focusSetupPinScreen],
	source: $deviceId,
	filter: (deviceId, _) => !deviceId,
	target: getAndSaveDeviceIdFx,
})

$deviceId
	.on(bootstrapFx.doneData, (_, { deviceId }) => deviceId)
	.on(getAndSaveDeviceIdFx.doneData, (_, deviceId) => deviceId)
	.reset(removeDeviceIdFx.done);

getAndSaveDeviceIdFx.use(async () => {
	let deviceId = await AsyncStorage.getItem(DEVICE_UNIQUE_ID);
	if (!deviceId) {
		deviceId = await getUniqueId();
		logline('$store/getAndSaveDeviceIdFx', { deviceId });
		await AsyncStorage.setItem(DEVICE_UNIQUE_ID, deviceId);
	}
	return deviceId;

});

removeDeviceIdFx.use(async () => {
	await AsyncStorage.removeItem(DEVICE_UNIQUE_ID);
});

// debug

//$deviceId.watch((deviceId) => logline('$store/setupPIN', { deviceId }));

// Device Unique Id
//getDeviceIdFx.use(() => getUniqueId());
//$deviceId.on(getDeviceIdFx.doneData, (_, id) => id);
//$deviceId.reset(blurSetupPinScreen, savePinSaltFx.done);