import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, SafeAreaView, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Appbar, Chip, RadioButton, Text, TextInput } from 'react-native-paper';
import { RootParamList } from '../../../App';
type Props = NativeStackScreenProps<RootParamList, 'MyInfoScreen'>;

const MyInfoScreen = () => {
  const navigation: Props['navigation'] = useNavigation();
  const [checked, setChecked] = React.useState<
    'male' | 'female' | 'others' | null
  >(null);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [DoB, setDoB] = useState('');

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const getUserData = async () => {
    await AsyncStorage.getItem('firstName').then(res => {
      setFirstName(res);
    });
    await AsyncStorage.getItem('lastName').then(res => {
      setLastName(res);
    });
    await AsyncStorage.getItem('mobileNumber').then(res => {
      setMobileNumber(res);
    });
    await AsyncStorage.getItem('DoB').then(res => {
      setDoB(res);
    });
    await AsyncStorage.getItem('gender').then(res => {
      setChecked(res);
    });
  };

  const validation = () => {
    //
    if (firstName && lastName && DoB && checked) {
      storeData();
      // console.log(firstName,lastName,DoB,checked);
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
      updateUserData();
    } catch (e) {}
  };

  const updateUserData = async () => {
    firestore()
      .collection('Users')
      .doc(mobileNumber)
      .update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileNumber: mobileNumber,
        DoB: DoB === '//' ? `${day}/${month}/${year}` : DoB,
        gender: checked,
      })
      .then(() => {
        Alert.alert('Profile Updated.', 'Your profile has been updated.');
      });
  };

  useLayoutEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView style={{}}>
      <Appbar.Header
        elevated
        className="bg-[#1D3A4B]"
        statusBarHeight={0}
        mode="small">
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          iconColor="#fff"
        />
        <Appbar.Content title="My Information" color="#fff" />
      </Appbar.Header>
      <View className="w-11/12 mx-auto py-4">
        <TextInput
          label="First Name"
          className="mb-4"
          mode="outlined"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          label="Last Name"
          className="mb-4"
          mode="outlined"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        {/* <TextInput
          label="Email"
          right={<TextInput.Icon icon="eye" />}
          className="mb-4"
          mode="outlined"
        /> */}
        <TextInput
          label="Mobile"
          className="mb-4"
          mode="outlined"
          value={mobileNumber}
          editable={false}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: 55,
            paddingLeft: 20,
            justifyContent: 'center',
            borderRadius: 5,
            borderColor: 'grey',
            borderWidth: 1,
            marginBottom: 10,
          }}
          onPress={() => {
            setOpen(true);
          }}>
          <Text
            className="font-poppins500"
            style={{ fontSize: 16, color: '#000' }}>
            {day ? `${day}/${month}/${year}` : DoB}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          // locale="fr"
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
        <View className="mb-4">
          <Text className="font-poppins500">Gender</Text>
          <View className="flex-row gap-2 mt-1">
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

        <View className="pt-4 pb-6 rounded-xl mt-auto justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              validation();
            }}
            className="bg-[#FC2B2D] p-2 px-10 w-11/12 rounded-lg">
            <Text className="text-md text-center text-white font-poppins600">
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyInfoScreen;
