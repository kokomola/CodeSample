import React, { useState } from 'react';
import { AFastImage } from '@components/AFastImage';
import { $banners } from '@store/banner';
import { useStore } from 'effector-react';
import { generateHtml } from '@components/HtmlView';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Cross } from '@components/uikit/Icon/lib';
import { purple500 } from '@constants/colors';
import WebView from 'react-native-webview';
import { styles as s } from './styles';

export const BannerRow: React.FC<{
  navigation: StackNavigationProp<ParamListBase>;
}> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const banners = useStore($banners);
  const handleClose = () => setIsOpen(false);

  if (!banners.length) return null;

  const banner = banners[0];

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <AFastImage uri={banner.image_url} style={s.image} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isOpen}
        onDismiss={handleClose}
        onRequestClose={handleClose}
      >
        <SafeAreaView style={s.container}>
          <View style={s.closeContainer}>
            <Cross
              style={s.closeButton}
              fill={purple500}
              onPress={handleClose}
            />
          </View>

          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <WebView
              scalesPageToFit={true}
              source={{
                html: generateHtml(banner.text_data),
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};
