import { Ionicons } from '@expo/vector-icons';
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { default as axios } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import storage from '@react-native-firebase/storage';
import { RootParamList } from '../../../App';
import FeaturedCard from '../../components/HomeScreen/FeaturedCard';
import MatchCard from '../../components/HomeScreen/MatchCard';
import { MatchType } from '../../lib/content/upcoming';
import { windowWidth } from '../../lib/util/dimensionUtil';

import Keys from '../../values/keys/Keys';
var project_key = Keys.projectKey;
const tour = [
  'engire_2023',
  'wiind_2023',
  'mtkscat20_2023',
  'nlwirew_2023',
  'uaenz_2023',
  'ireind_2023',
  'usmt10l_2023',
  'afgpaks2_2023',
  'c__season__engnzp__e4a0f',
  'asiacup_2023',
  'rsaaus_2023',
  'engwslw_2023',
  'wcplt20_2023',
  'pakwrsaw_2023',
  'engnz_2023',
  'icc_wc_2023',
  'rsawnzw_2023',
  'auswwiw_2023',
  'indauss2_2023',
  'bannz_2023',
];
type Props = NativeStackScreenProps<RootParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation: Props['navigation'] = useNavigation();
  const [upcomingMatches, setUpcomingMatches] = useState<MatchType[]>([]);
  const [banner, setBanner] = useState<MatchType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState('');

  const getUpcomingMatches = async (token: string) => {
    const urls = tour.map(
      tour =>
        `https://api.sports.roanuz.com/v5/cricket/${project_key}/tournament/${tour}/fixtures/`,
    );
    const requests = urls.map(url =>
      axios.get(url, {
        headers: {
          'rs-token': token,
        },
      }),
    );

    axios
      .all(requests)
      .then(responses => {
        responses.forEach(resp => {
          setUpcomingMatches(prev => {
            return [
              ...(prev || []),
              ...resp.data.data.matches
                .filter(match => match.status !== 'completed')
                .filter(
                  match =>
                    new Date(match.start_at * 1000).getDate() <
                    new Date().getDate() + 7,
                ),
            ];
          });
        });
        setRefreshing(false);
      })
      .catch((err: AxiosError) => {
        console.log(err, token);
        getUpcomingMatches(token);
      });
  };

  const getToken = async () => {
    setRefreshing(true);
    await AsyncStorage.getItem('token').then(token => {
      console.log(token);
      if (token) {
        getUpcomingMatches(token);
        setToken(token);
      }
    });
  };
  const footer = () => {
    return <View style={{ height: 200 }}></View>;
  };

  const askPermission = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).then(res => {
      console.log('permission', res);
    });
  };

  async function requestUserPermission() {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).then(res => {
      // if (res) console.log('permission is granted');
      if (!res) askPermission;
    });
  }
  const getBanner = async () => {
    try {
      const bannerRef = storage().ref(`/banner`);
      const items = await bannerRef.listAll();
      const imageUrls:any[]=[];
      await Promise.all(items.items.map(async item => {
        const url = await item.getDownloadURL();
        imageUrls.push(url);
      }));
      setBanner(imageUrls);
      // console.log(imageUrls);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      messaging().setBackgroundMessageHandler(remoteMessage => {
        const data = remoteMessage.data;
        const { teamA, teamB, match_key } = data;
        Alert.alert(`${teamA} vs ${teamB}`, 'is on the way...', [
          { text: 'no', onPress: () => null },
          {
            text: `i'm in`,
            onPress: () => {
              navigation.navigate('CreateTeamScreen', {
                match_key,
                teamA,
                teamB,
                start_at: data.start_at,
              });
            },
          },
        ]);
      });

      messaging().onMessage(remoteMessage => {
        const data = remoteMessage.data;
        const { teamA, teamB, match_key } = data;
        Alert.alert(`${teamA} vs ${teamB}`, 'is on the way...', [
          { text: 'no', onPress: () => null },
          {
            text: `i'm in`,
            onPress: () => {
              navigation.navigate('CreateTeamScreen', {
                match_key,
                teamA,
                teamB,
                start_at: data.start_at,
              });
            },
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getToken();
    getBanner();
    requestUserPermission();
  }, []);

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
    <SafeAreaView>
      <Appbar.Header mode="small" statusBarHeight={0}>
        <Appbar.Content
          title={
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" size={34} color="black" />
              </TouchableOpacity>
              <Image
                source={require('./../../../assets/images/horizontal_logo.png')}
                style={{
                  aspectRatio: 278 / 33,
                  resizeMode: 'contain',
                }}
                className="w-2/5 mx-auto"
              />
            </View>
          }
        />
        <Appbar.Action
          icon="bell-badge-outline"
          color="#FC2B2D"
          size={25}
          onPress={() => navigation.navigate('NotificationScreen')}
        />
      </Appbar.Header>

      <View className="flex-grow">
        <Carousel
          loop
          width={windowWidth}
          height={120}
          autoPlay
          data={banner}
          scrollAnimationDuration={2000}
          renderItem={({ index }: { index: number }) => (
            <FeaturedCard uri={banner[index]} />
          )}
        />

        <View
          style={{
            marginBottom: Platform.OS !== 'web' ? 90 : 0,
            height: '75%',
          }}>
          <Text className="text-md w-11/12 mx-auto font-poppins600 text-black">
            Upcoming Matches
          </Text>
          <FlatList
            style={{ width: '100%' }}
            // sort first if match started not started then start_at
            data={[
              ...upcomingMatches.filter(match => match.status === 'started'),
              ...upcomingMatches
                .filter(match => match.status !== 'started')
                .sort(
                  (a, b) =>
                    new Date(a.start_at * 1000).getTime() -
                    new Date(b.start_at * 1000).getTime(),
                ),
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setUpcomingMatches([]);
                  getUpcomingMatches(token);
                }}
              />
            }
            ListFooterComponent={footer()}
            keyExtractor={item => `${item.key}-${item.name}`}
            renderItem={({ item }) => {
              return (
                <MatchCard
                  {...item}
                  key={`${item.key}-${item.name}`}
                  onPress={() => {
                    item.status === 'not_started'
                      ? navigation.navigate('PoolsScreen', {
                          match_key: item.key,
                          // match_key: 'triseries_2018_g1',
                          teamA: item.teams?.a.code,
                          teamB: item.teams?.b.code,
                          start_at: item.start_at,
                        })
                      : navigation.navigate('LiveMatchScreen', {
                          match_key: item.key,
                          // match_key: 'triseries_2018_g1',
                          teamA: item.teams?.a.code,
                          teamB: item.teams?.b.code,
                          start_at: item.start_at,
                        });
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const futuredUri = [
  require('./../../../assets/images/home/featured1.jpg'),
  require('./../../../assets/images/home/featured2.jpg'),
  require('./../../../assets/images/home/featured3.jpg'),
];
