import { forward } from 'effector';
import { askDelete, deleteAccount, deleteAccountFx } from './index';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { showSuccess } from '@store/alert';
import { logout } from '@store/logout';

forward({
    from: askDelete,
    to: showSuccess.prepend(() => ({
        domain: 'AccountDomain',
        title: 'delAccountAskTitle',
        message: 'delAccountAskMessage',
        buttons: [
            {
                text: 'OK',
                onPress: () => deleteAccount(), //onPress: () => Navigate.navigate(routes.profileTab.deleteAccount),
            },
            { text: 'Cancel', style: 'cancel' },
        ],
    })),
});

forward({
    from: deleteAccount,
    to: deleteAccountFx,
});

forward({
    from: deleteAccountFx.done,
    to: [showSuccess.prepend(() => ({
        domain: 'AccountDomain',
        title: 'delAccountAskTitle',
        message: 'delAccountAnswerSuccess'
    })), logout]
})

deleteAccountFx.use(() => {
    const method = 'delete';
    const url = endpoints.account.delete;

    return signedRequest({ method, url });
});
