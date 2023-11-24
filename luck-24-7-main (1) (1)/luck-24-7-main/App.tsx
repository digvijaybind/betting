import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
  Portal,
  Provider,
  Snackbar,
  adaptNavigationTheme,
} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import clsx from 'clsx';
import { BackHandler, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import CustomDrawer from './src/components/Drawer';
import { CreditType } from './src/lib/content/credit';
import MyInfoScreen from './src/screens/Drawer/MyInfoScreen';
import ProfileScreen from './src/screens/Drawer/ProfileScreen';
import LandingScreen from './src/screens/LandingScreen';
import MyMatchScreen from './src/screens/MyMatches';
import CompletedMatchScreen from './src/screens/MyMatches/CompletedMatchScreen';
import WalletScreen from './src/screens/Wallet';
import { default as CheckUserScreen } from './src/screens/auth/CheckUserScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import ReferredScreen from './src/screens/auth/ReferredScreen';
import { default as SignupScreen } from './src/screens/auth/SignupScreen';
// import { default as SplashScreen } from './src/screens/auth/SplashScreen';
import CreateTeamScreen, {
  SelectPlayerType,
} from './src/screens/main/CreateTeamScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import PaymentScreen from './src/screens/main/PaymentScreen';
import LiveMatchScreen from './src/screens/main/LiveMatchScreen';
import NotificationScreen from './src/screens/main/NotificationScreen';
import PoolDetailsScreen from './src/screens/main/PoolDetailsScreen';
import PoolsScreen from './src/screens/main/PoolsScreen';
import SelectTeam from './src/screens/main/SelectTeam';
import TeamPreview from './src/screens/main/TeamPreview';
import TeamsScreen from './src/screens/main/TeamsScreen';
import VCaptionScreen from './src/screens/main/VCaptionScreen';
import './src/styles';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3LightTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { PoolType } from './src/components/PoolsScreen/PoolCard';

import Settings from './src/screens/Drawer/SettingsScreen';
import ContactScreen from './src/screens/Drawer/ContactScreen';
import MyTransaction from './src/screens/Wallet/MyTransaction';
import LiveMatchPoolDetails from './src/screens/main/LivePoolsDetailScreen';
import WebpageShow from './src/screens/main/WebpageShow';
import dynamicLinks from '@react-native-firebase/dynamic-links';




// const linking = {
//   prefixes: ['luck24seven.page.link://'], // Replace with your app's custom scheme
//   config: {
//     screens: {
//       Home: 'HomeScreen',
//       Details: 'HomeScreen/',
//     },
//   },
// };

// const navigationRef = React.createRef();
// //console.log("====>>>",url);
//  const { navigate } = navigationRef.current;
// // Add this listener to handle deep linking
// Linking.addEventListener('url', ({ url }) => {


//   const route = url.replace(/.*?:\/\//g, '');
//   const routeName = route.split('/')[0];

//   // if (routeName === 'HomeScreen') {
//     const id = route.split('/')[1];
//      navigate('HomeScreen', { id });

// });

// export { linking };


const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const md3ColorsCustom: MD3Colors = {
  ...MD3LightTheme.colors,
};

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...md3ColorsCustom,
    ...LightTheme.colors,
  },
};

