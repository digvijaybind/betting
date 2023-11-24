import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import * as React from 'react';
import { Image } from 'react-native';
import { RootParamList, ToastContext } from '../../../App';
import firestore from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<RootParamList, 'ReferredScreen'>;
const ReferredScreen = () => {
  const { navigate }: Props['navigation'] = useNavigation();
  const [referred, setReferred] = React.useState('');
  const validation = async (referred: string) => {
    try {
      if (referred != '' && referred.length === 10) {
        const usersCollection = firestore().collection('Users');
        const querySnapshot = await usersCollection.where('referredCode', '==', referred).get();
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          await AsyncStorage.setItem('referredCode', referred);
          navigate('LoginScreen');
        } else {
          Alert.alert('Referred Code Error!', 'Invalid Referred Code.');
        }
      } else {
        Alert.alert('Referred Code Error!', 'Please Enter a Valid Referred Code.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {}, []);

  return (
    <View style={{ width: '100%', height: '100%' }}>
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
            referredCode
          </Text>

          <View className="mt-8 w-4/5 mx-auto">
            <TouchableOpacity
              className={clsx(
                'bg-white flex-row border-2 rounded-xl mt-1 overflow-hidden',
                'border-gray-400',
              )}>
              <TextInput
                style={{
                  fontSize: 18,
                }}
                maxLength={10}
                placeholderTextColor={'#00000060'}
                placeholder="Enter Your Referred Code"
                className="bg-transparent text-black font-poppins500 border-0 py-3 w-full"
                onChangeText={text => {
                  setReferred(text);
                }}
              />
            </TouchableOpacity>
            <View className="pt-3 mt-10 rounded-xl justify-center items-center">
              <TouchableOpacity
                className="bg-[#FC2B2D] p-2 px-10 w-11/12 rounded-lg justify-center items-center"
                onPress={() => validation(referred)}>
                <Text
                  className={clsx(
                    'text-lg text-center text-white font-poppins600',
                  )}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ReferredScreen;
