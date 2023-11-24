import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'ProfileScreen'>;

const ProfileScreen = () => {
  const { goBack }: Props['navigation'] = useNavigation();
  return (
    <ScrollView style={{}}>
      <ImageBackground
        style={{
          paddingBottom: 100,
        }}
        className="border"
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg',
        }}>
        <Appbar.Header
          elevated
          className="bg-transparent"
          statusBarHeight={30}
          mode="small">
          <Appbar.BackAction onPress={() => goBack()} iconColor="#fff" />
        </Appbar.Header>
      </ImageBackground>
      <View className="w-full absolute top-32 bg-white bottom-0 rounded-t-3xl">
        <View className="pt-4 pl-4 pr-4 items-center flex-row">
          <Image
            source={require('../../../assets/images/user-profile.jpg')}
            style={{ height: 80, width: 80, borderRadius: 40 }}
          />
          <View className="ml-3">
            <Text className="text-xl font-poppins700">John Doe</Text>
            <Text className="font-poppins700">280 ₹</Text>
          </View>
          <IconButton
            className="ml-auto"
            icon={() => (
              <Ionicons name="chevron-forward" size={24} color="white" />
            )}
            size={20}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View className="w-11/12 mt-3 bg-slate-50 border-black/10 mx-auto border rounded-md p-4 flex-row justify-between items-center">
          <Text className="text-center font-poppins500 text-lg">
            My Transaction
          </Text>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </View>

        <View className="w-11/12 mt-3 bg-slate-50 border-black/10 mx-auto border rounded-md p-4 flex-row justify-between items-center">
          <Text className="text-center font-poppins500 text-lg">
            Manage Payments
          </Text>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </View>

        <View className="w-11/12 mt-3 bg-slate-50 border-black/10 mx-auto border rounded-md p-4 flex-row justify-between items-center">
          <Text className="text-center font-poppins500 text-lg">
            My Info Settings
          </Text>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </View>

        <View className="w-11/12 mt-3 bg-slate-50 border-black/10 mx-auto border rounded-md p-4 flex-row justify-between items-center">
          <Text className="text-center font-poppins500 text-lg">
            Privacy Settings
          </Text>
          <Ionicons name="ios-arrow-forward" size={24} color="black" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
