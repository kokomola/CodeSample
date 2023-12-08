import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';

import * as colors from '@constants/colors';

import { Icon } from '@components/uikit/Icon';

import { styles as s } from './styles';
import { ListMenuProps, ListMenuItem } from './types';

export const ListMenu: React.FC<ListMenuProps> = (props) => {
  const { menu } = props;

  const renderItem = ({ item, index }: ListRenderItemInfo<ListMenuItem>) => {
    const { svgIcon } = item;
    return (
      <TouchableOpacity key={index} onPress={item.onPress} style={s.item}>
        {svgIcon ? (
          <View style={s.itemIcon}>{svgIcon({ fill: colors.space500 })}</View>
        ) : null}

        {item.icon ? (
          <View style={s.itemIcon}>
            <Icon icon={item.icon} color={colors.space500} />
          </View>
        ) : null}

        <Text style={s.itemText} numberOfLines={1}>
          {item.text}
        </Text>

        {item.active ? (
          <View style={s.itemCheckIcon}>
            <Icon icon="check" color={colors.purple500} />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.box}>
      <FlatList
        keyExtractor={(item: ListMenuItem, index: number) =>
          `item-${item.key}-${index}`
        }
        data={menu}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={s.separator} />}
        ListFooterComponent={() => <View style={s.separator} />}
      />
    </View>
  );
};
