import React, {FC, useCallback, useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity} from 'react-native';
import i18n, {getLocale} from '@utils/i18n';
import {useTranslation} from 'react-i18next';
import {default as MonthPickerLib} from 'react-native-month-year-picker';
import moment from 'moment';
import {isAndroid} from '@constants/platform';
import {log, logline} from '@utils/debug';
import {getLastDayOfMonth} from '@utils/common/date';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import 'moment/locale/tr';
import {styles as s} from './styles';

const ModalWrapper: React.FC<{children: JSX.Element}> = ({children}) => {
  if (isAndroid) return <>{children}</>;
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      {children}
    </Modal>
  );
};

interface IProps {
  date: Date;
  setDate: ([startDate, endDate]: [Date, Date]) => void;
  maxDate?: Date;
  minDate?: Date;
}

export const MonthPicker: React.FC<IProps> = ({
  date,
  setDate,
  maxDate,
  minDate,
}) => {
  const [showDate, setShowDate] = useState('');
  const [show, setShow] = useState(false);

  const [t] = useTranslation('MonthPicker');

  const locale = getLocale(i18n);

  useEffect(() => {
    moment.locale(locale);
    setShowDate(moment(date).format('MMMM YYYY'));
  }, [locale, date]);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (_, newDate: Date) => {
      showPicker(false);
      if (
        !!newDate &&
        (newDate.getMonth() !== date.getMonth() ||
          newDate.getFullYear() !== date.getFullYear())
      ) {
        const selectedDate = newDate || date;
        const lastDayOfMonth = getLastDayOfMonth(selectedDate);
        log('[MonthPicker]', {selectedDate, lastDayOfMonth});
        setDate([selectedDate, lastDayOfMonth]);
      }
    },
    [date, setDate, showPicker],
  );

  const picker = (
    <MonthPickerLib
      onChange={onValueChange}
      value={date}
      locale={locale}
      okButton={t('okButton')}
      cancelButton={t('cancelButton')}
      maximumDate={maxDate}
      minimumDate={minDate}
    />
  );

  return (
    <>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text style={s.date}>{showDate}</Text>
      </TouchableOpacity>
      {show && <ModalWrapper>{picker}</ModalWrapper>}
    </>
  );
};
