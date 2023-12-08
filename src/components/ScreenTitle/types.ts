import * as React from 'react';

export type ScreenTitleProps = {
  title: string;
  buttons?: React.ReactNode;
  back?: boolean;
  showTwoFAWarning?: boolean;
};
