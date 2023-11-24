import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'CheckUserScreen'>;
const CheckUserScreen = () => {
  const navigation: Props['navigation'] = useNavigation();

  const checkuser = async (uid: string) => {
    await firestore()
      .collection('Users')
      .doc(uid)
      .get()
      .then(res => {
        if (res.exists) {
          const user = res.data();
          if (user) {
            AsyncStorage.setItem('firstName', user.firstName);
            AsyncStorage.setItem('lastName', user.lastName);
            AsyncStorage.setItem('DoB', user.DoB);
            AsyncStorage.setItem('gender', user.gender);
            AsyncStorage.setItem('walletMoney', user.walletAmount.toString());
            AsyncStorage.setItem('cashBonus', user.cashBonus.toString());
            AsyncStorage.setItem(
              'winningAmount',
              user.winningAmount.toString(),
            );
            AsyncStorage.setItem('amountAdded', user.amountAdded.toString());
          }
          navigation.navigate('AppStack');
        }
        if (!res.exists) {
          navigation.navigate('SignupScreen');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getFcmToken = async () => {
    await messaging()
      .getToken()
      .then(token => {
        AsyncStorage.setItem('fcmToken', token);
        return token;
      })
      .then(token => {
        AsyncStorage.getItem('mobileNumber')
          .then(number => {
            firestore().collection('fcmTokens').doc(number).set({
              fcmToken: token,
            });
          })
          .catch(e => console.log(e));
      });
  };

  React.useEffect(() => {
    getFcmToken();
    AsyncStorage.getItem('uid').then(res => {
      if (res === null) {
        navigation.navigate('SignupScreen');
        return;
      }
      checkuser(res);
    });
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        size={'large'}
        style={{ marginBottom: 10 }}
        color={'#E31E24'}
      />
      <Text className="uppercase text-[#E31E24] text-center font-poppins700 text-2xl">
        Getting you IN
      </Text>
    </View>
  );
};

export default CheckUserScreen;
