import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

import React, { useEffect, useState } from 'react';

import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../../App';
import { windowWidth } from '../lib/util/dimensionUtil';

import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';
import Keys from '../values/keys/Keys';
import AppIntroSlider from 'react-native-app-intro-slider';
var project_key = Keys.projectKey;
var api_key = Keys.apiKey;
type Props = NativeStackScreenProps<RootParamList, 'LandingScreen'>;
const LandingScreen = () => {
  const { navigate }: Props['navigation'] = useNavigation();
  const navigation: Props['navigation'] = useNavigation();
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled,
  );
  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getTeamsLogos = async () => {
    try {
      await storage()
        .ref(`/teamLogos/banglore.png`)
        .getDownloadURL()
        .then(url => {
          AsyncStorage.setItem('banglore', url);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const _signinGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const _signinFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      // Handle errors here
      console.error('Facebook login error:', error);
      throw error;
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
        const temp1 = response.data;
        const temp2 = temp1.data;
        AsyncStorage.setItem('token', temp2.token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const userStateChanged = async (uid: string) => {
    AsyncStorage.setItem('uid', uid);
    auth().onAuthStateChanged(user => {
      if (user) {
        cricAuth().then(() => {
          navigation.navigate('CheckUserScreen', {
            mobileNumber: `${uid}`,
          });
        });
      }
    });
  };
  useEffect(() => {
    // requestUserPermission();
    toggleCrashlytics();
    GoogleSignin.configure({
      webClientId:
        '605607286538-8moil8odo2ufbmde143mi0crfnurlod3.apps.googleusercontent.com',
    });
  });
  return (
    <SafeAreaView className="bg-white flex-1" style={{}}>
      {/* <View className="absolute mt-20 w-full justify-center items-center">
        <Image
          source={require('./../../assets/images/bg.png')}
          style={{
            width: windowWidth,
            resizeMode: 'contain',
          }}
          className="mx-auto"
        />
      </View> */}

      {/* <Image
        source={require('./../../assets/images/logo.png')}
        className="mx-auto"
        style={{
          aspectRatio: 312 / 162,
          height: 100,
        }}
      />
      <Text className="uppercase text-[#FC2B2D] text-center text-xs font-poppins700">
        Biggest Fantasy Sports Game
      </Text>
      <View className="mt-10">
        <Text className="text-4xl text-[#1D3A4B] text-center font-poppins800">
          Apna Luck
        </Text>
        <Text className="text-4xl text-[#1D3A4B] text-center font-poppins800">
          khud ajmao!
        </Text>
      </View> */}
      <IntroSlider />
      <View className="pt-10 pb-6 rounded-xl mt-auto justify-center items-center">
        <TouchableOpacity
          onPress={() => navigate('LoginScreen')}
          className="bg-[#FC2B2D] p-2 px-10 w-11/12 rounded-lg">
          <Text className="text-md text-center text-white font-poppins600 uppercase">
            Register
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center w-full my-4">
          <View className="border-t w-[35%] border-[#9f9f9f]"></View>
          <View className="w-[12%]">
            <Text className="text-center text-sm text-[#9f9f9f]">Or</Text>
          </View>
          <View className="border-t w-[35%] border-[#9f9f9f]"></View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              className="bg-[#f0f0f0] items-center justify-center rounded-lg"
              style={{ width: '23%', height: 50 }}
              onPress={() => {
                _signinGoogle().then(res => {
                  if (res) userStateChanged(res.user.uid);
                });
              }}>
              <Image
                source={require('./../../assets/images/google.png')}
                style={{ width: '48.5%', height: '50%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#f0f0f0] items-center justify-center rounded-lg"
              style={{ width: '23%', marginLeft: 35, height: 50 }}
              onPress={() => {
                _signinFacebook().then(res => {
                  if (res) userStateChanged(res.user.uid);
                });
              }}>
              <Image
                source={require('./../../assets/images/facebook.png')}
                style={{ width: '30%', height: '50%' }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between w-full px-5">
          <View className=" justify-between  mt-2">
            <TouchableOpacity onPress={() => navigate('ReferredScreen')}>
              <Text className="text-left text-[#1D3A4B] text-sm  font-poppins500">
                Invited by a friend?
              </Text>
              <Text className="text-[#1D3A4B] text-left text-md font-poppins700">
                Enter Code
              </Text>
              {/* <TextInput
            className='border-2 px-3 bg-white mt-2'
              placeholder="Enter Code"
            /> */}
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-right text-[#1D3A4B] text-xs font-poppins500">
              Already a user?
            </Text>
            <TouchableOpacity onPress={() => navigate('LoginScreen')}>
              <Text className="text-[#1D3A4B] text-right text-md font-poppins700">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
type Slide = {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};
const slides = [
  {
    key: 'slide1',
    title: 'Select A Match',
    text: 'Choose an upcoming match that you want to play.',
    image: require('./../../assets/images/bg.png'),
  },
  {
    key: 'slide2',
    title: 'Select A Match',
    text: 'Choose an upcoming match that you want to play.',
    image: require('./../../assets/images/bg.png'),
  },
  {
    key: 'slide3',
    title: 'Select A Match',
    text: 'Choose an upcoming match that you want to play.',
    image: require('./../../assets/images/bg.png'),
  },
];

const IntroSlider = () => {
  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      showSkipButton={true}
      dotStyle={styles.paginationDot}
      activeDotStyle={styles.activePaginationDot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '65%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  paginationDot: {
    backgroundColor: '#FFD2D2',
  },
  activePaginationDot: {
    backgroundColor: '#fc2b2e',
  },
});

export default LandingScreen;
