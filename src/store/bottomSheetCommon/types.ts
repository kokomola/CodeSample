import { LayoutChangeEvent } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { SunriseDetailWithDatePicker } from '@components/SunriseDetailWithDatePicker';
import { SunriseDiscountDetail } from '@components/SunriseDiscountDetail';
import { RequestDetails } from '@components/RequestDetails';
import { TwoFaVerifyForm } from '@components/TwoFaVerifyForm';
import { ShopAgreement } from '@components/ShopAgreement';
import { SunriseAgreement } from '@components/SunriseAgreement/index';
import { SavingAccountAlert } from '@components/SavingAccountAlert';


export type BottomSheetRef = React.RefObject<BottomSheet>;

export type CommonProps = {
  onLayout: (props: LayoutChangeEvent) => void;
};

export const bottomSheetFCs = {
  SunriseDetailWithDatePicker,
  SunriseDiscountDetail,
  TwoFaVerifyForm,
  ShopAgreement,
  SunriseAgreement,
  RequestDetails,
  SavingAccountAlert,
};

export type BottomSheetFCKeys = keyof typeof bottomSheetFCs;
