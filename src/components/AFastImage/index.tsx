import { ShopNoPictureIcon } from '@components/ShopNoPictureIcon/ShopNoPictureIcon';
import { EmptyPicture } from '@components/uikit/Icon/lib';
import { purple500 } from '@constants/colors';
import * as React from 'react';
import { ActivityIndicator, StyleProp, View } from 'react-native';
import FastImage, {
  ImageStyle,
  Priority,
  ResizeMode,
} from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';

type Props = {
  uri: string;
  style?: StyleProp<ImageStyle>;
  priority?: Priority;
  resizeMode?: ResizeMode;
  onError?: () => void;
};

export const AFastImage: React.FC<Props> = ({
  uri,
  style,
  priority,
  resizeMode,
  ...props
}) => {
  const [validImg, setValidImg] = React.useState(true);
  const { onError = () => setValidImg(false) } = props;

  const isSvg = uri && uri.includes('.svg');

  if (!validImg)
    return (
      <EmptyPicture
        style={{ alignSelf: 'center' }}
        width={style?.width || 40}
        height={style?.height || 40}
        fill={purple500}
      />
    );

  return (
    <>
      {uri && !isSvg ? (
        <FastImage
          onError={onError}
          style={style}
          resizeMode={resizeMode || FastImage.resizeMode.contain}
          onProgress={() => (
            <ActivityIndicator size="small" color={purple500} />
          )}
          source={{
            uri,
            priority: priority || FastImage.priority.normal,
          }}
        />
      ) : null}
      {uri && isSvg ? <SvgUri style={style} uri={uri} /> : null}
    </>
  );
};
