import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { default as React, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'LoginScreen'>;
const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation: Props['navigation'] = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [walletMoney, setWalletMoney] = useState('');
  const [active, setActive] = React.useState('');

  const getUserDataHere = async () => {
    await AsyncStorage.getItem('firstName').then(res => {
      setFirstName(res);
    });
    await AsyncStorage.getItem('lastName').then(res => {
      setLastName(res);
    });
    await AsyncStorage.getItem('walletMoney').then(res => {
      setWalletMoney(res);
    });
  };
  useLayoutEffect(() => {
    getUserDataHere();
  });

  useEffect(() => {
    function handleBackButton() {
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#1D3A4B' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyInfoScreen')}
          className="pt-4 pl-4 pb-8 pr-4">
          <View className="flex-row items-center">
            <Image
              source={require('../../../assets/images/user-profile.jpg')}
              style={{ height: 50, width: 50, borderRadius: 40 }}
            />
            <View className="ml-3">
              <Text className="text-base text-white font-poppins600">
                {firstName + ' ' + lastName}
              </Text>
              {/* <Text className="text-white font-poppins600">{`₹ ${walletMoney}`}</Text> */}
            </View>
            <IconButton
              className="ml-auto"
              icon={() => (
                <Ionicons name="chevron-forward" size={24} color="white" />
              )}
              size={20}
              onPress={() => navigation.navigate('MyInfoScreen')}
            />
          </View>
        </TouchableOpacity>
        <List.Item
          className="bg-white py-3"
          onPress={() => navigation.navigate('SettingsScreen')}
          title="Settings"
          left={props => (
            <Ionicons name="help-circle-outline" {...props} size={15} />
          )}
        />
        <List.Item
          className="bg-white py-3"
          onPress={
            () => {
              Linking.openURL('http://luck24seven.com/how-to-play/');
            }
            // navigation.navigate('WebViewScreen', {
            //   uri: 'http://luck24seven.com/how-to-play/',
            //   title: 'How to play',
            // })
          }
          title="How to play"
          left={props => (
            <Ionicons name="help-circle-outline" {...props} size={15} />
          )}
        />
        <List.Item
          className="bg-white py-3"
          onPress={
            () => {
              Linking.openURL('http://luck24seven.com/about-us/');
            }
            // navigation.navigate('WebViewScreen', {
            //   uri: 'http://luck24seven.com/about-us/',
            //   title: 'About Us',
            // })
          }
          title="About Us"
          left={props => (
            <SimpleLineIcons name="notebook" {...props} size={15} />
          )}
        />
        <List.Item
          className="bg-white py-3"
          title="Terms and Conditions"
          onPress={
            () => {
              Linking.openURL('http://luck24seven.com/terms-conditions/');
            }
            // navigation.navigate('WebViewScreen', {
            //   uri: 'http://luck24seven.com/terms-conditions/',
            //   title: 'Terms and Conditions',
            // })
          }
          left={props => (
            <Ionicons name="game-controller-outline" {...props} size={15} />
          )}
        />
        <List.Item
          className="bg-white py-3"
          title="Cancellation & Refund policy"
          onPress={
            () => {
              Linking.openURL(
                'http://luck24seven.com/cancellation-refund-policy/',
              );
            }
            // navigation.navigate('WebViewScreen', {
            //   uri: 'http://luck24seven.com/cancellation-refund-policy/',
            //   title: 'Cancellation & Refund policy',
            // })
          }
          left={props => <AntDesign name="Trophy" {...props} size={15} />}
        />
        <List.Item
          className="bg-white py-3"
          title="Responsible Play"
          onPress={
            () => {
              Linking.openURL('http://luck24seven.com/responsible-play//');
            }
            // navigation.navigate('WebViewScreen', {
            //   uri: 'http://luck24seven.com/responsible-play/',
            //   title: 'Responsible Play',
            // })
          }
          left={props => <MaterialIcons name="support" {...props} size={15} />}
        />
        <List.Item
          onPress={() => {
            Linking.openURL(
              'http://luck24seven.com/cancellation-refund-policy/',
            );
          }}
          className="bg-white py-3"
          title="Legality"
          left={props => <Ionicons name="ios-hammer" {...props} size={15} />}
        />
         <List.Item
          onPress={() => {
            Linking.openURL(
              'https://luck24seven.com/privacy-policy/',
            );
          }}
          className="bg-white py-3"
          title="privacy policy"
          left={props => <AntDesign name="questioncircleo" {...props} size={15} />}
        />
        <List.Item
          onPress={() => {
            navigation.navigate('ContactScreen');
            
          }}
          className="bg-white py-3"
          title="contact"
          left={props => <AntDesign name="questioncircleo" {...props} size={15} />}
        />
        <List.Item
          onPress={() => {
            Linking.openURL(
              'https://developer.android.com/topic/performance/vitals/crash',
            );
          }}
          className="bg-white py-3"
          title="App Development & Crashes"
          left={props => <AntDesign name="questioncircleo" {...props} size={15} />}
        />
      </DrawerContentScrollView>

      <View className="border-t px-4 bg-white border-black/20">
        <List.Item
        onPress={()=>{
          Linking.openURL('mailto:luck24seven.fantasy@gmail.com');

        }}
          className="bg-white py-3"
          title="Help and Support"
          left={() => (
            <AntDesign name="questioncircleo" size={15} color={'black'} />
          )}
        />
        <List.Item
          className="bg-white py-3"
          title="Logout"
          onPress={() => {
            Alert.alert('Attention!', 'Are you Sure?', [
              {
                text: 'YES',
                onPress: () => {
                  auth()
                    .signOut()
                    .then(() => {
                      AsyncStorage.clear();
                    })
                    .then(() => {
                      navigation.navigate('LandingScreen');
                    });
                },
              },
              {
                text: 'NO',
                onPress: () => {
                  null;
                },
              },
            ]);
          }}
          left={() => <AntDesign name="logout" size={15} color="black" />}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;
