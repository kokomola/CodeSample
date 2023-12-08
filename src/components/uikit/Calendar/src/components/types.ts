export interface INeatDatePicker {
  newTime?: number;
  isVisible: boolean;
  initialDate?: Date;
  mode?: 'single' | 'range';
  onCancel: () => void;
  onConfirm: (date: Date, endDate?: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  locale?: string;
  colorOptions?: unknown;
}
