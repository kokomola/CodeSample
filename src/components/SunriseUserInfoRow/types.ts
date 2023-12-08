import { IconName } from '@components/uikit/Icon';

export type InfoRowMap = {
  name: string;
  value: string | undefined;
  icon?: IconName;
  onPress?: () => any;
}[];
