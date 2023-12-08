import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Popup from '../common/Popup';
import PrimaryButton from '../common/PrimaryButton';
import SecondaryButton from '../common/SecondaryButton';

import i18n from '../../utils/i18n';
import s from './styles';

const TwoFactorVerifyPopup = props => {
  const {
    isOpen,
    onClose,
    title,
    text,
    submitButtonText,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid
  } = props;

  const [t] = useTranslation('TwoFactorVerifyPopup');

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <View style={s.box}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.text}>{text}</Text>

        <View style={s.group}>
          <Text style={s.label}>{t('inputLabel')}</Text>

          <TextInput
            style={s.field}
            keyboardType="number-pad"
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values.code}
          />

          {errors.code && touched.code ? (
            <Text style={s.error}>{errors.code}</Text>
          ) : null}
        </View>

        <View style={s.buttons}>
          <PrimaryButton
            title={submitButtonText}
            onPress={handleSubmit}
            disabled={isSubmitting || !isValid}
          />

          <SecondaryButton title={t('cancelButton')} onPress={onClose} />
        </View>
      </View>
    </Popup>
  );
};

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(4, i18n.t('TwoFactorVerifyPopup:validation.tooShort'))
    .max(8, i18n.t('TwoFactorVerifyPopup:validation.tooLong'))
    .required(i18n.t('TwoFactorVerifyPopup:validation.required'))
});

export default withFormik({
  handleSubmit: (values, formik) => formik.props.onSubmit({ values, formik }),
  mapPropsToValues: () => ({
    code: ''
  }),
  validationSchema
})(TwoFactorVerifyPopup);
