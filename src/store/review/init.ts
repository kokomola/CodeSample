import { guard, sample, forward } from 'effector';
import AsyncStorage from '@react-native-community/async-storage';
import InAppReview from 'react-native-in-app-review';

import {
    $reviewInfo,
    readReviewInfoFx,
    showOriginReviewFx, storeReviewInfoFx,
    askReview, increaseAskings, dontAskAnymore,
    checkReview,
    checkAvailableReviewFx,
    $isAvalableReview,
    testEraseReviewStorage,
    testMakeOlderAWeek
} from './index';
import { showSuccessFx } from '@store/alert';
import { REVIEW_STORAGE_KEY } from 'src/common/storageKey';
import { defaultReview } from './types';

import { log, logline } from '@utils/debug';
import { RootGate } from '@store/app/connection';
import { AlertButton } from 'react-native';


$reviewInfo
    .on(readReviewInfoFx.doneData, (_, reviewInfo) => reviewInfo)
    .on(storeReviewInfoFx, (_, reviewInfo) => reviewInfo)

$isAvalableReview.on(checkAvailableReviewFx.doneData, (_, isAvailable) => isAvailable);

readReviewInfoFx.use(async () => {
    // await AsyncStorage.removeItem(REVIEW_STORAGE_KEY); for test
    const jsonReviewInfo = await AsyncStorage.getItem(REVIEW_STORAGE_KEY);
    //logline('*[readReviewInfo]', jsonReviewInfo != null ? JSON.parse(jsonReviewInfo) : null);
    return jsonReviewInfo != null ? JSON.parse(jsonReviewInfo) : defaultReview;
});

storeReviewInfoFx.use(async (reviewInfo) => {
    const jsonReviewInfo = JSON.stringify(reviewInfo)
    await AsyncStorage.setItem(REVIEW_STORAGE_KEY, jsonReviewInfo)
    log("*[storeReviewInfo] was stored", reviewInfo);
});

forward({
    from: RootGate.open,
    to: [readReviewInfoFx, checkAvailableReviewFx],
})

guard({
    clock: checkReview,
    source: [$reviewInfo, $isAvalableReview],
    filter: ([{ isNeed, lastAsking }, isAvailable]) => {
        //logline("", { isNeed, lastAsking, isAvailable });
        const currentDay = new Date().getDate();
        const beforeDay = lastAsking ? new Date(lastAsking).getDate() : null;
        const needAsk = isAvailable && isNeed && (!beforeDay || currentDay > beforeDay + 7)
        //log('[next week]?', { beforeDay, currentDay, isWeek: !beforeDay || currentDay > beforeDay + 7, needAsk });
        return needAsk;
    },
    target: askReview,
});

checkAvailableReviewFx.use(() => {
    //logline("[InAppReview lib]", { isAvailable: InAppReview.isAvailable() })
    return InAppReview.isAvailable();
});

sample({
    clock: askReview,
    source: $reviewInfo.map(({ countOfAsking }) => countOfAsking),
    fn: (count) => count,
    target: showSuccessFx.prepend((countOfAsking: number) => {
        let buttons: AlertButton[] = [
            { text: 'NotNow', onPress: () => increaseAskings() },
            { text: 'Review', onPress: showOriginReviewFx },
        ];
        if (countOfAsking >= 3) {
            buttons = [...buttons, { text: 'NoTY', onPress: () => dontAskAnymore() }];
        }
        return { title: 'Title', message: "Message", buttons, domain: "Review" };
    })
});

sample({
    clock: increaseAskings,
    source: $reviewInfo,
    fn: (reviewInfo, _) => ({ ...reviewInfo, countOfAsking: ++reviewInfo.countOfAsking, lastAsking: new Date() }),
    target: storeReviewInfoFx
})

sample({
    clock: dontAskAnymore,
    source: $reviewInfo,
    fn: (reviewInfo, _) => ({ ...reviewInfo, isNeed: false, lastAsking: new Date() }),
    target: storeReviewInfoFx,
});

forward({
    from: showOriginReviewFx.done,
    to: dontAskAnymore,
})


showOriginReviewFx.use(() => {
    // trigger UI InAppreview
    logline('Asking review...')
    return InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
            // when return true in android it means user finished or close review flow
            logline('InAppReview in android', hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            logline(
                'InAppReview in ios has launched successfully',
                hasFlowFinishedSuccessfully
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
                // do something for ios
                // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
        })
        .catch((error) => {
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            logline('[store/review] error', error);
        });
});

//$reviewInfo.watch((reviewInfo) => log('[reviewInfo]', { ...reviewInfo }));

// for testing

/* forward({
    from: $reviewInfo.map((r) => r.lastAsking).updates,
    to: checkReview,
}) */

sample({
    clock: testEraseReviewStorage,
    source: $reviewInfo,
    fn: () => defaultReview,
    target: storeReviewInfoFx,
});

sample({
    clock: testMakeOlderAWeek,
    source: $reviewInfo,
    fn: (reviewInfo, _) => {
        const { lastAsking } = reviewInfo;
        let agedLastAsking = new Date();
        const lastDate = lastAsking ? new Date(lastAsking).getDate() : new Date().getDate();
        agedLastAsking.setDate(lastDate - 8);

        logline('**', { agedLastAsking, lastDate });
        return { ...reviewInfo, lastAsking: agedLastAsking };
    },
    target: storeReviewInfoFx,
});