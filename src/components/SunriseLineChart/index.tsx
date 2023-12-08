import React from 'react';
import { View } from 'react-native';
import { useStore } from 'effector-react';
import {
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory-native';
import {
  $chart,
  $selectedDatePicker,
  selectDateByPicker,
} from '@store/sunriseLine';
import { withSpaceAndComma } from '@utils/common/withSpaceAndComma';
import { fixToUsdt } from '@utils/numbers/fix';
import * as colors from '@constants/colors';
import Svg, { Circle } from 'react-native-svg';
import { widthScreen } from '@constants/platform';
import { openBS } from '@store/bottomSheetCommon';
import { openBSFx, closeBSFx } from '../../store/bottomSheetCommon/index';
import { space400 } from '@constants/colors';
import { isEqualDates } from '@utils/common/date';
import { styles as s } from './styles';

const ScatterPoint: React.FC<any> = (props) => {
  const selectedDatePicker = useStore($selectedDatePicker);
  const chart = useStore($chart);
  const disable = useStore(openBSFx.pending || closeBSFx.pending);

  const { x, y, index, datum } = props;
  const isSelected = isEqualDates(selectedDatePicker, datum.x * 1000);

  const canBig = () => {
    const aDay = 86400;
    const aUsdt = 350;
    const prevPoint = chart[index - 1];
    const nextPoint = chart[index + 1];
    // x
    const diffPrevX = !!prevPoint && datum.x - prevPoint.x;
    const diffNextX = !!nextPoint && nextPoint.x - datum.x;
    // y
    const diffPrevY = !!prevPoint && datum.y - prevPoint.y;
    const diffNextY = !!nextPoint && nextPoint.y - datum.y;

    /* log(index, {
      x: datum.x,
      y: datum.y,
      prevX: prevPoint?.x,
      nextX: nextPoint?.x,
      diffPrevX,
      diffNextX,
      diffPrevY,
      diffNextY,
    }); */

    return (
      ((diffPrevX > aDay || !diffPrevX) && (diffNextX > aDay || !diffNextX)) ||
      ((diffPrevY > aUsdt || !diffPrevY) && (diffNextY > aUsdt || !diffNextY))
    );
  };

  const select = () => {
    openBS();
    selectDateByPicker(new Date(datum.x * 1000));
  };

  return (
    <Circle
      disabled={disable}
      cx={x}
      cy={y}
      r={isSelected ? 5 : 4}
      stroke={
        disable ? space400 : isSelected ? colors.oceanGreen : 'transparent'
      }
      strokeWidth={isSelected ? 2 : 5 * (canBig() ? 3 : 1)}
      fill={colors.independence800}
      onPress={select}
      onLongPress={select}
    />
  );
};

export const SunriseLineChart: React.FC = () => {
  const chart = useStore($chart);

  if (chart.length <= 1) return null;

  const first = 0;
  const last = chart.length - 1;
  const x0 = chart[first].x;
  const y0 = chart[first].y;
  const xN = chart[last].x;
  const yN = chart[last].y;

  const isSecond = x0 !== xN;

  const lineStyle = {
    stroke: 'black',
    strokeWidth: 1.5,
  };
  const subLineStyle = {
    strokeDasharray: 3,
    strokeWidth: 1.5,
  };
  const labelStyle = {
    data: { fill: 'transparent' },
    labels: { fill: 'black' },
  };

  return (
    <View style={s.box}>
      <Svg width={widthScreen} height={300} style={s.svg}>
        <VictoryGroup
          standalone={false}
          minDomain={{ x: x0, y: y0 }}
          maxDomain={{ x: xN, y: yN }}
          theme={VictoryTheme.material}
          domainPadding={{ x: -5, y: -5 }}
          animate={false}
          height={300}
        >
          <VictoryLine
            style={{ data: { ...subLineStyle, stroke: colors.oceanGreen } }}
            data={[
              { x: x0, y: yN },
              { x: xN, y: yN },
            ]}
          />
          {isSecond && (
            <VictoryLine
              style={{ data: { ...subLineStyle, stroke: colors.fieryRose } }}
              data={[
                { x: x0, y: y0 },
                { x: xN, y: y0 },
              ]}
            />
          )}

          <VictoryScatter
            style={labelStyle}
            labels={({ datum }) =>
              withSpaceAndComma(fixToUsdt(datum.y.toString()))
            }
            data={[{ x: xN, y: y0 }]}
            labelComponent={<VictoryLabel dx={20} />}
          />
          {isSecond && (
            <VictoryScatter
              style={labelStyle}
              labels={({ datum }) =>
                withSpaceAndComma(fixToUsdt(datum.y.toString()))
              }
              data={[{ x: xN, y: yN }]}
              labelComponent={<VictoryLabel dx={20} />}
            />
          )}

          <VictoryLine
            animate={false}
            style={{ data: lineStyle }}
            data={chart}
          />

          <VictoryScatter data={chart} dataComponent={<ScatterPoint />} />
        </VictoryGroup>
      </Svg>
    </View>
  );
};