export type RootParamList = {
  FeedsScreen: undefined;
  SettingsScreen: undefined;
  ContactScreen: undefined;
  MyTransaction: undefined;
  HowToPlayScreen: undefined;
  MyInfoScreen: undefined;

  // Main stack
  AuthStack: undefined;
  AppStack: undefined;
  PoolsScreen: {
    match_key: string;
    teamA: string;
    teamB: string;
    start_at: number;
  };
  LiveMatchScreen: {
    match_key: string;
    teamA: string;
    teamB: string;
    start_at: number;
  };
  PoolsDetailScreen: PoolType;
  LiveMatchPoolDetails: {
    match_key: string;
    pool_prize: number;
    entry_fee: number;
    name: string;
  };
  ProfileScreen: undefined;
  CreateTeamScreen: {
    start_at: number;
    match_key: string;
    teamA: string;
    teamB: string;
  } & (
    | {
      type?: never;
      players?: never;
      caption?: never;
      viceCaption?: never;
    }
    | {
      type: 'edit';
      players: SelectPlayerType[];
      caption: SelectPlayerType;
      viceCaption: SelectPlayerType;
    }
  );
  VCaptionScreen: {
    match_key: string;
    selectedPlayer: SelectPlayerType[];
    dataFetched: CreditType;
    teamA: string;
    start_at: number;
    teamB: string;
  } & (
    | {
      type?: never;
      caption?: never;
      viceCaption?: never;
      id?: never;
    }
    | {
      type: 'edit';
      caption: SelectPlayerType;
      viceCaption: SelectPlayerType;
      id: number;
    }
  );
  TeamPreview: {
    selectedPlayer: SelectPlayerType[];
    id: number;
    match_key: string;
    teamA: string;
    teamB: string;
    caption: SelectPlayerType;
    viceCaption: SelectPlayerType;
  } & (
    | {
      type?: never;
      start_at?: never;
    }
    | {
      type: 'edit';
      start_at: number;
    }
  );
  TeamsScreen: {
    match_key: string;
    selectedPlayer: SelectPlayerType[];
    dataFetched: CreditType;
    teamA: string;
    teamB: string;
    start_at: number;
  };
  CompletedMatchScreen: undefined;
  SelectTeamScreen: {
    match_key: string;
    start_at: number;
    teamA: string;
    teamB: string;
  };
  WebViewScreen: { uri: string; title: string };
  PaymentScreen: { uri: string };
  NotificationScreen: undefined;

  // App Stack
  HomeScreen: undefined;
  MyMatchesStack: undefined;
  WalletStack: undefined;

  // Auth Stacl
  // SplashScreen: undefined;
  LandingScreen: undefined;
  LoginScreen: undefined;
  ReferredScreen: undefined;
  OtpScreen: { mobileNumber: string };
  CheckUserScreen: { mobileNumber: string };
  SignupScreen: undefined;
};

const Drawer = createDrawerNavigator<RootParamList>();

import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from './src/lib/graqphql';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import Keys from './src/values/keys/Keys';
import { utils } from '@react-native-firebase/app';
var project_key = Keys.projectKey;
var api_key = Keys.apiKey;
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const linking = {
    prefixes: ['luck24seven://', 'https://luck24seven.page.link'],
  
    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // First, you would need to get the initial URL from your third-party integration
      // The exact usage depend on the third-party SDK you use
      // For example, to get the initial URL for Firebase Dynamic Links:
      const { isAvailable } = utils().playServicesAvailability;
  
      if (isAvailable) {
        const initialLink = await dynamicLinks().getInitialLink();
  
        
        if (initialLink) {
          return initialLink.url;
        }
      }
  
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      console.log(url);
      
  
      return url;
    },
  
    // Custom function to subscribe to incoming links
    subscribe(listener) {
      // Listen to incoming links from Firebase Dynamic Links
      const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
        console.log(url);
        listener(url);
      });
  
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
        console.log(url);
        listener(url);
      });
  
      return () => {
        // Clean up the event listeners
        unsubscribeFirebase();
        linkingSubscription.remove();
      };
    },
  
    config: {
      // Deep link configuration
    },
  };

  return (
    <Provider theme={CombinedDefaultTheme}>
      <NavigationContainer
        linking={linking} 
        onReady={onLayoutRootView}
        theme={CombinedDefaultTheme}>
        <Portal.Host>
          <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
              headerShown: false,
            }}>
            <Drawer.Screen
              name="FeedsScreen"
              options={{
                drawerLabel: 'Home',
              }}
              component={FeedScreen}
            />
          </Drawer.Navigator>
        </Portal.Host>
      </NavigationContainer>
    </Provider>
  );
}

const MainStack = createNativeStackNavigator<RootParamList>();
export const ToastContext = createContext<{
  setVisible: (val: false | string) => void;
}>({ setVisible: () => { } });

export const AuthContext = createContext<{
  token: string;
  mobileNumber: string;
}>({
  token: '',
  mobileNumber: '',
});

