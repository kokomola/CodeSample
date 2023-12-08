import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { MonthPicker } from '@components/uikit/MonthPicker';
import { $date, $lines, changeDate } from '@store/sunriseStructure';
import { withSpaceAndComma } from '@utils/common/withSpaceAndComma';
import { fixToUsdt } from '@utils/numbers/fix';
import { Line } from '@store/sunriseStructure/types';
import { selectLevel } from '@store/sunriseLine';
import { Triangle } from '@components/Triangle';
import { styles as s } from './styles';

const StructureLine = (line: Line) => {
  const [t] = useTranslation('Sunrise');

  const current = !!line.current && (
    <View style={s.row}>
      <Text style={s.text}>
        {withSpaceAndComma(fixToUsdt(line.current))} USDT
      </Text>
      <Triangle increase={line.increase} />
    </View>
  );

  const children = !!line.allChildren && (
    <Text style={s.text}>{line.allChildren}</Text>
  );

  const newChildren = !!line.newChildren && (
    <Text style={s.new}>+{line.newChildren}</Text>
  );

  return (
    <TouchableOpacity style={s.line} onPress={() => selectLevel(line.level)}>
      <View style={s.current}>
        {current}
        <Text style={s.lineName}>{`${line.level}${t('lineName')}`}</Text>
      </View>
      <Text style={[s.text, s.min]}>
        Min: {withSpaceAndComma(fixToUsdt(line.min))} USDT
      </Text>
      <View style={s.allChildren}>
        {children}
        {newChildren}
      </View>
    </TouchableOpacity>
  );
};

const Lines = () => {
  const lines: Line[] = useStore($lines);

  return (
    <View style={s.lines}>
      {lines?.map((line, index) => (
        <StructureLine key={`item-${index}`} {...line} />
      ))}
    </View>
  );
};

export const SunriseStructure: React.FC = () => {
  const [t] = useTranslation('Sunrise');

  const [startDate, endDate] = useStore($date);

  return (
    <>
      <View style={s.monthWrapper}>
        <Text style={s.title}>{t('structure')}</Text>
        <MonthPicker
          date={startDate}
          setDate={changeDate}
          maxDate={new Date()}
        />
      </View>
      <Lines />
    </>
  );
};
