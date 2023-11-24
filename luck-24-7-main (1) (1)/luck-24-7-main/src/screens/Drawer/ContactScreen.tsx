import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'ContactScreen'>;
const ContactScreen = () => {
  const { goBack }: Props['navigation'] = useNavigation();
  return (
    <SafeAreaView style={{}}>
      <Appbar.Header
        elevated
        className="bg-[#1D3A4B]"
        statusBarHeight={0}
        mode="small">
        <Appbar.BackAction onPress={() => goBack()} iconColor="#fff" />
        <Appbar.Content title="Contact Details" color="#fff" />
      </Appbar.Header>
      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Email: luck24seven.fantasy@gmail.com</Text>
      </View>

      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Contact No: +91 9899909810</Text>
      </View>
      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Address: </Text>
        <Text className="py-2 px-4 font-poppins500 text-black">A-52, Old Plot No-8, Ground Floor,Gazipur East Delhi, India</Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;
