import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DeleteIcon } from '@components/uikit/Icon/lib';
import { style as s } from './style';
import { logline } from '@utils/debug';

type Props = {
  pin: string;
  onChange: (pin: string) => void;
  loading: boolean;
  signOut: () => void;
  tip: string;
  error?: string;
};
const PINForm: React.FC<Props> = (props) => {
  const { pin = '', onChange, loading, signOut, tip, error } = props;

  const [t] = useTranslation('PINForm');

  const pressButton = (button: string) => onChange(`${pin}${button}`);
  const pressDelete = () => onChange(pin.substring(0, pin.length - 1));

  const renderButton = (action: string) => {
    const disabled = !!error || loading;

    if (action === 'back') {
      return (
        <TouchableOpacity
          style={[s.delButton, disabled && s.disabledButton]}
          onPress={() => {
            pressDelete();
          }}
          disabled={disabled}>
          <DeleteIcon width={130} />
        </TouchableOpacity>
      );
    }

    if (action === 'none') {
      return <View style={[s.button, s.hiddenButton]} />;
    }

    if (action === 'finger') {
      return <View style={[s.button, s.hiddenButton]} />;
    }

    return (
      <TouchableOpacity
        style={[s.button, disabled && s.disabledButton]}
        onPress={() => {
          pressButton(action);
        }}
        disabled={disabled}>
        <Text style={s.buttonText}>{action}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.box}>
      <View style={s.top}>
        <TouchableOpacity style={s.topButton} onPress={signOut}>
          <Text style={s.topButtonText}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>

      <View>
        {error ? (
          <Text style={s.error}>{error}</Text>
        ) : (
          <Text style={s.title}>{tip}</Text>
        )}

        {loading ? (
          <View style={s.dots}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <View style={s.dots}>
            <View
              style={[
                s.dot,
                pin.length >= 1 && s.activeDot,
                !!error && s.errorDot,
              ]}
            />
            <View
              style={[
                s.dot,
                pin.length >= 2 && s.activeDot,
                !!error && s.errorDot,
              ]}
            />
            <View
              style={[
                s.dot,
                pin.length >= 3 && s.activeDot,
                !!error && s.errorDot,
              ]}
            />
            <View
              style={[
                s.dot,
                pin.length >= 4 && s.activeDot,
                !!error && s.errorDot,
              ]}
            />
          </View>
        )}
      </View>

      <View style={s.numpad}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('none')}
        {renderButton('0')}
        {pin.length ? renderButton('back') : renderButton('finger')}
      </View>
    </View>
  );
};

export default PINForm;
