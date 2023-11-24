import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';

import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import {
  FirebaseAuthTypes,
  default as auth,
} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import clsx from 'clsx';
import * as React from 'react';
import { Image } from 'react-native';
import { default as OTPInputView } from 'react-native-otp-input-reborn';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { RootParamList, ToastContext } from '../../../App';
import Keys from '../../values/keys/Keys';
var project_key = Keys.projectKey;
var api_key = Keys.apiKey;

type Props = NativeStackScreenProps<RootParamList, 'LoginScreen'>;
const LoginScreen = () => {
  const navigation: Props['navigation'] = useNavigation();

  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otpSending, setOtpSending] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [verifyOtp, setVerifyOtp] = React.useState(false);

  const [numberScreen, setNumberScreen] = React.useState(true);
  const [confirmJson, setConfirmJson] =
    React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const inputRef = React.useRef<TextInput>(null);
  const [isFocuses, setIsFocuses] = React.useState(false);
  const [eightcheckBox, setEightcheckBox] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [privocy, setPrivocy] = React.useState(false);
  const { setVisible } = React.useContext(ToastContext);

  const focus = () => {
    if (inputRef.current) inputRef.current.focus();
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

  const validation = async () => {
    const number = '+91' + mobileNumber;

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobileNumber) && mobileNumber.length < 10) {
      setVisible('Enter correct mobile number');
      return;
    }
    if (eightcheckBox === false) {
      setVisible('Please confirm that you are above 18 years of age');
      return;
    }

    if (terms === false) {
      setVisible('Please accept terms and conditions');
      return;
    }
    if (privocy === false) {
      setVisible('Please accept privocy and policy');
      return;
    }

    try {
      sendOtp(number);
      AsyncStorage.setItem('mobileNumber', mobileNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async (mobNo: string) => {
    console.log('sending');
    setOtpSending(true);
    await auth()
      .signInWithPhoneNumber(mobNo, true)
      .then(res => {
        setConfirmJson(res);
        setNumberScreen(false);
        setOtpSending(false);
      })
      .catch((e: FirebaseAuthTypes.PhoneAuthError) => {
        setVisible(`Error =< ${e.message}`);
        setOtpSending(false);
      });
  };

  const confirmOtp = async () => {
    if (otp.length < 6) {
      setVisible('Please enter correct OTP');
      return;
    }

    try {
      if (!confirmJson) {
        new Error('Invalid Json');
        return;
      }
      setVerifyOtp(true);
      const res = await confirmJson.confirm(otp);
      // console.log("res",res.user.uid);
      if (res != null) {
        AsyncStorage.setItem('uid', res.user.uid);
      }

      if (res) {
        userStateChanged();
        setVisible(false);
        setVerifyOtp(false);
      }
    } catch (error) {
      setVisible('Please enter correct OTP');
      setOtp('');
      setOtpSending(false);
    }
  };

  const userStateChanged = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        cricAuth().then(() => {
          navigation.navigate('CheckUserScreen', {
            mobileNumber: `${mobileNumber}`,
          });
        });
      }
    });
  };

  React.useEffect(() => {
    userStateChanged();
    setOtp('');
  }, []);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {!!numberScreen ? (
        <SafeAreaView className="bg-white flex-1 items-center justify-center">
          <View className="w-full">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="mx-auto"
              style={{
                width: 200,
                height: 200 * (162 / 312),
              }}
            />
            <Text className="text-2xl mt-10 text-black text-center font-poppins700 uppercase">
              Register
            </Text>

            <View className="mt-8 w-4/5 mx-auto">
              <Text className="text-md text-black font-poppins500">
                Mobile No
              </Text>
              <TouchableOpacity
                onPress={focus}
                className={clsx(
                  'bg-white flex-row border-2 rounded-xl mt-1 overflow-hidden',
                  isFocuses ? 'border-[#FC2B2D]' : 'border-gray-400',
                )}>
                <View className="justify-center items-center px-3">
                  <Text className="font-poppins500 text-lg text-black">
                    +91
                  </Text>
                </View>
                <TextInput
                  style={{
                    fontSize: 18,
                    marginTop: isFocuses ? 1 : 3,
                  }}
                  onFocus={() => setIsFocuses(true)}
                  onBlur={() => setIsFocuses(false)}
                  value={mobileNumber}
                  keyboardType="number-pad"
                  maxLength={10}
                  multiline={false}
                  placeholderTextColor={'#00000060'}
                  placeholder="Enter your number"
                  className="bg-transparent text-black font-poppins500 border-0 py-3 w-full"
                  onChangeText={text => {
                    setMobileNumber(text);
                  }}
                />
              </TouchableOpacity>
              <View className="flex-row justify-center items-center">
                <Checkbox.Android
                  status={eightcheckBox ? 'checked' : 'unchecked'}
                  color="#FC2B2D"
                  onPress={() => setEightcheckBox(!eightcheckBox)}
                  uncheckedColor="#000000"
                />
                <Text className="font-poppins600 text-center text-black text-xs">
                  I confirm that i am indian citizen of 18+ age
                </Text>
              </View>
              <View className="pt-3 mt-10 rounded-xl justify-center items-center">
                <TouchableOpacity
                  onPress={() => validation()}
                  disabled={otpSending}
                  className="bg-[#FC2B2D] p-2 px-10 w-11/12 rounded-lg justify-center items-center">
                  <Text
                    className={clsx(
                      'text-lg text-center text-white font-poppins600',
                      otpSending && 'opacity-0',
                    )}>
                    Next
                  </Text>
                  {otpSending && (
                    <ActivityIndicator
                      size="small"
                      color="#fff"
                      className="absolute"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center mt-8 items-center">
                <Checkbox.Android
                  status={terms ? 'checked' : 'unchecked'}
                  color="#FC2B2D"
                  onPress={() => setTerms(!terms)}
                  uncheckedColor="#000000"
                />
                <Text className="font-poppins700 text-black text-xs">
                  I agree to{' '}
                </Text>
                <TouchableOpacity
                  onPress={
                    () => {
                      Linking.openURL('http://luck24seven.com/terms-conditions/');
                    }
                  }
                >
                  <Text className="text-[#FC2B2D] font-poppins700 text-xs">
                    Terms and condition
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center mt-8 items-center">
                <Checkbox.Android
                  status={privocy ? 'checked' : 'unchecked'}
                  color="#FC2B2D"
                  onPress={() => setPrivocy(!privocy)}
                  uncheckedColor="#000000"
                />
                <Text className="font-poppins700 text-black text-xs">
                  I agree to{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'https://luck24seven.com/privacy-policy/',
                    );
                  }}
                >
                  <Text className="text-[#FC2B2D] font-poppins700 text-xs">
                    privacy policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="bg-white flex-1 items-center justify-center">
          <View className="w-full">
            <Image
              source={require('../../../assets/images/logo.png')}
              className="mx-auto"
              style={{
                width: 200,
                height: 200 * (162 / 312),
              }}
            />

            <Text className="text-2xl mt-10 text-black text-center font-poppins700 uppercase">
              OTP Verification
            </Text>

            <View className="flex-row justify-center items-center">
              <Text className="font-poppins400 text-black text-md">
                Enter the OTP sent to
              </Text>

              <Text className="text-[#FC2B2D] font-poppins400 text-md">
                {' '}
                +91{mobileNumber}
              </Text>
            </View>
            <View className="mt-2 w-10/12 mx-auto">
              <Text className="text-lg text-black font-poppins500">Otp</Text>
              <View
                style={{
                  height: 60,
                }}>
                <OTPInputView
                  style={{ width: '100%' }}
                  pinCount={6}
                  autoFocusOnLoad={true}
                  codeInputFieldStyle={{
                    width: 40,
                    height: 60,
                    borderColor: 'grey',
                    borderRadius: 5,
                    color: '#000',
                    fontSize: 28,
                    marginRight: 2,
                  }}
                  codeInputHighlightStyle={{
                    color: '#000',
                    fontSize: 17,
                    borderColor: '#000000',
                  }}
                  onCodeChanged={code => {
                    setOtp(code);
                    console.log(code);
                  }}
                  autoFillCode={true}
                  code={otp}
                  maxLength={6}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => confirmOtp()}
              className="bg-[#FC2B2D] p-2 px-10 justify-center items-center w-10/12 mx-auto mt-4 rounded-lg">
              <Text
                className={clsx(
                  'text-lg text-center text-white font-poppins600',
                  verifyOtp && 'opacity-0',
                )}>
                Verify
              </Text>
              {verifyOtp && (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  className="absolute"
                />
              )}
            </TouchableOpacity>
            <View className="text-center justify-center items-center">
              <TouchableOpacity
                className="text-center mt-2 rounded-xl overflow-hidden bg-white/20 border-white/50 border px-3 "
                onPress={() => {
                  setNumberScreen(true);
                  setMobileNumber('');
                  setOtp('');
                }}>
                <Text className="p-2 text-[#E31E24] font-poppins700 text-md">
                  Change Number
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default LoginScreen;
