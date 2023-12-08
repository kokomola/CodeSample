import i18n, { getLocale } from '@utils/i18n';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/en-gb';

export function useShowDate(date: Date): string {
  const [showDate, setShowDate] = useState('-');

  const locale = getLocale(i18n);

  useEffect(() => {
    moment.locale(locale);
    setShowDate(moment(date).format('MMMM YYYY'));
  }, [locale, date]);

  return showDate;
}
