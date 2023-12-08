import {
  $selectedAddress,
  pressCopy,
  pressCopyFx,
} from '@store/deposit/index';
import Clipboard from '@react-native-community/clipboard';
import { forward } from 'effector/effector.cjs';
import { showSuccess } from '@store/alert';
import { log } from '@utils/debug';

forward({
  from: pressCopy,
  to: pressCopyFx,
});

pressCopyFx.use(async ({ address }) => {
  Clipboard.setString(address);
  return;
});

forward({
  from: pressCopyFx.done,
  to: showSuccess.prepend(() => ({
    title: 'Copied',
    message: '',
    buttons: [{ text: 'OK' }],
  })),
});

// debug

//$pairs.watch(pairs => log('[$store/deosit]', { pairs }))
//$selectedAddress.watch(selectedAddress => log('[$store/deosit]', { selectedAddress }))