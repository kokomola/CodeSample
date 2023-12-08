import React from 'react';
import {
  View,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const ActionsSheet = (props) => {
  const { isOpen, onClose, children } = props;

  const [sheetHeight, setSheetHeight] = React.useState(0);

  const backdropOpacity = new Animated.Value(0);
  const sheetYPosition = new Animated.Value(150);

  const open = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetYPosition, {
        toValue: 0,
        delay: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const close = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetYPosition, {
        toValue: sheetHeight,
        delay: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  React.useEffect(() => {
    if (isOpen) open();
  }, [isOpen]);

  return (
    <View style={{ flex: 1 }}>
      <Modal transparent visible={isOpen}>
        <Animated.View style={{ ...s.backdrop, opacity: backdropOpacity }}>
          <ScrollView contentContainerStyle={s.scrollView}>
            <TouchableOpacity style={s.close} onPress={close} />
            <Animated.View
              style={{ ...s.sheet, translateY: sheetYPosition }}
              onLayout={(e) => setSheetHeight(e.nativeEvent.layout.height)}
            >
              {children}
            </Animated.View>
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end',
  },
  scrollView: {
    justifyContent: 'flex-end',
  },
  sheet: {
    padding: 20,
    minHeight: 350 + 20,
    marginTop: Dimensions.get('window').height - 150,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
});

export default ActionsSheet;
