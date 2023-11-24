import React, { useRef, useState } from 'react';

import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Chip, RadioButton } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'SignupScreen'>;

const SignUpScreen = () => {
  const navigation: Props['navigation'] = useNavigation();
  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef();
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const [open, setOpen] = useState(false);

  const [checked, setChecked] = React.useState<
    'male' | 'female' | 'others' | ''
  >('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [uid, setUid] = useState('');
  const [refCode, setRefCode] = useState(''); //this is use AsyncStorage
  const validation = () => {
    if (firstName && lastName && day && month && year && checked) {
      storeData();
    } else {
      Alert.alert('Can not proceed!', 'Please enter details');
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('firstName', firstName.trim());
      await AsyncStorage.setItem('lastName', lastName.trim());
      await AsyncStorage.setItem('DoB', `${day}/${month}/${year}`);
      await AsyncStorage.setItem('gender', checked);
      createUser();
    } catch (e) {}
  };

  const createUser = async () => {
    const randomColor = getRandomColor();
    let firstname = firstName.trim().toUpperCase();
    const paddingCharacter = 'W';
    while (firstname.length < 4) {
      firstname += paddingCharacter;
    }
    let referredCode = firstname + randomColor;

    await firestore()
      .collection('Users')
      .doc(uid)
      .set({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileNumber: mobileNumber,
        DoB: `${day}/${month}/${year}`,
        gender: checked,
        walletAmount: 0,
        winningAmount: 0,
        cashBonus: 0,
        amountAdded: 0,
        referredCode: referredCode,
        referredParson: refCode ? true : '',
        uid: uid,
      })
      .then(async () => {
        if (refCode) {
          const usersCollection = firestore().collection('Users');
          const querySnapshot = await usersCollection
            .where('referredCode', '==', refCode)
            .get();
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            let uniqueId = uid +"_"+ userData.uid;
            await firestore()
              .collection('ReferredHistory')
              .doc(uniqueId)
              .set({
                bonus: 50,
                currentDate: new Date().toJSON().slice(0, 10),
                senderId: userData.uid,
                receiverId: uid,
              })
              .then(() => {
                navigation.navigate('AppStack');
              })
              .catch(e => {
                console.log(e);
              });
          }
        }
        navigation.navigate('AppStack');
      })
      .catch(e => {
        console.log(e);
      });
  };
  React.useLayoutEffect(() => {
    AsyncStorage.getItem('uid').then(res => {
      if (res) setUid(res);
    });
    AsyncStorage.getItem('mobileNumber').then(res => {
      if (res) setMobileNumber(res);
    });
    AsyncStorage.getItem('referredCode').then(res => {
      if (res) setRefCode(res);
      console.log('res', res);
    });
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="w-11/12 mx-auto">
        <Image
          source={require('../../../assets/images/logo.png')}
          className="mx-auto"
          style={{
            width: 200,
            height: 200 * (162 / 312),
          }}
        />
        <Text className="text-black text-2xl mt-10 text-center font-poppins700 uppercase">
          Signup and Play
        </Text>
        <View className="w-full mt-2 space-y-5">
          <TextInput
            placeholder="Your first name"
            placeholderTextColor={'#646464'}
            keyboardType={'default'}
            autoFocus={true}
            returnKeyType="next"
            activeOutlineColor="#E31E24"
            mode="outlined"
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
            }}
            onSubmitEditing={() => ref_input2.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            ref={ref_input2}
            keyboardType={'default'}
            placeholder={'Your last name'}
            activeOutlineColor="#E31E24"
            placeholderTextColor={'#646464'}
            returnKeyType="next"
            value={lastName}
            onChangeText={text => setLastName(text)}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              height: 55,
              paddingLeft: 20,
              justifyContent: 'center',
              borderRadius: 5,
              borderColor: '#000',
              borderWidth: 1,
            }}
            onPress={() => {
              setOpen(true);
            }}>
            <Text className="font-poppins500 text-[#646464]">
              {day ? `${day}/${month}/${year}` : 'Enter your DOB'}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            locale="en"
            onConfirm={date => {
              setOpen(false);
              setDay(date.getDate());
              setMonth(date.getMonth() + 1);
              setYear(date.getFullYear());
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View>
            <Text className="font-poppins500 text-black text-xs">Gender</Text>
            <View className="flex-row space-x-2">
              <Chip
                avatar={
                  <RadioButton
                    value="male"
                    status={checked === 'male' ? 'checked' : 'unchecked'}
                    disabled
                  />
                }
                onPress={() => setChecked('male')}>
                Male
              </Chip>
              <Chip
                avatar={
                  <RadioButton
                    value="first"
                    status={checked === 'female' ? 'checked' : 'unchecked'}
                    disabled
                  />
                }
                onPress={() => setChecked('female')}>
                Female
              </Chip>
              <Chip
                avatar={
                  <RadioButton
                    value="first"
                    status={checked === 'others' ? 'checked' : 'unchecked'}
                    disabled
                  />
                }
                onPress={() => setChecked('others')}>
                Others
              </Chip>
            </View>
          </View>
          <View className="py-3" />
          <TouchableOpacity
            onPress={validation}
            className="bg-[#FC2B2D] p-2 px-10 justify-center items-center w-10/12 mx-auto rounded-lg">
            <Text className="text-lg text-center text-white font-poppins600">
              Go and earn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
