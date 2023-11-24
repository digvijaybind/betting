import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { RootParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
type Props = NativeStackScreenProps<RootParamList, 'PaymentScreen'>;
const PaymentScreen = ({
  navigation: { goBack },
  route: {
    params: { uri }
  },
}: Props) => {
  const navigation: Props['navigation'] = useNavigation();
  const onNavigationStateChange = (navState: WebViewNavigation) => {
    // console.log('Current URL:', navState.url);
    if(navState.url === 'https://luck24seven.com/phonepeRedirect.php'){
      navigation.goBack();
    }
  };

  return (
    <WebView
      className="h-full flex-1"
      source={{ uri }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export default PaymentScreen;
