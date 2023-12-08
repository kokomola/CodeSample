import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Area, Wrapper } from '../../StorybookComponents';
import { Button } from '..';
import DatePicker from './index';
import { Text } from 'react-native';
import moment from 'moment';

function DefaultCalendarEn() {
  const [isVisible, setVisibility] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const showDatePicker = () => {
    setVisibility(true);
  };
  const hideDatePicker = () => {
    setVisibility(false);
  };

  const onConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };

  return (
    <>
      <Button text="Show Calendar" onPress={showDatePicker} />
      <Text style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>
        {moment(date).format('D MMMM YYYY')}
      </Text>
      <Wrapper title="4 actions">
        <DatePicker
          isVisible={isVisible}
          mode="single"
          initialDate={date}
          onCancel={hideDatePicker}
          onConfirm={onConfirm}
          minDate={new Date()}
          //maxDate={new Date()}
        />
      </Wrapper>
    </>
  );
}

function DefaultCalendarRu() {
  const [isVisible, setVisibility] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const showDatePicker = () => {
    setVisibility(true);
  };
  const hideDatePicker = () => {
    setVisibility(false);
  };

  const onConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };

  return (
    <>
      <Button text="Показать календарь" onPress={showDatePicker} />
      <Text style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>
        {moment(date).format('D MMMM YYYY')}
      </Text>
      <Wrapper title="4 actions">
        <DatePicker
          isVisible={isVisible}
          mode="single"
          locale="ru"
          initialDate={date}
          onCancel={hideDatePicker}
          onConfirm={onConfirm}
          minDate={new Date()}
          //maxDate={new Date()}
        />
      </Wrapper>
    </>
  );
}

storiesOf('Calendar', module).add('Default', () => (
  <Area>
    <DefaultCalendarEn />
    <DefaultCalendarRu />
  </Area>
));
