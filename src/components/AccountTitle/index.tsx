import * as React from 'react';
import { Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { CircleIcon } from '@components/uikit/Icon';
import { AFastImage } from '@components/AFastImage';
import * as colors from '@constants/colors';
import { IconName } from '../uikit/Icon';
import { styles as s } from './styles';

type Props = {
  icon?: IconName;
  iconColor: 'btc' | 'eth' | 'usdt' | 'sol' | 'plain';
  title: string;
  SvgIcon?: React.FC<SvgProps>;
  imageURI?: string;
};

export const AccountTitle: React.FC<Props> = (props) => {
  const { icon, title = '', iconColor, imageURI, SvgIcon } = props;

  return (
    <View style={s.balance}>
      {SvgIcon ? <SvgIcon width={44} height={44} /> : null}
      {icon ? (
        <CircleIcon
          icon={icon}
          color={colors.iconColors[iconColor]}
          size="xl"
        />
      ) : null}
      {imageURI ? <AFastImage style={s.image} uri={imageURI} /> : null}
      <Text style={s.balanceText}>{title}</Text>
    </View>
  );
};
