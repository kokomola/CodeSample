import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { $selectedLine } from '@store/sunriseLine';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Line, TreeChild } from '@store/sunriseStructure/types';
import { capitalize } from '@utils/common/string';
import * as Icons from '@components/uikit/Icon/lib';
import { sunriseNewStatusMap } from '@utils/sunriseMaps';
import * as RootNavigation from '../../navigator/RootNavigation';
import { styles as s } from './styles';
import { routes } from 'src/navigator/routes';
import { ArrowRight } from '@components/uikit/Icon/lib';

export const SunriseChildrenByLevel: React.FC = () => {
  const [t] = useTranslation('Sunrise');

  const selectedLine: Line | undefined = useStore($selectedLine);

  const renderItem = useCallback((child: TreeChild, increase?: boolean) => {
    const {
      sunrise_joined: isSunrise,
      ambassador_level: level,
      status,
    } = child;
    const isAmbassador = !!level;
    const newStatus = capitalize(sunriseNewStatusMap[status] || 'zero');
    const icon = isAmbassador
      ? `Ambassador${level}`
      : isSunrise
      ? `Sunrise${capitalize(newStatus)}`
      : capitalize(newStatus);

    const foundIcon = Icons[icon];
    const Icon = foundIcon ? (foundIcon as React.ElementType) : Icons.Zero;

    const gotToParnter = (parnterId: number) => {
      RootNavigation.navigate(routes.sunriseTab.partner, { id: parnterId });
    };

    return (
      <TouchableOpacity
        onPress={() => gotToParnter(child.id)}
        key={`item-${child.id}`}
        style={[s.row, s.child]}
      >
        <View style={s.row}>
          <Icon width={44} height={44} />
          <Text style={s.text}>{child.name}</Text>
          {/* <Triangle increase={increase} width={20} /> */}
        </View>
        <ArrowRight />
      </TouchableOpacity>
    );
  }, []);

  if (!selectedLine) return null;

  const { level, children, increase } = selectedLine;
  return (
    <View style={s.wrapper}>
      <Text style={s.title}>{t('linePartnerTitle')}</Text>
      {children.map((child) => renderItem(child, increase))}
    </View>
  );
};
