import React from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

import { format } from 'date-fns';
import { Button } from '@components/uikit/Button';
//import { TestConnection } from '@components/TestConnection';

import { IScreenProps } from 'src/common/types';
import { Text, View } from 'react-native';
import {
  $reviewInfo,
  testEraseReviewStorage,
  testMakeOlderAWeek,
} from '@store/review';
import { useStore } from 'effector-react';

export const TestReviewTitle: React.FC = () => {
  const reviewInfo = useStore($reviewInfo);
  const { lastAsking } = reviewInfo;
  const lastDay = lastAsking ? format(lastAsking, 'DD.MM.YY : hh') : 'now';
  const currentDay = new Date().getDate();
  const beforeDay = lastAsking ? new Date(lastAsking).getDate() : null;
  return (
    <View style={{ borderWidth: 1, borderColor: 'green' }}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Button
          customStyle={{ backgroundColor: 'green', height: 38 }}
          text="Прошла +1 неделя"
          onPress={() => testMakeOlderAWeek()}
        />
        <Button
          customStyle={{
            backgroundColor: 'purple',
            marginLeft: 10,
            height: 38,
          }}
          text="Сбросить"
          onPress={() => testEraseReviewStorage()}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{ textAlign: 'center', marginLeft: 10 }}
        >{`Последний запрос: ${lastDay}`}</Text>
        <Text
          style={{ textAlign: 'center', marginLeft: 10 }}
        >{`Сейчас: ${format(new Date(), 'DD.MM.YY : hh')}`}</Text>
      </View>
      <Text style={{ textAlign: 'center', marginLeft: 10 }}>{`Прошла неделя?: ${
        beforeDay && currentDay > beforeDay + 7 ? 'ДА' : 'НЕТ'
      } прошло ${beforeDay ? currentDay - beforeDay : 0} дней`}</Text>
      <Text
        style={{ textAlign: 'center' }}
      >{`Количество запросов на отзыв: ${reviewInfo.countOfAsking}`}</Text>
      <Text
        style={{ textAlign: 'center' }}
      >{`Запрашивать отзыв в следующий раз?: ${
        reviewInfo.isNeed ? 'ДА' : 'НЕТ'
      }`}</Text>
    </View>
  );
};

export const TestScreenOptions = (
  screenProps: IScreenProps
): StackNavigationOptions => {
  return {
    ...screenProps,
    headerShown: true,
    animationEnabled: true,
    cardStyle: { backgroundColor: '#fff' },
    header: (props) => <TestReviewTitle />,

    /*header: (props: StackHeaderProps) =>
      !isConnected ? AppHeader(props) : Header(props), */

    //header: (props) => <TestConnection />,
  };
};
export const ScreenOptions = (
  screenProps: IScreenProps
): StackNavigationOptions => {
  return {
    ...screenProps,
    headerShown: false,
    animationEnabled: true,
    cardStyle: { backgroundColor: '#fff' },
    cardOverlayEnabled: true,
  };
};
