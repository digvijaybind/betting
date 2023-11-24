import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';

type PaymentResponse = {
  // Define the structure of your payment response data here
  status: 'success' | 'failure';
  // Other relevant data
};

type PaymentCallbackProps = {
  navigation: any; // Add proper type based on your navigation library (e.g., React Navigation)
};

const PaymentCallbackScreen: React.FC<PaymentCallbackProps> = ({ navigation }) => {
  const [isSuccess, setIsSuccess] = useState('');
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      // Parse the deep link URL
      const url = event.url;
      // Extract data from the URL and cast it to the PaymentResponse type
      const paymentResponse: PaymentResponse = JSON.parse(url.substr(url.indexOf('?') + 1));
      
      // Handle the payment response data here
      if (paymentResponse.status === 'success') {
        // Payment was successful, navigate to a success screen
        // navigation.navigate('PaymentSuccessScreen');
        setIsSuccess('success')
      } else {
        // Payment failed, navigate to an error screen
        navigation.navigate('PaymentErrorScreen');
        setIsSuccess('failed')
      }
    };

    // Add event listener for deep links
    Linking.addEventListener('url', handleDeepLink);

    // Remove the event listener when the component unmounts
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);

  return (
    // Render your payment callback screen
    // You can display a loading indicator or relevant UI here
    <Text className="text-xs text-black font-poppins600 text-center"> </Text>
  );
};

export default PaymentCallbackScreen;