const FeedScreen = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState<false | string>(false);
  const [token, setToken] = useState<string>('');
  const [mobileNumber, setmobileNumber] = useState('');

  React.useEffect(() => {
    function handleBackButton() {
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const setToast = (val: false | string) => {
    setVisible(val);
  };
  // const getData = async () => {
  //   await AsyncStorage.getItem('token').then(token => {
  //     if (token) setToken(token);
  //   });
  //   await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
  //     if (mobileNumber) setmobileNumber(mobileNumber);
  //   });
  // };
  const isSignedIn = async () => {
    try {
      let res = auth().currentUser;
      if (res) {
        try {
          const uid = res.uid;
          // const number = res.phoneNumber.slice(3);
          // setmobileNumber(res.phoneNumber);
          await firestore()
            .collection('Users')
            .doc(uid)
            .get()
            .then(data => {
              if (data.exists) {
                const userData = data.data();
                if (userData) {
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
                }
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
          Alert.alert('Network error!', JSON.stringify(error));
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
        setToken(token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {
    // getData();
    isSignedIn();
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          token,
          mobileNumber,
        }}>
        <ToastContext.Provider
          value={{
            setVisible: setToast,
          }}>
          <MainStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="AuthStack">
            <MainStack.Screen name="AuthStack" component={AuthScreenStack} />
            <MainStack.Screen name="AppStack" component={AppStack} />
            <MainStack.Screen name="PoolsScreen" component={PoolsScreen} />
            <MainStack.Screen
              name="LiveMatchScreen"
              component={LiveMatchScreen}
            />
            <MainStack.Screen
              name="PoolsDetailScreen"
              component={PoolDetailsScreen}
            />
            <MainStack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
            />
            <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
            <MainStack.Screen
              name="CreateTeamScreen"
              component={CreateTeamScreen}
            />
            <MainStack.Screen
              name="VCaptionScreen"
              component={VCaptionScreen}
            />
            <MainStack.Screen name="TeamPreview" component={TeamPreview} />
            <MainStack.Screen name="TeamsScreen" component={TeamsScreen} />
            <MainStack.Screen name="MyInfoScreen" component={MyInfoScreen} />
            <MainStack.Screen
              name="CompletedMatchScreen"
              component={CompletedMatchScreen}
            />
            <MainStack.Screen name="SelectTeamScreen" component={SelectTeam} />
            <MainStack.Screen name="WebViewScreen" component={WebpageShow} />
            <MainStack.Screen name="MyTransaction" component={MyTransaction} />
            <MainStack.Screen name="SettingsScreen" component={Settings} />
            <MainStack.Screen name="ContactScreen" component={ContactScreen} />
            <MainStack.Screen
              name="LiveMatchPoolDetails"
              component={LiveMatchPoolDetails}
            />
            <MainStack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
            />
          </MainStack.Navigator>
          <Snackbar
            visible={visible !== false && true}
            onDismiss={() => setVisible(false)}
            className="bg-[#1D3A4B] border border-[#FC2B2D50]">
            {visible}
          </Snackbar>
        </ToastContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export type AppStackParamList = {
  HomeScreen: undefined;
  MyMatchesStack: undefined;
  WalletStack: undefined;
};
const Tab = createBottomTabNavigator<AppStackParamList>();

const AppStack = () => {
  const getStackInfo = (route: string, focused: boolean, size = 20) => {
    switch (route) {
      case 'HomeScreen':
        return {
          icon: (
            <AntDesign
              name="home"
              size={size}
              color={focused ? '#FC2B2D' : 'gray'}
            />
          ),
          label: 'Home',
        };
      case 'MyMatchesStack':
        return {
          icon: (
            <AntDesign
              name="Trophy"
              size={size}
              color={focused ? '#FC2B2D' : 'gray'}
            />
          ),
          label: 'My Matches',
        };
      case 'WalletStack':
        return {
          icon: (
            <Ionicons
              name="ios-wallet-outline"
              size={size}
              color={focused ? '#FC2B2D' : 'gray'}
            />
          ),
          label: 'Wallet',
        };
      default:
        return {
          icon: (
            <Ionicons
              name="alert-circle-outline"
              size={size}
              color={focused ? '#FC2B2D' : 'gray'}
            />
          ),
          label: 'Default',
        };
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets, ...props }) => (
        <View
          style={{ flexDirection: 'row' }}
          className="border-t-2 border-[#FC2B2D]">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={`${index} ${label}`}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="flex-1 py-3 justify-center items-center">
                {getStackInfo(label, isFocused).icon}
                <Text
                  style={{
                    color: isFocused ? '#FC2B2D' : 'gray',
                  }}
                  className={clsx('', isFocused ? 'text-xs' : 'text-[10px]')}>
                  {getStackInfo(label, isFocused).label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ focused }) => getStackInfo('HomeScreen', focused).icon,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="MyMatchesStack"
        options={{
          tabBarIcon: ({ focused }) =>
            getStackInfo('MyMatchesStack', focused).icon,
        }}
        component={MyMatchScreen}
      />
      <Tab.Screen
        name="WalletStack"
        options={{
          tabBarIcon: ({ focused }) =>
            getStackInfo('WalletStack', focused).icon,
        }}
        component={WalletScreen}
      />
    </Tab.Navigator>
  );
};

const AuthStack = createNativeStackNavigator<RootParamList>();

const AuthScreenStack = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <AuthStack.Screen name="SplashScreen" component={SplashScreen} /> */}

      <AuthStack.Screen name="LandingScreen" component={LandingScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="ReferredScreen" component={ReferredScreen} />
      <AuthStack.Screen name="CheckUserScreen" component={CheckUserScreen} />
    </AuthStack.Navigator>
  );
};
