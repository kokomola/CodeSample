import { IconName } from '@components/uikit/Icon';

export type RadioButtonProps = {
  active?: boolean;
  icon?: IconName;
  text?: string;
  onPress: () => void;
  img?: string;
  disabled?: boolean;
};
