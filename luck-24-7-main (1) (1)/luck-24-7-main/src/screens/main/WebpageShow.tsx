import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'WebViewScreen'>;
const WebpageShow = ({
  navigation: { goBack },
  route: {
    params: { uri, title },
  },
}: Props) => {
  return (
    <SafeAreaView className="h-full">
      <Appbar.Header
        elevated
        className="bg-[#1D3A4B]"
        statusBarHeight={0}
        mode="small">
        <Appbar.BackAction onPress={() => goBack()} iconColor="#fff" />
        <Appbar.Content title={title} color="#fff" />
      </Appbar.Header>
      <WebView
        className="h-full flex-1"
        source={{
          uri,
        }}
      />
    </SafeAreaView>
  );
};

export default WebpageShow;
