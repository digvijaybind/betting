import { Alert, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import React, { useEffect } from 'react';
import Keys from '../../values/keys/Keys';
var project_key = Keys.projectKey;
var api_key = Keys.apiKey;

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../../App';
type Props = NativeStackScreenProps<RootParamList, 'SplashScreen'>;
const SplashScreen = () => {
  const navigation: Props['navigation'] = useNavigation();
  const isSignedIn = async () => {
    try {
      let res = auth().currentUser;
      console.log('pressed');
      // console.log(res);

      if (res) {
        try {
          const number = res.phoneNumber.slice(3);
          await firestore()
            .collection('Users')
            .doc(number)
            .get()
            .then(data => {
              const userData = data.data();
              // console.log('data', userData.firstName);
              if (data.exists) {
                AsyncStorage.setItem('firstName', userData.firstName);
                AsyncStorage.setItem('lastName', userData.lastName);
                AsyncStorage.setItem('DoB', userData.DoB);
                AsyncStorage.setItem('gender', userData.gender);
                AsyncStorage.setItem(
                  'walletAmount',
                  userData.walletAmount.toString(),
                );
                AsyncStorage.setItem(
                  'cashBonus',
                  userData.cashBonus.toString(),
                );
                AsyncStorage.setItem(
                  'winningAmount',
                  userData.winningAmount.toString(),
                );
                AsyncStorage.setItem(
                  'amountAdded',
                  userData.amountAdded.toString(),
                );

                cricAuth().then(() => {
                  navigation.navigate('AppStack');
                });
              }
              if (!data.exists) {
                AsyncStorage.setItem('mobileNumber', number);
                navigation.navigate('SignupScreen');
              }
            })
            .catch(e => {
              console.log(e);
              Alert.alert('Network error!', 'Please restart internet.');
            });
        } catch (error) {
          Alert.alert('Network error!', 'Please restart internet.');
        }
      }
      if (!res) {
        navigation.navigate('LandingScreen');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Network error!', 'Please restart internet.');
    }
  };

  const cricAuth = async () => {
    await axios({
      method: 'post',
      url: `https://api.sports.roanuz.com/v5/core/${project_key}/auth/`,
      data: JSON.stringify({
        api_key: api_key,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        // console.log("response", JSON.stringify(response))
        const temp1 = response.data;
        const temp2 = temp1.data;
        AsyncStorage.setItem('token', temp2.token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {
    isSignedIn();
  });

  return (
    <ImageBackground
      source={require('../../../assets/splashScreen.png')}
      resizeMode="stretch"
      className="flex-1"
      style={{}}></ImageBackground>
  );
};

export default SplashScreen;
