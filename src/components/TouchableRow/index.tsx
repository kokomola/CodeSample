import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';
import ContentLoader from 'react-content-loader/native';

import { CircleIcon, IconName } from '@components/uikit/Icon';
import * as colors from '@constants/colors';

import { AFastImage } from '@components/AFastImage';
import { styles as s } from './styles';
import { is } from '@utils/common/condition';
import { InfoIcon } from '@components/uikit/Icon/lib';

type Props = {
  onPress: (event: React.SyntheticEvent) => void;
  primaryText: string;
  smallText: string;
  icon?: IconName;
  SvgIcon?: React.FC<SvgProps>;
  iconColor: string;
  primaryTextColor?: string;
  bottomBorder?: boolean;
  loading?: boolean;
  imageURI?: string;
  percent?: number;
  disabled?: boolean;
  iconSize?: 'xl' | 'sm' | 'sm_md' | 'md' | 'lg';
  fnInfo?: () => void;
};

export const TouchableRow: React.FC<Props> = (props) => {
  const {
    onPress = () => {},
    disabled,
    smallText,
    primaryText,
    primaryTextColor = colors.space900,
    icon,
    iconColor,
    bottomBorder = false,
    loading,
    imageURI = null,
    percent,
    iconSize = 'xl',
    SvgIcon,
    fnInfo,
  } = props;

  const { t } = useTranslation('Accounts');

  const addBottomBorder = bottomBorder
    ? {
        borderBottomColor: '#eceaf4',
        borderBottomWidth: 1.5,
      }
    : null;

  if (loading) {
    return <ContentLoader />;
  }

  const primaryTextStyle = [s.primaryText, { color: primaryTextColor }];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[s.box, addBottomBorder]}
      onPress={onPress}>
      <View style={s.iconBox}>
        {SvgIcon ? <SvgIcon width={44} height={44} /> : null}

        {is.exist(icon) && (
          <CircleIcon icon={icon!} color={iconColor} size={iconSize} />
        )}

        {imageURI && <AFastImage uri={imageURI} style={s.image} />}
      </View>

      <View style={s.infoBox}>
        <Text style={primaryTextStyle}>{primaryText}</Text>
        <Text style={s.smallText}>{smallText}</Text>
      </View>

      {!!percent && (
        <View style={s.rightBox}>
          <Text style={s.percent}>
            {percent}%/{t('shortDay')}
          </Text>
        </View>
      )}
      {!!fnInfo && (
        <TouchableOpacity style={s.rightBox} onPress={() => fnInfo()}>
          <InfoIcon width={26} height={26} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
